import moment from "moment";
import { useEffect, useState } from "react";
import { Heading, Message } from "react-bulma-components";
import StatusSearchForm from "../organisms/StatusSearchForm/StatusSearchForm";
import API from "../../Api";
import IApiStatus from "../../api/interfaces/IApiStatus";
import { toast } from "react-toastify";
import unknownErrorHandling from "../../utils/unknownErrorHandling";
import StatusDisplay from "../organisms/Status/Status";
import { NavigateFunction } from "react-router";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useIsMounted from "../../hooks/useIsMounted";
import IApiStatusTimings from "../../api/interfaces/IApiStatusTimings";
import TUseSearchParams from "../../api/types/TUseSearchParams";
import useSearchParamsMock from "../../mocks/useSearchParamsMock";
import useQueryState from "../../hooks/useQueryState";

export interface IStatus {
    navigate: NavigateFunction;
    useSearchParams: TUseSearchParams;
}

export default function Status({
    navigate = () => {},
    useSearchParams = useSearchParamsMock,
}: IStatus): JSX.Element {
    const isMounted = useIsMounted();

    const [flightNumber, setFlightNumber] = useQueryState<string>(
        "",
        "flightNumber",
        navigate,
        useSearchParams
    );
    const [date, setDate] = useQueryState<string>(
        moment().format("YYYY-MM-DD"),
        "date",
        navigate,
        useSearchParams,
        { alwaysInUrl: true }
    );
    const [currentlyDisplayedFlightNumber, setCurrentDisplayedFlightNumber] =
        useState<string>("");
    const [currentlyDisplayedDate, setCurrentDisplayedDate] =
        useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<IApiStatus | undefined>(undefined);
    const [liveTimings, setLiveTimings] = useState<
        IApiStatusTimings | undefined
    >(undefined);

    const handleFlightNumberChange = (flightNumber: string) => {
        setFlightNumber(flightNumber.toUpperCase());
    };

    const { setDocumentTitle } = useDocumentTitle();
    useEffect(() => {
        setDocumentTitle("Status");
    }, [setDocumentTitle]);

    const showSeatmap = (classId: string) => {
        if (status) {
            navigate(
                `/status/seatmap/${status.flightNumber}/${currentlyDisplayedDate}/${classId}`
            );
        } else {
            toast.error(
                "Could not determine flight information to show the seatmap."
            );
        }
    };

    const dateNotPast: boolean = date >= moment().format("YYYY-MM-DD");
    const flightNumberIsSet: boolean = flightNumber !== "";
    const otherThanPrevRequest: boolean =
        flightNumber !== currentlyDisplayedFlightNumber ||
        date !== currentlyDisplayedDate;
    const readyForTakeOff: boolean =
        dateNotPast && flightNumberIsSet && otherThanPrevRequest;

    const updateLiveTimings = (flightNumber: string, date: string) => {
        API.get("/status/timings/", {
            params: { flightNumber: flightNumber, date: date },
        })
            .then((response) => {
                isMounted.current &&
                    setLiveTimings(response.data as IApiStatusTimings);
            })
            .catch((error) => {
                if (error.response === undefined) {
                    toast.error("Network Error.");
                    return;
                }
                switch (error.response.status) {
                    case 400:
                        toast.error("Bad Request.");
                        break;
                    case 404:
                        toast.error(
                            "We could not find any information about whether the flight is on time."
                        );
                        break;
                    default:
                        unknownErrorHandling(error.response.status);
                        break;
                }
            });
    };

    const handleSearch = () => {
        setCurrentDisplayedFlightNumber("");
        setCurrentDisplayedDate("");
        setLoading(true);
        setStatus(undefined);
        setLiveTimings(undefined);
        API.get("/availability/exact/", {
            params: {
                date: date,
                flightNumber: flightNumber,
            },
        })
            .then((response) => {
                setCurrentDisplayedFlightNumber(flightNumber);
                setCurrentDisplayedDate(date);
                isMounted.current && setStatus(response.data as IApiStatus);
                isMounted.current && updateLiveTimings(flightNumber, date);
            })
            .catch((error) => {
                if (error.response === undefined) {
                    toast.error("Network Error.");
                    return;
                }
                switch (error.response.status) {
                    case 400:
                        toast.error("Bad Request.");
                        break;
                    case 404:
                        toast.error(
                            "Sorry, we could not find information regarding that flight."
                        );
                        break;
                    default:
                        unknownErrorHandling(error.response.status);
                        break;
                }
            })
            .finally(() => {
                isMounted.current && setLoading(false);
            });
    };

    useEffect(() => {
        if (readyForTakeOff) {
            handleSearch();
        }
    }, []);

    return (
        <>
            <Heading>Status Request</Heading>
            <Heading subtitle>Information regarding a specific flight.</Heading>

            <StatusSearchForm
                flightNumber={flightNumber}
                setFlightNumber={handleFlightNumberChange}
                date={date}
                setDate={setDate}
                onSearch={handleSearch}
                readyForTakeOff={readyForTakeOff}
                loading={loading}
            />

            {status && readyForTakeOff && (
                <Message color="warning">
                    <Message.Body>
                        The current results <strong>do not apply</strong> to the
                        above query.
                    </Message.Body>
                </Message>
            )}

            {status && (
                <StatusDisplay
                    status={status}
                    showSeatmap={showSeatmap}
                    liveTimings={liveTimings}
                />
            )}
        </>
    );
}
