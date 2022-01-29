import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as SeatmapStories from "./Seatmap.stories";
import SeatmapDeck, { ISeatmapDeck } from "./SeatmapDeck";
import * as SeatmapDisplayStories from "./SeatmapDisplay.stories";

export default {
    title: "SeatmapComp/Deck",
    component: SeatmapDeck,
} as ComponentMeta<typeof SeatmapDeck>;

const Template: ComponentStory<typeof SeatmapDeck> = (args: ISeatmapDeck) => (
    <SeatmapDeck {...args} />
);

export const Standard = Template.bind({});
Standard.args = {
    deck: SeatmapStories.Standard.args?.seatmap?.decks[0],
    focusedGridItem: SeatmapDisplayStories.Standard.args?.focusedGridItem,
    onFocusGridItem: SeatmapDisplayStories.Standard.args?.onFocusGridItem,
    bigAircraft: SeatmapDisplayStories.Standard.args?.bigAircraft,
};
