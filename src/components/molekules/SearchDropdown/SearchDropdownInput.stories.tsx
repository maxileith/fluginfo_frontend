import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchDropdownInput, {
    ISearchDropdownInput,
} from "./SearchDropdownInput";

export default {
    title: "SearchDropdown/Input",
    component: SearchDropdownInput,
} as ComponentMeta<typeof SearchDropdownInput>;

const Template: ComponentStory<typeof SearchDropdownInput> = (
    args: ISearchDropdownInput
) => <SearchDropdownInput {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    value: "",
    onChange: console.log,
    placeholder: "Search",
};
