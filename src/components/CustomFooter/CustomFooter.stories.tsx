import { ComponentStory, ComponentMeta } from "@storybook/react";
import CustomFooter, { ICustomFooter } from "./CustomFooter";

export default {
    title: "Header & Footer/Footer",
    component: CustomFooter,
} as ComponentMeta<typeof CustomFooter>;

const Template: ComponentStory<typeof CustomFooter> = (args: ICustomFooter) => (
    <CustomFooter {...args} />
);

export const Standard = Template.bind({});
Standard.args = {};
