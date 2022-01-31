import { ComponentMeta, ComponentStory } from "@storybook/react";
import OfferDetails, { IOfferDetails } from "./OfferDetails";

export default {
    title: "OfferDetails",
    component: OfferDetails,
} as ComponentMeta<typeof OfferDetails>;

const Template: ComponentStory<typeof OfferDetails> = (args: IOfferDetails) => (
    <OfferDetails {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
    navigate: () => {},
};
