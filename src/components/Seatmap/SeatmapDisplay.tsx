import { IApiDeck } from "../../api/interfaces/IApiSeatmap";
import SeatmapDeck from "./SeatmapDeck";

export interface ISeatmapDisplay {
    decks: IApiDeck[];
}

export default function SeatmapDisplay({
    decks,
}: ISeatmapDisplay): JSX.Element {
    return <SeatmapDeck deck={decks[0]} />;
}
