import { useParams } from "react-router";

export default function OfferDetails(): JSX.Element {
    const { hash } = useParams();

    return <>{hash}</>;
}
