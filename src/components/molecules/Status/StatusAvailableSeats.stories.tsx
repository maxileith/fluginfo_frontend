import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as StatusStories from "../../organisms/Status/Status.stories";
import StatusAvailableSeats, {
    IStatusAvailableSeats,
} from "./StatusAvailableSeats";

export default {
    title: "Molecules/Status/Available Seats",
    component: StatusAvailableSeats,
} as ComponentMeta<typeof StatusAvailableSeats>;

const Template: ComponentStory<typeof StatusAvailableSeats> = (
    args: IStatusAvailableSeats
) => <StatusAvailableSeats {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    availableSeats: StatusStories.Overview.args?.status?.availableSeats,
    showSeatmap: StatusStories.Overview.args?.showSeatmap,
};
