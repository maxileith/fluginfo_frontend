import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as OfferDetailsItineraryStories from "./OfferDetailsItinerary.stories";
import OfferDetailsSegment, {
    IOfferDetailsSegment,
} from "./OfferDetailsSegment";

export default {
    title: "OfferDetailsComponent/Segment",
    component: OfferDetailsSegment,
} as ComponentMeta<typeof OfferDetailsSegment>;

const Template: ComponentStory<typeof OfferDetailsSegment> = (
    args: IOfferDetailsSegment
) => <OfferDetailsSegment {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    segment: OfferDetailsItineraryStories.Standard.args?.itinerary?.segments[0],
};
