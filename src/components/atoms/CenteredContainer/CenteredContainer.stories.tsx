import { ComponentStory, ComponentMeta } from "@storybook/react";
import CenteredContainer, { ICenteredContainer } from "./CenteredContainer";

export default {
    title: "Atoms/Centered Container",
    component: CenteredContainer,
} as ComponentMeta<typeof CenteredContainer>;

const Template: ComponentStory<typeof CenteredContainer> = (
    args: ICenteredContainer
) => <CenteredContainer {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    children: <p>This Container is always in the middle of the screen.</p>,
};
