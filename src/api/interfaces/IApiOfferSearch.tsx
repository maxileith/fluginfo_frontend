import TApiTravelClass from "../types/TApiTravelClass";

export default interface IApiOfferSearch {
    adults: number;
    children?: number;
    departureDate: string;
    destinationLocationCode: string;
    excludedAirlineCodes?: string;
    includedAirlineCodes?: string;
    infants?: number;
    max?: number;
    nonStop?: boolean;
    originLocationCode: string;
    returnDate?: string;
    travelClass?: TApiTravelClass;
}
