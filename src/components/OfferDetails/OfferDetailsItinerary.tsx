import { IItinerary } from "../../api/interfaces/IOfferDetails";

export interface IOfferDetailsItinerary {
    itinerary: IItinerary;
    showSeatmap: (segment: number) => void;
}

export default function OfferDetailsItinerary({
    itinerary,
    showSeatmap,
}: IOfferDetailsItinerary): JSX.Element {
    return <>Test</>;
}
