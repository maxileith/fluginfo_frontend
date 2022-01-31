import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchDropdown, { ISearchDropdown } from "./SearchDropdown";
import * as SearchDropdownItemStories from "./SearchDropdownItem.stories";
import { ISearchDropdownItem } from "./SearchDropdownItem";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { ISearchDropdownLabel } from "./SearchDropdownLabel";

export default {
    title: "Molecules/Search Dropdown/Overview",
    component: SearchDropdown,
} as ComponentMeta<typeof SearchDropdown>;

const Template: ComponentStory<typeof SearchDropdown> = (
    args: ISearchDropdown
) => <SearchDropdown {...args} />;

export const Plain = Template.bind({});
Plain.args = {
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

export const Icon = Template.bind({});
Icon.args = {
    ...Plain.args,
    defaultLabel: {
        ...Plain.args.defaultLabel,
        icon: faGlobe,
    } as ISearchDropdownLabel,
};

export const Image = Template.bind({});
Image.args = {
    ...Plain.args,
    defaultLabel: {
        ...Plain.args.defaultLabel,
        imageUrl:
            "https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/de.svg",
    } as ISearchDropdownLabel,
};
