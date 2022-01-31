import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as StatusStories from "../../organisms/Status/StatusDisplay.stories";
import StatusStop, { IStatusStop } from "./StatusStop";

export default {
    title: "Molecules/Status/Stop",
    component: StatusStop,
} as ComponentMeta<typeof StatusStop>;

const Template: ComponentStory<typeof StatusStop> = (args: IStatusStop) => (
    <StatusStop {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
    type: "departure",
    stop: StatusStories.Overview.args?.status?.departure,
};
