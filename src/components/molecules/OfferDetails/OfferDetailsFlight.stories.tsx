import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as OfferDetailsItineraryStories from "../../organisms/OfferDetails/OfferDetailsItinerary.stories";
import OfferDetailsFlight, { IOfferDetailsFlight } from "./OfferDetailsFlight";

export default {
    title: "Molecules/Offer Details/Flight",
    component: OfferDetailsFlight,
} as ComponentMeta<typeof OfferDetailsFlight>;

const Template: ComponentStory<typeof OfferDetailsFlight> = (
    args: IOfferDetailsFlight
) => <OfferDetailsFlight {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    departureTime:
        OfferDetailsItineraryStories.Standard.args?.itinerary?.segments[0]
            .departure.at,
    arrivalTime:
        OfferDetailsItineraryStories.Standard.args?.itinerary?.segments[0]
            .arrival.at,
    ...OfferDetailsItineraryStories.Standard.args?.itinerary?.segments[0],
};
