import API from "../../Api";
import { Box, Columns, Image } from "react-bulma-components";
import IOffer from "../../api/interfaces/IOffer";
import OfferItinerary from "../OfferItinerary/OfferItinerary";
import React from "react";
import moment from "moment";

export interface IOfferElement {
    offer: IOffer;
}

export default function OfferElement({ offer }: IOfferElement): JSX.Element {
    return (
        <Box>
            <Columns>
                <Columns.Column size={8}>
                    {offer.itineraries.map((itinerary, index) => (
                        <React.Fragment key={index}>
                            <OfferItinerary itinerary={itinerary} />
                            {offer.itineraries.length - 1 !== index && <hr />}
                        </React.Fragment>
                    ))}
                </Columns.Column>
                <Columns.Column size={4}>
                    <p>preis</p>
                </Columns.Column>
            </Columns>
        </Box>
    );
}
