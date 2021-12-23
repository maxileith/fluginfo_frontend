import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as OfferElementStories from "../OfferElement/OfferElement.stories";
import OfferItinerary, { IOfferItinerary } from "./OfferItinerary";

export default {
    title: "OfferItinerary/Standard",
    component: OfferItinerary,
} as ComponentMeta<typeof OfferItinerary>;

const Template: ComponentStory<typeof OfferItinerary> = (
    args: IOfferItinerary
) => <OfferItinerary {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    itinerary: OfferElementStories.Standard.args?.offer?.itineraries[0],
};
