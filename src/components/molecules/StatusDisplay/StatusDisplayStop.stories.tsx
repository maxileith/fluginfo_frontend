import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as StatusDisplayStories from "../../organisms/StatusDisplay/StatusDisplay.stories";
import StatusDisplayStop, { IStatusDisplayStop } from "./StatusDisplayStop";

export default {
    title: "StatusComp/Display",
    component: StatusDisplayStop,
} as ComponentMeta<typeof StatusDisplayStop>;

const Template: ComponentStory<typeof StatusDisplayStop> = (
    args: IStatusDisplayStop
) => <StatusDisplayStop {...args} />;

export const Stop = Template.bind({});
Stop.args = {
    type: "departure",
    stop: StatusDisplayStories.Overview.args?.status?.departure,
};
