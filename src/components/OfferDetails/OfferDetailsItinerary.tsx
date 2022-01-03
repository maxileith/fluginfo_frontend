import { Box, Columns } from "react-bulma-components";
import { IApiItinerary } from "../../api/interfaces/IApiOfferDetails";
import OfferDetailsSegment from "./OfferDetailsSegment";

export interface IOfferDetailsItinerary {
    itinerary: IApiItinerary;
    showSeatmap: (segment: number) => void;
}

export default function OfferDetailsItinerary({
    itinerary,
    showSeatmap,
}: IOfferDetailsItinerary): JSX.Element {
    return (
        <Box>
            <Columns>
                {itinerary.segments.map((segment, index) => (
                    <>
                        <Columns.Column key={segment.id}>
                            <OfferDetailsSegment
                                segment={segment}
                                showSeatmap={() => showSeatmap(segment.id)}
                            />
                        </Columns.Column>
                        {index + 1 !== itinerary.segments.length && <hr />}
                    </>
                ))}
            </Columns>
        </Box>
    );
}
