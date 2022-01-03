import { IApiStop } from "../../api/interfaces/IApiOffer";

export interface IOfferDetailsStop {
    stop: IApiStop;
}

export default function OfferDetailsStop({
    stop,
}: IOfferDetailsStop): JSX.Element {
    return <>stop</>;
}
