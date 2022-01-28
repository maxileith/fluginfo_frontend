import { Button, Columns, Block } from "react-bulma-components";
import { IApiDeck } from "../../api/interfaces/IApiSeatmap";

export interface ISeatmapDeck {
    deck: IApiDeck;
}

export default function SeatmapDeck({ deck }: ISeatmapDeck) {
    console.log(deck);
    return (
        <Block backgroundColor="light">
            {deck.grid.map((row, i) => (
                <Columns key={i} breakpoint="mobile" centered multiline={false}>
                    {row.map((col, j) => (
                        <Columns.Column key={j}>
                            <Button>
                                {col && col.type === "facility" && col.name}
                                {col && col.type === "seat" && col.number}
                            </Button>
                        </Columns.Column>
                    ))}
                </Columns>
            ))}
        </Block>
    );
}
