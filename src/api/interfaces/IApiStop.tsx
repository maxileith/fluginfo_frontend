import IApiAirport from "./IApiAirport";

export default interface IApiStop {
    airport: IApiAirport;
    at: string;
}
