import { IApiItinerary } from "../../api/interfaces/IApiOfferDetails";

export interface IOfferDetailsItinerary {
    itinerary: IApiItinerary;
    showSeatmap: (segment: number) => void;
}

export default function OfferDetailsItinerary({
    itinerary,
    showSeatmap,
}: IOfferDetailsItinerary): JSX.Element {
    return <>Test</>;
}
