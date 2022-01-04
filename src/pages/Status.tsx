import moment from "moment";
import { useEffect, useState } from "react";
import { Heading } from "react-bulma-components";
import StatusSearchForm from "../components/StatusSearchForm/StatusSearchForm";
import useQueryState from "../utils/useQueryState";
import API from "../Api";
import IApiStatus from "../api/interfaces/IApiStatus";
import { toast } from "react-toastify";
import unknownErrorHandling from "../utils/unknownErrorHandling";

export default function Status(): JSX.Element {
    const [flightNumber, setFlightNumber] = useQueryState<string>(
        "",
        "flightNumber"
    );
    const [date, setDate] = useQueryState<string>(
        moment().format("YYYY-MM-DD"),
        "date",
        { alwaysInUrl: true }
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [status, setStatus] = useState<IApiStatus | undefined>(undefined);

    const handleFlightNumberChange = (flightNumber: string) => {
        setFlightNumber(flightNumber.toUpperCase());
    };

    const handleSearch = () => {
        setLoading(true);
        API.get("/availability/exact/", {
            params: {
                date: date,
                flightNumber: flightNumber,
            },
        })
            .then((response) => {
                setStatus(response.data as IApiStatus);
            })
            .catch((error) => {
                setStatus(undefined);
                switch (error.response.status) {
                    case 400:
                        toast.error("Bad Request.");
                        break;
                    case 404:
                        toast.error("The flight does not exist.");
                        break;
                    default:
                        unknownErrorHandling(error.response.status);
                        break;
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        console.log(status);
    }, [status]);

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
                loading={loading}
            />
        </>
    );
}
