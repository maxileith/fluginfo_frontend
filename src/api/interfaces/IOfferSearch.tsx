import TTravelClass from "../types/TTravelClass";

export default interface IOfferSearch {
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
    travelClass?: TTravelClass;
}
