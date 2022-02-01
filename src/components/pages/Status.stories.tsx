import { ComponentMeta, ComponentStory } from "@storybook/react";
import Status, { IStatus } from "./Status";

export default {
    title: "Pages/Status",
    component: Status,
} as ComponentMeta<typeof Status>;

const Template: ComponentStory<typeof Status> = (args: IStatus) => (
    <Status {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
    navigate: () => {},
};
