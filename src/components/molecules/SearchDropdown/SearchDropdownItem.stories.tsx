import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchDropdownItem, { ISearchDropdownItem } from "./SearchDropdownItem";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import * as SearchDropdownLabelStories from "./SearchDropdownLabel.stories";

export default {
    title: "SearchDropdown/Item",
    component: SearchDropdownItem,
} as ComponentMeta<typeof SearchDropdownItem>;

const Template: ComponentStory<typeof SearchDropdownItem> = (
    args: ISearchDropdownItem
) => <SearchDropdownItem {...args} />;

export const Plain = Template.bind({});
Plain.args = {
    ...SearchDropdownLabelStories.Plain.args,
    value: "DE",
};

export const Icon = Template.bind({});
Icon.args = {
    ...Plain.args,
    ...SearchDropdownLabelStories.Icon.args,
};

export const Image = Template.bind({});
Image.args = {
    ...Plain.args,
    ...SearchDropdownLabelStories.Image.args,
};
