import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as OfferElementStories from "./OfferElement.stories";
import OfferElementItinerary, {
    IOfferElementItinerary,
} from "./OfferElementItinerary";

export default {
    title: "OfferComponents/OfferElementItinerary",
    component: OfferElementItinerary,
} as ComponentMeta<typeof OfferElementItinerary>;

const Template: ComponentStory<typeof OfferElementItinerary> = (
    args: IOfferElementItinerary
) => <OfferElementItinerary {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    itinerary: OfferElementStories.Standard.args?.offer?.itineraries[0],
};
