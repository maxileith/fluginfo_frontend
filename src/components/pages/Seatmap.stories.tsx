import { ComponentMeta, ComponentStory } from "@storybook/react";
import Seatmap, { ISeatmap } from "./Seatmap";

export default {
    title: "Pages/Seatmap",
    component: Seatmap,
} as ComponentMeta<typeof Seatmap>;

const Template: ComponentStory<typeof Seatmap> = (args: ISeatmap) => (
    <Seatmap {...args} />
);

export const FromOfferDetails = Template.bind({});
FromOfferDetails.args = {
    from: "offerDetails",
    navigate: () => {},
};

export const FromStatus = Template.bind({});
FromStatus.args = {
    from: "status",
    navigate: () => {},
};
