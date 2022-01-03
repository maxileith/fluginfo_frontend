import { Columns } from "react-bulma-components";
import { IApiSegment } from "../../api/interfaces/IApiOfferDetails";
import OfferDetailsFlight from "./OfferDetailsFlight";
import OfferDetailsStop from "./OfferDetailsStop";

export interface IOfferDetailsSegment {
    segment: IApiSegment;
    showSeatmap: () => void;
}

export default function OfferDetailsSegment({
    segment,
}: IOfferDetailsSegment): JSX.Element {
    return (
        <Columns>
            <Columns.Column size={3}>
                <OfferDetailsStop stop={segment.departure} />
            </Columns.Column>
            <Columns.Column size={6}>
                <OfferDetailsFlight
                    flightNumber={segment.flightNumber}
                    carrierCode={segment.carrierCode}
                    carrier={segment.carrier}
                    duration={segment.duration}
                    aircraft={segment.aircraft}
                    cabin={segment.cabin}
                    class={segment.class}
                />
            </Columns.Column>
            <Columns.Column size={3}>
                <OfferDetailsStop stop={segment.arrival} />
            </Columns.Column>
        </Columns>
    );
}
