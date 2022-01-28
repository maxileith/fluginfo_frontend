import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as SeatmapStories from "./Seatmap.stories";
import SeatmapDisplay, { ISeatmapDisplay } from "./SeatmapDisplay";

export default {
    title: "SeatmapComp/Display",
    component: SeatmapDisplay,
} as ComponentMeta<typeof SeatmapDisplay>;

const Template: ComponentStory<typeof SeatmapDisplay> = (
    args: ISeatmapDisplay
) => <SeatmapDisplay {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    decks: SeatmapStories.Standard.args?.seatmap?.decks,
};
