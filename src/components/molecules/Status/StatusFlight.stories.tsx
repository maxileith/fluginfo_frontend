import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as StatusStories from "../../organisms/Status/Status.stories";
import StatusFlight, { IStatusFlight } from "./StatusFlight";

export default {
    title: "Molecules/Status/Flight",
    component: StatusFlight,
} as ComponentMeta<typeof StatusFlight>;

const Template: ComponentStory<typeof StatusFlight> = (args: IStatusFlight) => (
    <StatusFlight {...args} />
);

export const Standard = Template.bind({});
Standard.args = StatusStories.Overview.args?.status;
