import { ComponentMeta, ComponentStory } from "@storybook/react";
import OfferSearch, { IOfferSearch } from "./OfferSearch";

export default {
    title: "OfferSearch",
    component: OfferSearch,
} as ComponentMeta<typeof OfferSearch>;

const Template: ComponentStory<typeof OfferSearch> = (args: IOfferSearch) => (
    <OfferSearch {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
    addToOfferSearchCache: (key, offers) => {},
    getFromOfferSearchCache: (key) => undefined,
};
