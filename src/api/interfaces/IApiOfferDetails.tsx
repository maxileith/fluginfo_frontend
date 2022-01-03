import TApiTravelClass from "../types/TApiTravelClass";
import { IApiDuration, IApiStop } from "./IApiOffer";

export interface IApiSegment {
    id: number;
    departure: IApiStop;
    arrival: IApiStop;
    flightNumber: string;
    carrierCode: string;
    carrier: string;
    duration: IApiDuration;
    aircraft: string;
    cabin: TApiTravelClass;
    classId: string;
}

export interface IApiItinerary {
    duration: IApiDuration;
    segments: IApiSegment[];
}

export default interface IApiOfferDetails {
    price: string;
    itineraries: IApiItinerary[];
}
