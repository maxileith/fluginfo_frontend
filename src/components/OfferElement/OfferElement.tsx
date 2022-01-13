import { Box, Button, Columns, Heading, Icon } from "react-bulma-components";
import IApiOffer from "../../api/interfaces/IApiOffer";
import OfferElementItinerary from "./OfferElementItinerary";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

export interface IOfferElement {
    offer: IApiOffer;
    showDetails: (hash: string) => void;
}

export default function OfferElement({
    offer,
    showDetails,
}: IOfferElement): JSX.Element {
    return (
        <Box>
            <Columns vCentered>
                <Columns.Column size={9}>
                    {offer.itineraries.map((itinerary, index) => (
                        <React.Fragment key={index}>
                            <OfferElementItinerary itinerary={itinerary} />
                            {offer.itineraries.length - 1 !== index && <hr />}
                        </React.Fragment>
                    ))}
                </Columns.Column>
                <hr />
                <Columns.Column size={3} textAlign="center">
                    <Heading>
                        {offer.price.value}
                        {offer.price.currency === "EURO"
                            ? "€"
                            : ` ${offer.price.currency}`}
                    </Heading>
                    <Button
                        onClick={() => showDetails(offer.hash)}
                        color="info"
                    >
                        Details
                        <Icon ml={1}>
                            <FontAwesomeIcon icon={faInfo} />
                        </Icon>
                    </Button>
                </Columns.Column>
            </Columns>
        </Box>
    );
}
