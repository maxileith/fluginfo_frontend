import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as HeaderStories from "../Header/Header.stories";
import Layout, { ILayout } from "./Layout";

export default {
    title: "Layout",
    component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = (args: ILayout) => (
    <Layout {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
    children: <p>Some Content</p>,
    ...HeaderStories.Standard.args,
};
