import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchDropdown, { ISearchDropdown } from "./SearchDropdown";
import * as SearchDropdownItemStories from "./SearchDropdownItem.stories";
import { ISearchDropdownItem } from "./SearchDropdownItem";

export default {
    title: "Molecules/Search Dropdown/Overview",
    component: SearchDropdown,
} as ComponentMeta<typeof SearchDropdown>;

const Template: ComponentStory<typeof SearchDropdown> = (
    args: ISearchDropdown
) => <SearchDropdown {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    onSelect: console.log,
    onSearch: console.log,
    searchPlaceholder: "Search",
    dropdownItems: [
        SearchDropdownItemStories.Plain.args as ISearchDropdownItem,
        SearchDropdownItemStories.Icon.args as ISearchDropdownItem,
        SearchDropdownItemStories.Image.args as ISearchDropdownItem,
    ],
    defaultLabel: {
        title: "default",
    },
    disabled: false,
};
