import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as OfferDetailsSegmentStories from "./OfferDetailsSegment.stories";
import OfferDetailsFlight, { IOfferDetailsFlight } from "./OfferDetailsFlight";

export default {
    title: "OfferDetailsComponent/Flight",
    component: OfferDetailsFlight,
} as ComponentMeta<typeof OfferDetailsFlight>;

const Template: ComponentStory<typeof OfferDetailsFlight> = (
    args: IOfferDetailsFlight
) => <OfferDetailsFlight {...args} />;

export const Standard = Template.bind({});
Standard.args = OfferDetailsSegmentStories.Standard.args?.segment;