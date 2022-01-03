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
                <React.Fragment key={index}>
                    {details.itineraries.length !== 1 && (
                        <Heading size={4}>{index + 1}. Itinerary</Heading>
                    )}
                    <OfferDetailsItinerary
                        itinerary={itinerary}
                        showSeatmap={showSeatmap}
                    />
                </React.Fragment>
            ))}
        </>
    );
}
