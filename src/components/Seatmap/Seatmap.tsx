import { Columns } from "react-bulma-components";
import IApiSeatmap from "../../api/interfaces/IApiSeatmap";
import SeatmapDisplay from "./SeatmapDisplay";
import SeatmapLegend from "./SeatmapLegend";

export interface ISeatmap {
    seatmap: IApiSeatmap;
}

export default function Seatmap({ seatmap }: ISeatmap): JSX.Element {
    return (
        <Columns centered>
            <Columns.Column narrow>
                <SeatmapDisplay decks={seatmap.decks} />
            </Columns.Column>
            <Columns.Column narrow>
                <SeatmapLegend
                    amenities={seatmap.amenities}
                    gridItem={undefined}
                />
            </Columns.Column>
        </Columns>
    );
}
