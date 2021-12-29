import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CenteredLoader from "../components/CenteredLoader/CenteredLoader";
import API from "../Api";
import IOfferDetails from "../api/interfaces/IOfferDetails";

export default function OfferDetails(): JSX.Element {
    const { hash } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [details, setDetails] = useState<IOfferDetails | undefined>(
        undefined
    );

    useEffect(() => {
        API.get("offers/details/", { params: { id: hash } })
            .then((response) => {
                setDetails(response.data as IOfferDetails);
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 404:
                    case 400:
                        setDetails(undefined);
                        break;
                    default:
                        // TODO: handle error
                        break;
                }
            })
            .finally(() => {
                setLoading(false);
            });
        // TODO: Error handling
        console.log(hash);
    }, [hash]);

    useEffect(() => {
        console.log(details);
    }, [details]);

    return <>{loading ? <CenteredLoader /> : <p>{hash}</p>}</>;
}
