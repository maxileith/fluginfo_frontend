import TTravelClass from "../types/TTravelClass";
import IAirport from "./IAirport";
import { IDuration } from "./IOffer";

export interface ISegment {
    id: number;
    departure: IAirport;
    arrival: IAirport;
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
