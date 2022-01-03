import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as OfferDetailsSegmentStories from "./OfferDetailsSegment.stories";
import OfferDetailsStop, { IOfferDetailsStop } from "./OfferDetailsStop";

export default {
    title: "OfferDetailsComponent/Stop",
    component: OfferDetailsStop,
} as ComponentMeta<typeof OfferDetailsStop>;

const Template: ComponentStory<typeof OfferDetailsStop> = (
    args: IOfferDetailsStop
) => <OfferDetailsStop {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    stop: OfferDetailsSegmentStories.Standard.args?.segment?.departure,
};
