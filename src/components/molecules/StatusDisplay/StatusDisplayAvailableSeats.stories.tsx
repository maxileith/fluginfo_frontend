import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as StatusDisplayStories from "../../organisms/StatusDisplay/StatusDisplay.stories";
import StatusDisplayAvailableSeats, {
    IStatusDisplayAvailableSeats,
} from "./StatusDisplayAvailableSeats";

export default {
    title: "StatusComp/Display",
    component: StatusDisplayAvailableSeats,
} as ComponentMeta<typeof StatusDisplayAvailableSeats>;

const Template: ComponentStory<typeof StatusDisplayAvailableSeats> = (
    args: IStatusDisplayAvailableSeats
) => <StatusDisplayAvailableSeats {...args} />;

export const AvailableSeats = Template.bind({});
AvailableSeats.args = {
    availableSeats: StatusDisplayStories.Overview.args?.status?.availableSeats,
    showSeatmap: StatusDisplayStories.Overview.args?.showSeatmap,
};
