import { ComponentStory, ComponentMeta } from "@storybook/react";
import RangeInput, { IRangeInput } from "./RangeInput";

export default {
    title: "Atoms/Range Input",
    component: RangeInput,
} as ComponentMeta<typeof RangeInput>;

const Template: ComponentStory<typeof RangeInput> = (args: IRangeInput) => (
    <RangeInput {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
    min: 1,
    max: 10,
};

export const Colored = Template.bind({});
Colored.args = {
    min: 1,
    max: 10,
    color: "info",
};

export const CircleKnob = Template.bind({});
CircleKnob.args = {
    min: 1,
    max: 10,
    color: "warning",
    isCircle: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
    min: 1,
    max: 100,
    color: "success",
    isFullWidth: true,
};

export const WithOutputText = Template.bind({});
WithOutputText.args = {
    min: 1,
    max: 100,
    color: "primary",
    outputText: "test",
};
