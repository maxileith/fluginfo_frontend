import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SelectAirport, { ISelectAirport } from "./SelectAirport";

export default {
    title: "SelectAirport/Standard",
    component: SelectAirport,
} as ComponentMeta<typeof SelectAirport>;

const Template: ComponentStory<typeof SelectAirport> = (
    args: ISelectAirport
) => <SelectAirport {...args} />;

export const Arrival = Template.bind({});
Arrival.args = {
    onSelect: console.log,
    type: "arrival",
};

export const Departure = Template.bind({});
Departure.args = {
    ...Arrival.args,
    type: "departure",
};
