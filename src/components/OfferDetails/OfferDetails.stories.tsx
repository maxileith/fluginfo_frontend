import { ComponentStory, ComponentMeta } from "@storybook/react";
import OfferDetails, { IOfferDetails } from "./OfferDetails";

export default {
    title: "OfferDetailsComponent/Overview",
    component: OfferDetails,
} as ComponentMeta<typeof OfferDetails>;

const Template: ComponentStory<typeof OfferDetails> = (args: IOfferDetails) => (
    <OfferDetails {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
    details: {
        price: "3558.58 EURO",
        itineraries: [
            {
                duration: {
                    hours: 37,
                    minutes: 23,
                },
                segments: [
                    {
                        id: 31,
                        departure: {
                            airport: {
                                iata: "CGN",
                                name: "COLOGNE/BONN",
                                city: "COLOGNE/BONN",
                                countryCode: "DE",
                                country: "GERMANY",
                                timezone: "+01:00",
                            },
                            at: "2022-01-25T09:50:00",
                        },
                        arrival: {
                            airport: {
                                iata: "MUC",
                                name: "MUNICH INTERNATIONAL",
                                city: "MUNICH",
                                countryCode: "DE",
                                country: "GERMANY",
                                timezone: "+01:00",
                            },
                            at: "2022-01-25T10:55:00",
                        },
                        flightNumber: "UA8917",
                        carrierCode: "UA",
                        carrier: "UNITED AIRLINES",
                        duration: {
                            hours: 1,
                            minutes: 5,
                        },
                        aircraft: "CANADAIR REGIONAL JET 900",
                        cabin: "BUSINESS",
                        classId: "P",
                    },
                    {
                        id: 32,
                        departure: {
                            airport: {
                                iata: "MUC",
                                name: "MUNICH INTERNATIONAL",
                                city: "MUNICH",
                                countryCode: "DE",
                                country: "GERMANY",
                                timezone: "+01:00",
                            },
                            at: "2022-01-25T11:55:00",
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
                            at: "2022-01-25T14:40:00",
                        },
                        flightNumber: "UA195",
                        carrierCode: "UA",
                        carrier: "UNITED AIRLINES",
                        duration: {
                            hours: 11,
                            minutes: 45,
                        },
                        aircraft: "BOEING 787-9",
                        cabin: "BUSINESS",
                        classId: "P",
                    },
                ],
            },
            {
                duration: {
                    hours: 24,
                    minutes: 35,
                },
                segments: [
                    {
                        id: 70,
                        departure: {
                            airport: {
                                iata: "HNL",
                                name: "DANIEL K INOUYE INTL",
                                city: "HONOLULU",
                                countryCode: "US",
                                country: "UNITED STATES OF AMERICA",
                                timezone: "-10:00",
                            },
                            at: "2022-02-08T08:15:00",
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
                            at: "2022-02-08T15:20:00",
                        },
                        flightNumber: "LH9177",
                        carrierCode: "LH",
                        carrier: "LUFTHANSA",
                        duration: {
                            hours: 5,
                            minutes: 5,
                        },
                        aircraft: "BOEING 777-200/300",
                        cabin: "BUSINESS",
                        classId: "P",
                    },
                    {
                        id: 71,
                        departure: {
                            airport: {
                                iata: "SFO",
                                name: "SAN FRANCISCO INTL",
                                city: "SAN FRANCISCO",
                                countryCode: "US",
                                country: "UNITED STATES OF AMERICA",
                                timezone: "-08:00",
                            },
                            at: "2022-02-08T21:40:00",
                        },
                        arrival: {
                            airport: {
                                iata: "MUC",
                                name: "MUNICH INTERNATIONAL",
                                city: "MUNICH",
                                countryCode: "DE",
                                country: "GERMANY",
                                timezone: "+01:00",
                            },
                            at: "2022-02-09T17:50:00",
                        },
                        flightNumber: "LH459",
                        carrierCode: "LH",
                        carrier: "LUFTHANSA",
                        duration: {
                            hours: 11,
                            minutes: 10,
                        },
                        aircraft: "AIRBUS A350-900",
                        cabin: "BUSINESS",
                        classId: "P",
                    },
                ],
            },
        ],
    },
    showSeatmap: console.log,
};

export const ManyStops = Template.bind({});
ManyStops.args = {
    details: {
        price: "3558.58 EURO",
        itineraries: [
            {
                duration: {
                    hours: 37,
                    minutes: 23,
                },
                segments: [
                    {
                        id: 31,
                        departure: {
                            airport: {
                                iata: "CGN",
                                name: "COLOGNE/BONN",
                                city: "COLOGNE/BONN",
                                countryCode: "DE",
                                country: "GERMANY",
                                timezone: "+01:00",
                            },
                            at: "2022-01-25T09:50:00",
                        },
                        arrival: {
                            airport: {
                                iata: "MUC",
                                name: "MUNICH INTERNATIONAL",
                                city: "MUNICH",
                                countryCode: "DE",
                                country: "GERMANY",
                                timezone: "+01:00",
                            },
                            at: "2022-01-25T10:55:00",
                        },
                        flightNumber: "UA8917",
                        carrierCode: "UA",
                        carrier: "UNITED AIRLINES",
                        duration: {
                            hours: 1,
                            minutes: 5,
                        },
                        aircraft: "CANADAIR REGIONAL JET 900",
                        cabin: "BUSINESS",
                        classId: "P",
                    },
                    {
                        id: 32,
                        departure: {
                            airport: {
                                iata: "MUC",
                                name: "MUNICH INTERNATIONAL",
                                city: "MUNICH",
                                countryCode: "DE",
                                country: "GERMANY",
                                timezone: "+01:00",
                            },
                            at: "2022-01-25T11:55:00",
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
                            at: "2022-01-25T14:40:00",
                        },
                        flightNumber: "UA195",
                        carrierCode: "UA",
                        carrier: "UNITED AIRLINES",
                        duration: {
                            hours: 11,
                            minutes: 45,
                        },
                        aircraft: "BOEING 787-9",
                        cabin: "BUSINESS",
                        classId: "P",
                    },
                    {
                        id: 33,
                        departure: {
                            airport: {
                                iata: "SFO",
                                name: "SAN FRANCISCO INTL",
                                city: "SAN FRANCISCO",
                                countryCode: "US",
                                country: "UNITED STATES OF AMERICA",
                                timezone: "-08:00",
                            },
                            at: "2022-01-26T08:40:00",
                        },
                        arrival: {
                            airport: {
                                iata: "HNL",
                                name: "DANIEL K INOUYE INTL",
                                city: "HONOLULU",
                                countryCode: "US",
                                country: "UNITED STATES OF AMERICA",
                                timezone: "-10:00",
                            },
                            at: "2022-01-26T12:13:00",
                        },
                        flightNumber: "UA1175",
                        carrierCode: "UA",
                        carrier: "UNITED AIRLINES",
                        duration: {
                            hours: 5,
                            minutes: 33,
                        },
                        aircraft: "BOEING 777-300ER",
                        cabin: "FIRST",
                        classId: "P",
                    },
                ],
            },
            {
                duration: {
                    hours: 24,
                    minutes: 35,
                },
                segments: [
                    {
                        id: 70,
                        departure: {
                            airport: {
                                iata: "HNL",
                                name: "DANIEL K INOUYE INTL",
                                city: "HONOLULU",
                                countryCode: "US",
                                country: "UNITED STATES OF AMERICA",
                                timezone: "-10:00",
                            },
                            at: "2022-02-08T08:15:00",
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
                            at: "2022-02-08T15:20:00",
                        },
                        flightNumber: "LH9177",
                        carrierCode: "LH",
                        carrier: "LUFTHANSA",
                        duration: {
                            hours: 5,
                            minutes: 5,
                        },
                        aircraft: "BOEING 777-200/300",
                        cabin: "BUSINESS",
                        classId: "P",
                    },
                    {
                        id: 71,
                        departure: {
                            airport: {
                                iata: "SFO",
                                name: "SAN FRANCISCO INTL",
                                city: "SAN FRANCISCO",
                                countryCode: "US",
                                country: "UNITED STATES OF AMERICA",
                                timezone: "-08:00",
                            },
                            at: "2022-02-08T21:40:00",
                        },
                        arrival: {
                            airport: {
                                iata: "MUC",
                                name: "MUNICH INTERNATIONAL",
                                city: "MUNICH",
                                countryCode: "DE",
                                country: "GERMANY",
                                timezone: "+01:00",
                            },
                            at: "2022-02-09T17:50:00",
                        },
                        flightNumber: "LH459",
                        carrierCode: "LH",
                        carrier: "LUFTHANSA",
                        duration: {
                            hours: 11,
                            minutes: 10,
                        },
                        aircraft: "AIRBUS A350-900",
                        cabin: "BUSINESS",
                        classId: "P",
                    },
                    {
                        id: 72,
                        departure: {
                            airport: {
                                iata: "MUC",
                                name: "MUNICH INTERNATIONAL",
                                city: "MUNICH",
                                countryCode: "DE",
                                country: "GERMANY",
                                timezone: "+01:00",
                            },
                            at: "2022-02-09T18:45:00",
                        },
                        arrival: {
                            airport: {
                                iata: "CGN",
                                name: "COLOGNE/BONN",
                                city: "COLOGNE/BONN",
                                countryCode: "DE",
                                country: "GERMANY",
                                timezone: "+01:00",
                            },
                            at: "2022-02-09T19:50:00",
                        },
                        flightNumber: "LH1988",
                        carrierCode: "LH",
                        carrier: "LUFTHANSA",
                        duration: {
                            hours: 1,
                            minutes: 5,
                        },
                        aircraft: "AIRBUS A319",
                        cabin: "ECONOMY",
                        classId: "Y",
                    },
                ],
            },
        ],
    },
    showSeatmap: console.log,
};
