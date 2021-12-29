import { ComponentStory, ComponentMeta } from "@storybook/react";
import CenteredLoader from "./CenteredLoader";

export default {
    title: "CenteredLoader/CenteredLoader",
    component: CenteredLoader,
} as ComponentMeta<typeof CenteredLoader>;

const Template: ComponentStory<typeof CenteredLoader> = () => (
    <CenteredLoader />
);

export const Standard = Template.bind({});
