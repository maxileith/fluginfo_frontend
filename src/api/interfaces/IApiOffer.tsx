import TApiTravelClass from "../types/TApiTravelClass";
import IApiAirport from "./IApiAirport";

export interface IApiDuration {
    hours: number;
    minutes: number;
}

export interface IApiCarrier {
    carrierCode: string;
    carrier: string;
}

export interface IApiStop {
    airport: IApiAirport;
    at: string;
}

export interface IApiItinerary {
    duration: IApiDuration;
    stops: number;
    carriers: IApiCarrier[];
    departure: IApiStop;
    arrival: IApiStop;
    classes: TApiTravelClass[];
}

export default interface IApiOffer {
    hash: string;
    price: string;
    itineraries: IApiItinerary[];
}
