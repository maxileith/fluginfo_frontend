import { useState } from "react";
import { Columns } from "react-bulma-components";
import IApiSeatmap from "../../api/interfaces/IApiSeatmap";
import TApiSeatmapGridItem from "../../api/types/TApiSeatmapGridItem";
import SeatmapDisplay from "./SeatmapDisplay";
import SeatmapLegend from "./SeatmapLegend";

export interface ISeatmap {
    seatmap: IApiSeatmap;
}

export default function Seatmap({ seatmap }: ISeatmap): JSX.Element {
    const [focusedGridItem, setFocusedGridItem] = useState<
        TApiSeatmapGridItem | undefined
    >(undefined);

    return (
        <Columns>
            <Columns.Column>
                <SeatmapLegend
                    amenities={seatmap.amenities}
                    gridItem={focusedGridItem}
                />
            </Columns.Column>
            <hr />
            <Columns.Column narrow>
                <SeatmapDisplay
                    decks={seatmap.decks}
                    onFocusGridItem={setFocusedGridItem}
                />
            </Columns.Column>
        </Columns>
    );
}
