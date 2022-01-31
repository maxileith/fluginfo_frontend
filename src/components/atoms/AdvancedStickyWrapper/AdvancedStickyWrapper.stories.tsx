import { ComponentStory, ComponentMeta } from "@storybook/react";
import AdvancedStickyWrapper, {
    IAdvancedStickyWrapper,
} from "./AdvancedStickyWrapper";

export default {
    title: "Atoms/AdvancedStickyWrapper",
    component: AdvancedStickyWrapper,
} as ComponentMeta<typeof AdvancedStickyWrapper>;

const Template: ComponentStory<typeof AdvancedStickyWrapper> = (
    args: IAdvancedStickyWrapper
) => <AdvancedStickyWrapper {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    children: <p>Das ist ein Test!</p>,
};
