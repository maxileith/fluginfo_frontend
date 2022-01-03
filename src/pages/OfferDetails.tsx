import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CenteredLoader from "../components/CenteredLoader/CenteredLoader";
import API from "../Api";
import IApiOfferDetails from "../api/interfaces/IApiOfferDetails";
import CenteredContent from "../components/CenteredContainer/CenteredContainer";
import { Button, Heading, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import OD from "../components/OfferDetails/OfferDetails";

export default function OfferDetails(): JSX.Element {
    const { hash } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [details, setDetails] = useState<IApiOfferDetails | undefined>(
        undefined
    );
    const [errorCode, setErrorCode] = useState<number | undefined>(undefined);

    useEffect(() => {
        setLoading(true);
        setDetails(undefined);
        setErrorCode(undefined);
        API.get("offers/details/", { params: { id: hash } })
            .then((response) => {
                setDetails(response.data as IApiOfferDetails);
            })
            .catch((error) => {
                setErrorCode(error.response.status);
                // TODO: handle error
            })
            .finally(() => {
                setLoading(false);
            });
        // TODO: Error handling
    }, [hash]);

    const handleShowSeatmap = (segment: number) => {
        console.log(`show seatmap: ${segment}`);
    };

    return (
        <>
            {loading && <CenteredLoader />}
            {errorCode && (
                <CenteredContent>
                    <Heading>Error {errorCode}</Heading>
                    <Heading subtitle>
                        {errorCode === 404
                            ? "The selected offer does not exist or has expired."
                            : "An error occured."}
                    </Heading>
                    <Link to="/offer/search">
                        <Button color="info">
                            Offer Search
                            <Icon ml={1}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Icon>
                        </Button>
                    </Link>
                </CenteredContent>
            )}
            {details && (
                <>
                    <Heading>Offer Details</Heading>
                    <Heading subtitle mb={6}>
                        A closer look at the offer.
                    </Heading>
                    <OD details={details} showSeatmap={handleShowSeatmap} />
                </>
            )}
        </>
    );
}
