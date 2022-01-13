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
    airlines: [
        {
            details: {
                carrier: "LUFTHANSA",
                carrierCode: "LH",
            },
            included: false,
        },
        {
            details: {
                carrier: "EUROWINGS",
                carrierCode: "EW",
            },
            included: true,
        },
        {
            details: {
                carrier: "SWISS INTERNATIONAL AIR LINES",
                carrierCode: "LX",
            },
            included: false,
        },
        {
            details: {
                carrier: "SCANDINAVIAN AIRLINES",
                carrierCode: "SK",
            },
            included: true,
        },
    ],
    numberOfStops: [
        {
            value: 0,
            included: true,
        },
        {
            value: 1,
            included: true,
        },
        {
            value: 2,
            included: false,
        },
        {
            value: 3,
            included: true,
        },
    ],
    priceMin: 123,
    priceMax: 1367,
    priceLimit: 500,
    durationMin: {
        hours: 1,
        minutes: 20,
    },
    durationMax: {
        hours: 23,
        minutes: 42,
    },
    durationLimit: {
        hours: 4,
        minutes: 37,
    },
    numberOfTotalOffers: 150,
    numberOfFilteredOffers: 42,
};
