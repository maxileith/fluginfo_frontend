import TApiTravelClass from "../types/TApiTravelClass";
import IApiStop from "./IApiStop";

export interface IApiCarrier {
    carrierCode: string;
    carrier: string;
}

export interface IApiItinerary {
    duration: number;
    stops: number;
    carriers: IApiCarrier[];
    departure: IApiStop;
    arrival: IApiStop;
    classes: TApiTravelClass[];
}

export default interface IApiOffer {
    hash: string;
    price: number;
    itineraries: IApiItinerary[];
}
