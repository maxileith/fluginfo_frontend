import TTravelClass from "../types/TTravelClass";
import { IDuration, IStop } from "./IOffer";

export interface ISegment {
    id: number;
    departure: IStop;
    arrival: IStop;
    flightNumber: string;
    carrierCode: string;
    carrier: string;
    duration: IDuration;
    aircraft: string;
    cabin: TTravelClass;
    class: string;
}

export interface IItinerary {
    duration: IDuration;
    segments: ISegment[];
}

export default interface IOfferDetails {
    price: string;
    itineraries: IItinerary[];
}
