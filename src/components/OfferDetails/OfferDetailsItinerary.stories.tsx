import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as OfferDetailsStories from "./OfferDetails.stories";
import OfferDetailsItinerary, {
    IOfferDetailsItinerary,
} from "./OfferDetailsItinerary";

export default {
    title: "OfferDetailsItineraryComponent/Overview",
    component: OfferDetailsItinerary,
} as ComponentMeta<typeof OfferDetailsItinerary>;

const Template: ComponentStory<typeof OfferDetailsItinerary> = (
    args: IOfferDetailsItinerary
) => <OfferDetailsItinerary {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    itinerary: OfferDetailsStories.Standard.args?.details?.itineraries[0],
    showSeatmap: OfferDetailsStories.Standard.args?.showSeatmap,
};
