import { ComponentStory, ComponentMeta } from "@storybook/react";
import SearchDropdownLabel, {
    ISearchDropdownLabel,
} from "./SearchDropdownLabel";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default {
    title: "Molecules/Search Dropdown/Label",
    component: SearchDropdownLabel,
} as ComponentMeta<typeof SearchDropdownLabel>;

const Template: ComponentStory<typeof SearchDropdownLabel> = (
    args: ISearchDropdownLabel
) => <SearchDropdownLabel {...args} />;

export const Plain = Template.bind({});
Plain.args = {
    title: "Deutschland",
};

export const Icon = Template.bind({});
Icon.args = {
    ...Plain.args,
    icon: faGlobe,
};

export const Image = Template.bind({});
Image.args = {
    ...Plain.args,
    imageUrl:
        "https://raw.githubusercontent.com/hampusborgos/country-flags/main/svg/de.svg",
};
