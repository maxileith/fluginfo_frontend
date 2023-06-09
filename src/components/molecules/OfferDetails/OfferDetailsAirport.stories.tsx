import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as OfferDetailsItineraryStories from "../../organisms/OfferDetails/OfferDetailsItinerary.stories";
import OfferDetailsAirport, {
    IOfferDetailsAirport,
} from "./OfferDetailsAirport";

export default {
    title: "Molecules/Offer Details/Airport",
    component: OfferDetailsAirport,
} as ComponentMeta<typeof OfferDetailsAirport>;

const Template: ComponentStory<typeof OfferDetailsAirport> = (
    args: IOfferDetailsAirport
) => <OfferDetailsAirport {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    airport:
        OfferDetailsItineraryStories.Standard.args?.itinerary?.segments[0]
            .departure.airport,
};

export const OnlyIata = Template.bind({});
OnlyIata.args = {
    airport: {
        iata: "DXB",
    },
};
