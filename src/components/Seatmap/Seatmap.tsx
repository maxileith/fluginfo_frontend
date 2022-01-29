import { useState } from "react";
import { Columns } from "react-bulma-components";
import IApiSeatmap from "../../api/interfaces/IApiSeatmap";
import TApiSeatmapGridItem from "../../api/types/TApiSeatmapGridItem";
import AdvancedStickyWrapper from "../AdvancedStickyWrapper/AdvancedStickyWrapper";
import SeatmapDisplay from "./SeatmapDisplay";
import SeatmapLegend from "./SeatmapLegend";

export interface ISeatmap {
    seatmap: IApiSeatmap;
}

export default function Seatmap({ seatmap }: ISeatmap): JSX.Element {
    const [focusedGridItem, setFocusedGridItem] = useState<
        TApiSeatmapGridItem | undefined
    >(undefined);

    const widestDeck: number = seatmap.decks
        .map((d) => d.grid[0].length)
        .sort()
        .reverse()[0];

    const bigAircraft: boolean = widestDeck > 7;

    return (
        <Columns breakpoint={bigAircraft ? "desktop" : "tablet"}>
            <Columns.Column size={"5-desktop" as "one-third"}>
                <AdvancedStickyWrapper>
                    <SeatmapLegend
                        amenities={seatmap.amenities}
                        gridItem={focusedGridItem}
                    />
                </AdvancedStickyWrapper>
            </Columns.Column>
            <hr />
            <Columns.Column>
                <SeatmapDisplay
                    decks={seatmap.decks}
                    onFocusGridItem={setFocusedGridItem}
                    focusedGridItem={focusedGridItem}
                    bigAircraft={bigAircraft}
                />
            </Columns.Column>
        </Columns>
    );
}
