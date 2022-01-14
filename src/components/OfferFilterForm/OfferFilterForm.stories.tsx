import { ComponentStory, ComponentMeta } from "@storybook/react";
import { triggerAsyncId } from "async_hooks";
import OfferFilterForm, { IOfferFilterForm } from "./OfferFilterForm";

export default {
    title: "OfferComponents/FilterForm",
    component: OfferFilterForm,
} as ComponentMeta<typeof OfferFilterForm>;

const Template: ComponentStory<typeof OfferFilterForm> = (
    args: IOfferFilterForm
) => <OfferFilterForm {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    possibleAirlines: [
        {
            carrier: "LUFTHANSA",
            carrierCode: "LH",
        },
        {
            carrier: "EUROWINGS",
            carrierCode: "EW",
        },
        {
            carrier: "SWISS INTERNATIONAL AIR LINES",
            carrierCode: "LX",
        },
        {
            carrier: "SCANDINAVIAN AIRLINES",
            carrierCode: "SK",
        },
    ],
    includedAirlineCarrierCode: ["LH", "LX"],
    possibleNumberOfStops: [0, 1, 2, 3],
    includedNumberOfStops: [0, 1, 3],
    priceMin: 123,
    priceMax: 1367,
    priceLimit: 500,
    durationMin: 80,
    durationMax: 1422,
    durationLimit: 277,
    numberOfTotalOffers: 150,
    numberOfFilteredOffers: 42,
};
