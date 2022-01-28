import { IApiDeck } from "../../api/interfaces/IApiSeatmap";

export interface ISeatmapDisplay {
    decks: IApiDeck[];
}

export default function SeatmapDisplay({
    decks,
}: ISeatmapDisplay): JSX.Element {
    return <></>;
}
