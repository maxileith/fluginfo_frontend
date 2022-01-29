import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as SeatmapStories from "./Seatmap.stories";
import SeatmapLegend, { ISeatmapLegend } from "./SeatmapLegend";

export default {
    title: "SeatmapComp/Legend",
    component: SeatmapLegend,
} as ComponentMeta<typeof SeatmapLegend>;

const Template: ComponentStory<typeof SeatmapLegend> = (
    args: ISeatmapLegend
) => <SeatmapLegend {...args} />;

export const Seat = Template.bind({});
Seat.args = {
    amenities: SeatmapStories.Standard.args?.seatmap?.amenities,
    gridItem: SeatmapStories.Standard.args?.seatmap?.decks[0].grid[2][5],
};

export const Facility = Template.bind({});
Facility.args = {
    amenities: SeatmapStories.Standard.args?.seatmap?.amenities,
    gridItem: SeatmapStories.Standard.args?.seatmap?.decks[0].grid[0][4],
};

export const Nothing = Template.bind({});
Nothing.args = {
    amenities: SeatmapStories.Standard.args?.seatmap?.amenities,
};
