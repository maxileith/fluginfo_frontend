import { ComponentStory, ComponentMeta } from "@storybook/react";
import RangeInput, { IRangeInput } from "./RangeInput";

export default {
    title: "RangeInput/Circle",
    component: RangeInput,
} as ComponentMeta<typeof RangeInput>;

const Template: ComponentStory<typeof RangeInput> = (args: IRangeInput) => (
    <RangeInput {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
    min: 333,
    max: 888,
    onChange: (s) => console.log(`change: ${s}`),
    color: "info",
    isCircle: true,
    step: 10,
    isFullWidth: true,
    value: 500,
    outputText: "yeet",
};
