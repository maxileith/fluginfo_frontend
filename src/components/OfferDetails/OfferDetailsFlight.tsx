import { IApiDuration } from "../../api/interfaces/IApiOffer";
import TApiTravelClass from "../../api/types/TApiTravelClass";

export interface IOfferDetailsFlight {
    flightNumber: string;
    carrierCode: string;
    carrier: string;
    duration: IApiDuration;
    aircraft: string;
    cabin: TApiTravelClass;
    class: string;
}

export default function OfferDetailsFlight({}: IOfferDetailsFlight): JSX.Element {
    return <>Flight</>;
}
