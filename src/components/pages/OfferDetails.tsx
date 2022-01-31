import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router";
import CenteredLoader from "../molecules/CenteredLoader/CenteredLoader";
import API from "../../Api";
import IApiOfferDetails from "../../api/interfaces/IApiOfferDetails";
import { Heading } from "react-bulma-components";
import OD from "../organisms/OfferDetails/OfferDetails";
import { toast } from "react-toastify";
import unknownErrorHandling from "../../utils/unknownErrorHandling";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useIsMounted from "../../hooks/useIsMounted";

export interface IOfferDetails {
    navigate: NavigateFunction;
    useParams?: Function;
}

export default function OfferDetails({
    navigate = () => {},
    useParams = () => {
        return {
            hash: 0,
        };
    },
}: IOfferDetails): JSX.Element {
    const isMounted = useIsMounted();

    const { hash } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [details, setDetails] = useState<IApiOfferDetails | undefined>(
        undefined
    );

    useEffect(() => {
        setLoading(true);
        setDetails(undefined);
        API.get("/offers/details/", { params: { id: hash } })
            .then((response) => {
                isMounted.current &&
                    setDetails(response.data as IApiOfferDetails);
            })
            .catch((error) => {
                isMounted.current && setDetails(undefined);
                if (error.response === undefined) {
                    toast.error("Network Error.");
                } else {
                    switch (error.response.status) {
                        case 400:
                            toast.error("Bad Request.");
                            break;
                        case 404:
                            toast.error(
                                "The selected offer does not exist or has expired."
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
    }, [hash, navigate]);

    const { setDocumentTitle } = useDocumentTitle();
    useEffect(() => {
        if (details === undefined) {
            setDocumentTitle("Offer Details");
        } else {
            var departureIata: string =
                details.itineraries[0].segments[0].departure.airport.iata;
            var arrivalIata: string =
                details.itineraries[details.itineraries.length - 1].segments[
                    details.itineraries[details.itineraries.length - 1].segments
                        .length - 1
                ].arrival.airport.iata;
            setDocumentTitle(
                `Offer Details - ${departureIata} -> ${arrivalIata}`
            );
        }
    }, [setDocumentTitle, details]);

    const handleShowSeatmap = (segment: number) => {
        navigate(`/offer/seatmap/${hash}/${segment}`);
    };

    return (
        <>
            {loading && <CenteredLoader />}
            {details && (
                <>
                    <Heading>Offer Details</Heading>
                    <Heading subtitle mb={6}>
                        A closer look at the offer.
                    </Heading>
                    <hr />
                    <OD details={details} showSeatmap={handleShowSeatmap} />
                </>
            )}
        </>
    );
}
