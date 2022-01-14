import TApiTravelClass from "../types/TApiTravelClass";
import IApiPrice from "./IApiPrice";
import IApiStop from "./IApiStop";

export interface IApiSegment {
    id: number;
    departure: IApiStop;
    arrival: IApiStop;
    flightNumber: string;
    carrierCode: string;
    carrier: string;
    duration: number;
    aircraft: string;
    cabin: TApiTravelClass;
    classId: string;
}

export interface IApiItinerary {
    duration: number;
    segments: IApiSegment[];
}

export default interface IApiOfferDetails {
    price: IApiPrice;
    itineraries: IApiItinerary[];
}
