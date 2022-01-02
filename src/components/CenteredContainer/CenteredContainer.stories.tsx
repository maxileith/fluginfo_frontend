import { ComponentStory, ComponentMeta } from "@storybook/react";
import CenteredContainer, { ICenteredContainer } from "./CenteredContainer";

export default {
    title: "Centered/CenteredContainer",
    component: CenteredContainer,
} as ComponentMeta<typeof CenteredContainer>;

const Template: ComponentStory<typeof CenteredContainer> = (
    args: ICenteredContainer
) => <CenteredContainer {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    children: <p>Das ist ein Test!</p>,
};
