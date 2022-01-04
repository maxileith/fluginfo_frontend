import IApiDuration from "./IApiDuration";
import IApiStop from "./IApiStop";

export interface IApiAvailableSeats {
    classId: string;
    seats: number;
}

export default interface IApiStatus {
    flightNumber: string;
    carrierCode: string;
    carrier?: string;
    departure: IApiStop;
    arrival: IApiStop;
    duration: IApiDuration;
    aircraft: string;
    availableSeats: IApiAvailableSeats[];
}
