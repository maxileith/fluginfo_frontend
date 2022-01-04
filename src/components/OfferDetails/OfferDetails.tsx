import React from "react";
import { Heading } from "react-bulma-components";
import IApiOfferDetails from "../../api/interfaces/IApiOfferDetails";
import OfferDetailsItinerary from "./OfferDetailsItinerary";

export interface IOfferDetails {
    details: IApiOfferDetails;
    showSeatmap: (segment: number) => void;
}

export default function OfferDetails({
    details,
    showSeatmap,
}: IOfferDetails): JSX.Element {
    return (
        <>
            {details.itineraries.map((itinerary, index) => (
                <OfferDetailsItinerary
                    itinerary={itinerary}
                    showSeatmap={showSeatmap}
                    key={index}
                />
            ))}
            <hr />
            <Heading textAlign="right" mobile={{ display: "hidden" }}>
                {details.price}
            </Heading>
            <Heading textAlign="center" tablet={{ display: "hidden" }}>
                {details.price}
            </Heading>
        </>
    );
}
