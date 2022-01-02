import React from "react";
import { Box, Heading } from "react-bulma-components";
import IOD from "../../api/interfaces/IOfferDetails";

export interface IOfferDetails {
    details: IOD;
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
                    <Box>yeet</Box>
                </React.Fragment>
            ))}
        </>
    );
}
