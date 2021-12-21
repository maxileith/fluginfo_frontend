import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import HeaderBar, { IHeaderBar } from "./HeaderBar";

export default {
    title: "HeaderBar/Standard",
    component: HeaderBar,
} as ComponentMeta<typeof HeaderBar>;

const Template: ComponentStory<typeof HeaderBar> = (args: IHeaderBar) => (
    <HeaderBar {...args} />
);

export const Standard = Template.bind({});
Standard.args = {};
