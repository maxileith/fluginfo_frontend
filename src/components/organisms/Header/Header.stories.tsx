import { ComponentStory, ComponentMeta } from "@storybook/react";
import Header, { IHeader } from "./Header";

export default {
    title: "Organisms/Header",
    component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args: IHeader) => (
    <Header {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
    navigate: () => {},
};
