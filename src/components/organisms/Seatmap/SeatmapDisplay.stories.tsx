import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as SeatmapStories from "./Seatmap.stories";
import SeatmapDisplay, { ISeatmapDisplay } from "./SeatmapDisplay";

export default {
    title: "Organisms/Seatmap/Display",
    component: SeatmapDisplay,
} as ComponentMeta<typeof SeatmapDisplay>;

const Template: ComponentStory<typeof SeatmapDisplay> = (
    args: ISeatmapDisplay
) => <SeatmapDisplay {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    decks: SeatmapStories.Standard.args?.seatmap?.decks,
    focusedGridItem: undefined,
    onFocusGridItem: (s) => console.log(`focused grid item: ${s}`),
    bigAircraft: true,
};

export const Big = Template.bind({});
Big.args = {
    ...Standard.args,
    decks: SeatmapStories.Big.args?.seatmap?.decks,
};

export const MultiDeck = Template.bind({});
MultiDeck.args = {
    ...Standard.args,
    decks: SeatmapStories.MultiDeck.args?.seatmap?.decks,
};
