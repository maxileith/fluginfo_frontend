import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router";
import CenteredLoader from "../components/CenteredLoader/CenteredLoader";
import API from "../Api";
import IApiOfferDetails from "../api/interfaces/IApiOfferDetails";
import { Heading } from "react-bulma-components";
import OD from "../components/OfferDetails/OfferDetails";
import { toast } from "react-toastify";
import unknownErrorHandling from "../utils/unknownErrorHandling";

export default function OfferDetails(): JSX.Element {
    const { hash } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [details, setDetails] = useState<IApiOfferDetails | undefined>(
        undefined
    );
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        setLoading(true);
        setDetails(undefined);
        API.get("offers/details/", { params: { id: hash } })
            .then((response) => {
                setDetails(response.data as IApiOfferDetails);
            })
            .catch((error) => {
                setDetails(undefined);
                switch (error.response.status) {
                    case 404:
                        toast.error(
                            "The selected offer does not exist or has expired."
                        );
                        navigate("/offer/search", { replace: true });
                        break;
                    default:
                        unknownErrorHandling(error.response.status);
                        break;
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [hash, navigate]);

    const handleShowSeatmap = (segment: number) => {
        console.log(`show seatmap: ${segment}`);
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
