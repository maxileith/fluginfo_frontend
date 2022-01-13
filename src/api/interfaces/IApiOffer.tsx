import TApiTravelClass from "../types/TApiTravelClass";
import IApiDuration from "./IApiDuration";
import IApiPrice from "./IApiPrice";
import IApiStop from "./IApiStop";

export interface IApiCarrier {
    carrierCode: string;
    carrier: string;
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
    price: IApiPrice;
    itineraries: IApiItinerary[];
}
