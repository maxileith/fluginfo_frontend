import { Tabs } from "react-bulma-components";
import { IApiDeck } from "../../api/interfaces/IApiSeatmap";
import TApiSeatmapGridItem from "../../api/types/TApiSeatmapGridItem";
import useQueryState from "../../utils/useQueryState";
import SeatmapDeck from "./SeatmapDeck";

export interface ISeatmapDisplay {
    decks: IApiDeck[];
    onFocusGridItem: (item: TApiSeatmapGridItem) => void;
}

export default function SeatmapDisplay({
    decks,
    onFocusGridItem,
}: ISeatmapDisplay): JSX.Element {
    const [deck, setDeck] = useQueryState<number>(1, "deck");

    return (
        <>
            {decks.length > 1 && (
                <Tabs>
                    {decks.map((d, i) => (
                        <Tabs.Tab
                            active={deck === i + 1}
                            onClick={() => setDeck(i + 1)}
                        >
                            Deck {i + 1}
                        </Tabs.Tab>
                    ))}
                </Tabs>
            )}
            <SeatmapDeck
                deck={decks[deck - 1]}
                onFocusGridItem={onFocusGridItem}
            />
        </>
    );
}
