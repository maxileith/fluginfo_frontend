import { useState } from "react";
import { Columns } from "react-bulma-components";
import { NavigateFunction } from "react-router";
import IApiSeatmap from "../../../api/interfaces/IApiSeatmap";
import TApiSeatmapGridItem from "../../../api/types/TApiSeatmapGridItem";
import AdvancedStickyWrapper from "../../atoms/AdvancedStickyWrapper/AdvancedStickyWrapper";
import SeatmapDisplay from "./SeatmapDisplay";
import SeatmapLegend from "./SeatmapLegend";

export interface ISeatmap {
    seatmap: IApiSeatmap;
    navigate: NavigateFunction;
}

export default function Seatmap({
    seatmap,
    navigate = () => {},
}: ISeatmap): JSX.Element {
    const [focusedGridItem, setFocusedGridItem] =
        useState<TApiSeatmapGridItem | undefined>(undefined);

    const widestDeck: number = seatmap.decks
        .map((d) => d.grid[0].length)
        .sort()
        .reverse()[0];

    const bigAircraft: boolean = widestDeck >= 8;

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
                    navigate={navigate}
                />
            </Columns.Column>
        </Columns>
    );
}
