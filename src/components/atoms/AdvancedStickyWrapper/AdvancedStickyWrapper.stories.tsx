import { ComponentStory, ComponentMeta } from "@storybook/react";
import AdvancedStickyWrapper, {
    IAdvancedStickyWrapper,
} from "./AdvancedStickyWrapper";

export default {
    title: "Atoms/Advanced Sticky Wrapper",
    component: AdvancedStickyWrapper,
} as ComponentMeta<typeof AdvancedStickyWrapper>;

const Template: ComponentStory<typeof AdvancedStickyWrapper> = (
    args: IAdvancedStickyWrapper
) => <AdvancedStickyWrapper {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    children: (
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
        </p>
    ),
};
