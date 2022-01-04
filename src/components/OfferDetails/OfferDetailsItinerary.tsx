import React from "react";
import { Box, Columns, Container, Heading, Icon } from "react-bulma-components";
import { IApiItinerary } from "../../api/interfaces/IApiOfferDetails";
import OfferDetailsFlight from "./OfferDetailsFlight";
import OfferDetailsAirport from "./OfferDetailsAirport";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlaneArrival,
    faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export interface IOfferDetailsItinerary {
    itinerary: IApiItinerary;
    showSeatmap: (segment: number) => void;
}

export default function OfferDetailsItinerary({
    itinerary,
    showSeatmap,
}: IOfferDetailsItinerary): JSX.Element {
    return (
        <>
            <Columns>
                <Columns.Column narrow>
                    <Heading size={4}>
                        <Icon mr={2}>
                            <FontAwesomeIcon
                                icon={faPlaneDeparture}
                                size="sm"
                            />
                        </Icon>
                        {itinerary.segments[0].departure.airport.iata}
                    </Heading>
                    <Heading subtitle>
                        {moment(itinerary.segments[0].departure.at).format(
                            "h:mm a (Do MMMM)"
                        )}
                    </Heading>
                </Columns.Column>
                <Columns.Column>
                    <Heading size={4}>
                        <Icon mr={2}>
                            <FontAwesomeIcon icon={faPlaneArrival} size="sm" />
                        </Icon>
                        {
                            itinerary.segments[itinerary.segments.length - 1]
                                .arrival.airport.iata
                        }
                    </Heading>
                    <Heading subtitle>
                        {moment(
                            itinerary.segments[itinerary.segments.length - 1]
                                .arrival.at
                        ).format("h:mm a (Do MMMM)")}
                    </Heading>
                </Columns.Column>
            </Columns>

            <Box style={{ overflow: "hidden" }}>
                <Container mobile={{ display: "hidden" }} mb={5} />
                <Columns>
                    {itinerary.segments.map((segment, index) => (
                        <React.Fragment key={segment.id}>
                            {index === 0 && (
                                <Columns.Column paddingless pt={2}>
                                    <OfferDetailsAirport
                                        airport={segment.departure.airport}
                                        type="origin"
                                    />
                                </Columns.Column>
                            )}

                            <Columns.Column paddingless pt={2}>
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

                            <Columns.Column paddingless pt={2}>
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
        </>
    );
}
