import {
    Block,
    Box,
    Button,
    Columns,
    Heading,
    Icon,
    Level,
} from "react-bulma-components";
import IApiOffer from "../../../../api/interfaces/IApiOffer";
import OfferSearchElementItinerary from "./OfferSearchElementItinerary";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

export interface IOfferSearchElement {
    offer: IApiOffer;
    showDetails: (hash: string) => void;
}

export default function OfferSearchElement({
    offer,
    showDetails,
}: IOfferSearchElement): JSX.Element {
    return (
        <Box>
            <Columns vCentered>
                <Columns.Column size={9}>
                    {offer.itineraries.map((itinerary, index) => (
                        <React.Fragment key={index}>
                            <OfferSearchElementItinerary
                                itinerary={itinerary}
                            />
                            {offer.itineraries.length - 1 !== index && <hr />}
                        </React.Fragment>
                    ))}
                </Columns.Column>
                <Columns.Column size={3}>
                    <Block mobile={{ display: "hidden" }} textAlign="center">
                        <Heading>{offer.price.toFixed(2)}€</Heading>
                        <Button
                            onClick={() => showDetails(offer.hash)}
                            color="info"
                        >
                            Details
                            <Icon ml={1}>
                                <FontAwesomeIcon icon={faInfo} />
                            </Icon>
                        </Button>
                    </Block>

                    <Level tablet={{ display: "hidden" }} breakpoint="mobile">
                        <Level.Side align="left">
                            <Level.Item>
                                <Heading>{offer.price.toFixed(2)}€</Heading>
                            </Level.Item>
                        </Level.Side>
                        <Level.Side align="right">
                            <Level.Item>
                                <Button
                                    onClick={() => showDetails(offer.hash)}
                                    color="info"
                                >
                                    Details
                                    <Icon ml={1}>
                                        <FontAwesomeIcon icon={faInfo} />
                                    </Icon>
                                </Button>
                            </Level.Item>
                        </Level.Side>
                    </Level>
                </Columns.Column>
            </Columns>
        </Box>
    );
}
