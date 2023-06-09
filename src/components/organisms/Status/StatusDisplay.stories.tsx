import { ComponentStory, ComponentMeta } from "@storybook/react";
import StatusDisplay, { IStatusDisplay } from "./StatusDisplay";

export default {
    title: "Organisms/Status/Display",
    component: StatusDisplay,
} as ComponentMeta<typeof StatusDisplay>;

const Template: ComponentStory<typeof StatusDisplay> = (
    args: IStatusDisplay
) => <StatusDisplay {...args} />;

export const Overview = Template.bind({});
Overview.args = {
    status: {
        flightNumber: "LH438",
        carrierCode: "LH",
        departure: {
            airport: {
                iata: "FRA",
                name: "FRANKFURT INTL",
                city: "FRANKFURT",
                countryCode: "DE",
                country: "GERMANY",
                timezone: "+01:00",
            },
            at: "2022-03-01T09:55:00",
        },
        arrival: {
            airport: {
                iata: "DFW",
                name: "DALLAS FT WORTH INTL",
                city: "DALLAS",
                countryCode: "US",
                country: "UNITED STATES OF AMERICA",
                timezone: "-06:00",
            },
            at: "2022-03-01T14:15:00",
        },
        duration: 680,
        aircraft: "AIRBUS A330-300",
        availableSeats: [
            { classId: "J", seats: 1 },
            { classId: "C", seats: 7 },
            { classId: "D", seats: 9 },
            { classId: "Z", seats: 3 },
            { classId: "P", seats: 9 },
            { classId: "G", seats: 9 },
            { classId: "E", seats: 2 },
            { classId: "N", seats: 9 },
            { classId: "Y", seats: 4 },
            { classId: "B", seats: 9 },
            { classId: "M", seats: 9 },
            { classId: "U", seats: 1 },
            { classId: "H", seats: 9 },
            { classId: "Q", seats: 3 },
            { classId: "V", seats: 4 },
            { classId: "W", seats: 9 },
            { classId: "S", seats: 5 },
            { classId: "T", seats: 9 },
            { classId: "L", seats: 8 },
            { classId: "K", seats: 9 },
        ],
        carrier: "LUFTHANSA",
    },
    showSeatmap: (s) => console.log(`seatmap triggered: ${s}`),
    liveTimings: {
        departure: "2022-03-01T10:34:00",
        arrival: "2022-03-01T14:15:00",
    },
};
