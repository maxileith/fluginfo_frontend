import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as StatusDisplayStories from "./StatusDisplay.stories";
import StatusDisplayFlight, {
    IStatusDisplayFlight,
} from "./StatusDisplayFlight";

export default {
    title: "StatusComp/Display",
    component: StatusDisplayFlight,
} as ComponentMeta<typeof StatusDisplayFlight>;

const Template: ComponentStory<typeof StatusDisplayFlight> = (
    args: IStatusDisplayFlight
) => <StatusDisplayFlight {...args} />;

export const Flight = Template.bind({});
Flight.args = StatusDisplayStories.Overview.args?.status;
