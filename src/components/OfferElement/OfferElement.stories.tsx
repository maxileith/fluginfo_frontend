import { ComponentStory, ComponentMeta } from "@storybook/react";
import OfferElement, { IOfferElement } from "./OfferElement";

export default {
    title: "OfferElement/Standard",
    component: OfferElement,
} as ComponentMeta<typeof OfferElement>;

const Template: ComponentStory<typeof OfferElement> = (args: IOfferElement) => (
    <OfferElement {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
    offer: {
        hash: "df2fc6770ac36b7caf9c64f4526eef4508398fbafca6cd2be009af517aafe7bfe551108978e7e7c573b54c9266dfa0f122652d0e65e9f874e094a4c563b1b72d",
        price: "565.09 EURO",
        classes: ["ECONOMY"],
        itineraries: [
            {
                duration: {
                    hours: 28,
                    minutes: 15,
                },
                stops: 1,
                carriers: [
                    {
                        carrierCode: "TP",
                        carrier: "TAP PORTUGAL",
                    },
                ],
                departure: {
                    airport: {
                        iata: "MUC",
                        name: "MUNICH INTERNATIONAL",
                        city: "MUNICH",
                        countryCode: "DE",
                        country: "GERMANY",
                        timezone: "+01:00",
                    },
                    at: "2021-12-22T19:40:00",
                },
                arrival: {
                    airport: {
                        iata: "SFO",
                        name: "SAN FRANCISCO INTL",
                        city: "SAN FRANCISCO",
                        countryCode: "US",
                        country: "UNITED STATES OF AMERICA",
                        timezone: "-08:00",
                    },
                    at: "2021-12-23T14:55:00",
                },
            },
        ],
    },
};
