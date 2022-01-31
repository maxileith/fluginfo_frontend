import { useState } from "react";
import { Tabs } from "react-bulma-components";
import { NavigateFunction } from "react-router";
import { IApiDeck } from "../../api/interfaces/IApiSeatmap";
import TApiSeatmapGridItem from "../../api/types/TApiSeatmapGridItem";
import useQueryState from "../../hooks/useQueryState";
import SeatmapDeck from "./SeatmapDeck";

export interface ISeatmapDisplay {
    decks: IApiDeck[];
    onFocusGridItem: (item: TApiSeatmapGridItem) => void;
    focusedGridItem?: TApiSeatmapGridItem;
    bigAircraft: boolean;
    navigate: NavigateFunction;
}

export default function SeatmapDisplay({
    decks,
    onFocusGridItem,
    focusedGridItem,
    bigAircraft,
    navigate = () => {},
}: ISeatmapDisplay): JSX.Element {
    const [deck, setDeck] = useQueryState<number>(0, "deck", navigate);

    const [focusedGridItemDeck, setFocusedGridItemDeck] = useState<
        number | undefined
    >(undefined);

    const handleFocusGridItem = (item: TApiSeatmapGridItem) => {
        setFocusedGridItemDeck(deck);
        onFocusGridItem(item);
    };

    return (
        <>
            {decks.length > 1 && (
                <Tabs>
                    {decks.map((d, i) => (
                        <Tabs.Tab
                            active={deck === i}
                            onClick={() => setDeck(i)}
                        >
                            Deck {i + 1}
                        </Tabs.Tab>
                    ))}
                </Tabs>
            )}
            <SeatmapDeck
                deck={decks[deck]}
                onFocusGridItem={handleFocusGridItem}
                focusedGridItem={
                    deck === focusedGridItemDeck ? focusedGridItem : undefined
                }
                bigAircraft={bigAircraft}
            />
        </>
    );
}
