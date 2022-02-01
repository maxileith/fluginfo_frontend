import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as OfferSearchElementStories from "./OfferSearchElement.stories";
import OfferSearchElementItinerary, {
    IOfferSearchElementItinerary,
} from "./OfferSearchElementItinerary";

export default {
    title: "Organisms/Offer Search/Element/Itinerary",
    component: OfferSearchElementItinerary,
} as ComponentMeta<typeof OfferSearchElementItinerary>;

const Template: ComponentStory<typeof OfferSearchElementItinerary> = (
    args: IOfferSearchElementItinerary
) => <OfferSearchElementItinerary {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    itinerary: OfferSearchElementStories.Standard.args?.offer?.itineraries[0],
};
