import { ComponentStory, ComponentMeta } from "@storybook/react";
import CustomFooter from "./CustomFooter";

export default {
    title: "Header & Footer/Footer",
    component: CustomFooter,
} as ComponentMeta<typeof CustomFooter>;

const Template: ComponentStory<typeof CustomFooter> = () => <CustomFooter />;

export const Standard = Template.bind({});
