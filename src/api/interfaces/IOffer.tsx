import TTravelClass from "../types/TTravelClass";
import IAirport from "./IAirport";

export interface IDuration {
    hours: number;
    minutes: number;
}

export interface ICarrier {
    carrierCode: string;
    carrier: string;
}

export interface IStop {
    airport: IAirport;
    at: string;
}

export interface IItinerary {
    duration: IDuration;
    stops: number;
    carriers: ICarrier[];
    departure: IStop;
    arrival: IStop;
}

export default interface IOffer {
    hash: string;
    price: string;
    classes: TTravelClass[];
    itineraries: IItinerary[];
}
