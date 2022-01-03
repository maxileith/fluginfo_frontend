import React from "react";
import { Box, Columns } from "react-bulma-components";
import { IApiItinerary } from "../../api/interfaces/IApiOfferDetails";
import OfferDetailsFlight from "./OfferDetailsFlight";
import OfferDetailsAirport from "./OfferDetailsAirport";

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
                    <React.Fragment key={segment.id}>
                        {index === 0 && (
                            <Columns.Column paddingless>
                                <OfferDetailsAirport
                                    airport={segment.departure.airport}
                                    type="origin"
                                />
                            </Columns.Column>
                        )}

                        <Columns.Column paddingless>
                            <OfferDetailsFlight
                                flightNumber={segment.flightNumber}
                                aircraft={segment.aircraft}
                                carrier={segment.carrier}
                                carrierCode={segment.carrierCode}
                                duration={segment.duration}
                                cabin={segment.cabin}
                                classId={segment.classId}
                                departureTime={segment.departure.at}
                                arrivalTime={segment.arrival.at}
                            />
                        </Columns.Column>

                        <Columns.Column paddingless>
                            <OfferDetailsAirport
                                airport={segment.arrival.airport}
                                type={
                                    index + 1 === itinerary.segments.length
                                        ? "destination"
                                        : "change"
                                }
                            />
                        </Columns.Column>
                    </React.Fragment>
                ))}
            </Columns>
        </Box>
    );
}
