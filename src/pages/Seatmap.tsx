import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import API from "../Api";
import IApiSeatmap from "../api/interfaces/IApiSeatmap";
import CenteredLoader from "../components/CenteredLoader/CenteredLoader";
import unknownErrorHandling from "../utils/unknownErrorHandling";
import useIsMounted from "../utils/useIsMounted";
import SeatmapComp from "../components/Seatmap/Seatmap";
import { Heading } from "react-bulma-components";
import moment from "moment";

export interface ISeatmap {
    from: "offerDetails" | "status";
}

export default function Seatmap({ from }: ISeatmap): JSX.Element {
    const isMounted = useIsMounted();
    const navigate: NavigateFunction = useNavigate();
    const { hash, segmentId, flightNumber, date, classId } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [seatmap, setSeatmap] = useState<IApiSeatmap | undefined>(undefined);

    useEffect(() => {
        setSeatmap(undefined);
        setLoading(true);

        const apiSeatmapEndpoint =
            from === "offerDetails"
                ? "/offers/seatmaps/"
                : "/availability/seatmap/";
        const apiSeatmapParams =
            from === "offerDetails"
                ? { id: hash, segment: segmentId }
                : {
                      date: date,
                      flightNumber: flightNumber,
                      travelClass: classId,
                  };

        API.get(apiSeatmapEndpoint, { params: apiSeatmapParams })
            .then((response) => {
                isMounted.current && setSeatmap(response.data as IApiSeatmap);
            })
            .catch((error) => {
                if (error.response === undefined) {
                    toast.error("Network Error.");
                } else {
                    switch (error.response.status) {
                        case 400:
                            toast.error("Bad Request.");
                            break;
                        case 404:
                            toast.error(
                                "The requested Seatmap is not available."
                            );
                            break;
                        default:
                            unknownErrorHandling(error.response.status);
                            break;
                    }
                }
                isMounted.current && navigate(-1);
            })
            .finally(() => {
                isMounted.current && setLoading(false);
            });
    }, [hash, segmentId, flightNumber, date, classId, from, navigate]);

    return (
        <>
            {loading && <CenteredLoader />}
            {seatmap && (
                <>
                    <Heading>Seatmap</Heading>
                    <Heading subtitle>
                        Flight {seatmap.flightNumber} from{" "}
                        {seatmap.departureIata} to {seatmap.arrivalIata} on{" "}
                        {moment(seatmap.date).format("MMMM Do, YYYY")}.
                    </Heading>
                    <hr />
                    <SeatmapComp seatmap={seatmap} />
                </>
            )}
        </>
    );
}
