import { ComponentStory, ComponentMeta } from "@storybook/react";
import SelectAirport, { ISelectAirport } from "./SelectAirport";

export default {
    title: "Molecules/Select Airport",
    component: SelectAirport,
} as ComponentMeta<typeof SelectAirport>;

const Template: ComponentStory<typeof SelectAirport> = (
    args: ISelectAirport
) => <SelectAirport {...args} />;

export const Origin = Template.bind({});
Origin.args = {
    onSelect: console.log,
    type: "origin",
};

export const Destination = Template.bind({});
Destination.args = {
    ...Origin.args,
    type: "destination",
    defaultAirport: undefined,
};
