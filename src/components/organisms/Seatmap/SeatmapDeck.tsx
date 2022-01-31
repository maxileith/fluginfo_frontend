import { Columns, Content, Image } from "react-bulma-components";
import { IApiDeck } from "../../../api/interfaces/IApiSeatmap";
import TApiSeatmapGridItem from "../../../api/types/TApiSeatmapGridItem";

export interface ISeatmapDeck {
    deck: IApiDeck;
    onFocusGridItem: (item: TApiSeatmapGridItem) => void;
    focusedGridItem?: TApiSeatmapGridItem;
    bigAircraft: boolean;
}

type TShapeBase = "End" | "I" | "Island";
type TShapeFacility =
    | TShapeBase
    | "Corner"
    | "Edge"
    | "MissingCorner"
    | "MissingCornersAcross"
    | "MissingTwoCorners"
    | "MissingThreeCorners"
    | "EdgeMissingCorner1"
    | "EdgeMissingCorner2"
    | "Full"
    | "L"
    | "T"
    | "X";
type TRotation = 0 | 90 | 180 | 270;

function isSameSeat(a: TApiSeatmapGridItem, b: TApiSeatmapGridItem): boolean {
    if (!a || !b || a.type !== "seat" || b.type !== "seat") {
        return false;
    }
    return a.number === b.number;
}

function gridItemMatches(
    focusedGridItem: TApiSeatmapGridItem,
    gridItem: TApiSeatmapGridItem
): boolean {
    if (focusedGridItem === null && gridItem === null) {
        return true;
    } else if (focusedGridItem === null || gridItem === null) {
        return false;
    } else if (focusedGridItem.type === "seat" && gridItem.type === "seat") {
        return true;
    } else if (
        focusedGridItem.type === "facility" &&
        gridItem.type === "facility"
    ) {
        return focusedGridItem.name === gridItem.name;
    }
    return false;
}

function getSameNeighbors(
    grid: TApiSeatmapGridItem[][],
    x: number,
    y: number
): {
    sameTop: boolean;
    sameTopRight: boolean;
    sameRight: boolean;
    sameBottomRight: boolean;
    sameBottom: boolean;
    sameBottomLeft: boolean;
    sameLeft: boolean;
    sameTopLeft: boolean;
} {
    var sameTop: boolean = false;
    var sameTopRight: boolean = false;
    var sameRight: boolean = false;
    var sameBottomRight: boolean = false;
    var sameBottom: boolean = false;
    var sameBottomLeft: boolean = false;
    var sameLeft: boolean = false;
    var sameTopLeft: boolean = false;

    try {
        sameTop = gridItemMatches(grid[y][x], grid[y - 1][x]);
    } catch {}
    try {
        sameTopRight = gridItemMatches(grid[y][x], grid[y - 1][x + 1]);
    } catch {}
    try {
        sameRight = gridItemMatches(grid[y][x], grid[y][x + 1]);
    } catch {}
    try {
        sameBottomRight = gridItemMatches(grid[y][x], grid[y + 1][x + 1]);
    } catch {}
    try {
        sameBottom = gridItemMatches(grid[y][x], grid[y + 1][x]);
    } catch {}
    try {
        sameBottomLeft = gridItemMatches(grid[y][x], grid[y + 1][x - 1]);
    } catch {}
    try {
        sameLeft = gridItemMatches(grid[y][x], grid[y][x - 1]);
    } catch {}
    try {
        sameTopLeft = gridItemMatches(grid[y][x], grid[y - 1][x - 1]);
    } catch {}

    return {
        sameTop,
        sameTopRight,
        sameRight,
        sameBottomRight,
        sameBottom,
        sameBottomLeft,
        sameLeft,
        sameTopLeft,
    };
}

function getShapeRotationSeat(
    grid: TApiSeatmapGridItem[][],
    x: number,
    y: number
): { shape: TShapeBase; rotation: TRotation } {
    const { sameRight, sameLeft } = getSameNeighbors(grid, x, y);

    if (sameRight && sameLeft) {
        return { shape: "I", rotation: 90 };
    } else if (sameRight) {
        return { shape: "End", rotation: 90 };
    } else if (sameLeft) {
        return { shape: "End", rotation: 270 };
    } else {
        return { shape: "Island", rotation: 0 };
    }
}

function getShapeComplex(
    grid: TApiSeatmapGridItem[][],
    x: number,
    y: number
): { shape: TShapeFacility; rotation: TRotation } {
    const {
        sameTop,
        sameTopRight,
        sameRight,
        sameBottomRight,
        sameBottom,
        sameBottomLeft,
        sameLeft,
        sameTopLeft,
    } = getSameNeighbors(grid, x, y);

    if (
        sameTop &&
        sameTopRight &&
        sameRight &&
        sameBottomRight &&
        sameBottom &&
        sameBottomLeft &&
        sameLeft &&
        sameTopLeft
    ) {
        return { shape: "Full", rotation: 0 };
    } else if (
        sameTop &&
        sameTopRight &&
        sameRight &&
        sameBottomRight &&
        sameBottom &&
        sameBottomLeft &&
        sameTopLeft
    ) {
        return { shape: "Edge", rotation: 0 };
    } else if (
        sameTopRight &&
        sameRight &&
        sameBottomRight &&
        sameBottom &&
        sameBottomLeft &&
        sameLeft &&
        sameTopLeft
    ) {
        return { shape: "Edge", rotation: 90 };
    } else if (
        sameTop &&
        sameTopRight &&
        sameBottomRight &&
        sameBottom &&
        sameBottomLeft &&
        sameLeft &&
        sameTopLeft
    ) {
        return { shape: "Edge", rotation: 180 };
    } else if (
        sameTop &&
        sameTopRight &&
        sameRight &&
        sameBottomRight &&
        sameBottomLeft &&
        sameLeft &&
        sameTopLeft
    ) {
        return { shape: "Edge", rotation: 270 };
    } else if (
        sameTop &&
        sameRight &&
        sameBottomRight &&
        sameBottom &&
        sameBottomLeft &&
        sameLeft &&
        sameTopLeft
    ) {
        return { shape: "MissingCorner", rotation: 0 };
    } else if (
        sameTop &&
        sameTopRight &&
        sameRight &&
        sameBottom &&
        sameBottomLeft &&
        sameLeft &&
        sameTopLeft
    ) {
        return { shape: "MissingCorner", rotation: 90 };
    } else if (
        sameTop &&
        sameTopRight &&
        sameRight &&
        sameBottomRight &&
        sameBottom &&
        sameLeft &&
        sameTopLeft
    ) {
        return { shape: "MissingCorner", rotation: 180 };
    } else if (
        sameTop &&
        sameTopRight &&
        sameRight &&
        sameBottomRight &&
        sameBottom &&
        sameBottomLeft &&
        sameLeft
    ) {
        return { shape: "MissingCorner", rotation: 270 };
    } else if (
        sameTop &&
        sameRight &&
        sameBottomRight &&
        sameBottom &&
        sameLeft &&
        sameTopLeft
    ) {
        return { shape: "MissingCornersAcross", rotation: 0 };
    } else if (
        sameTop &&
        sameTopRight &&
        sameRight &&
        sameBottom &&
        sameBottomLeft &&
        sameLeft
    ) {
        return { shape: "MissingCornersAcross", rotation: 90 };
    } else if (
        sameTop &&
        sameTopRight &&
        sameRight &&
        sameBottom &&
        sameLeft &&
        sameTopLeft
    ) {
        return { shape: "MissingTwoCorners", rotation: 0 };
    } else if (
        sameTop &&
        sameTopRight &&
        sameRight &&
        sameBottomRight &&
        sameBottom &&
        sameLeft
    ) {
        return { shape: "MissingTwoCorners", rotation: 90 };
    } else if (
        sameTop &&
        sameRight &&
        sameBottomRight &&
        sameBottom &&
        sameBottomLeft &&
        sameLeft
    ) {
        return { shape: "MissingTwoCorners", rotation: 180 };
    } else if (
        sameTop &&
        sameRight &&
        sameBottom &&
        sameBottomLeft &&
        sameLeft &&
        sameTopLeft
    ) {
        return { shape: "MissingTwoCorners", rotation: 270 };
    } else if (sameTop && sameRight && sameBottom && sameLeft && sameTopLeft) {
        return { shape: "MissingThreeCorners", rotation: 0 };
    } else if (sameTop && sameTopRight && sameRight && sameBottom && sameLeft) {
        return { shape: "MissingThreeCorners", rotation: 90 };
    } else if (
        sameTop &&
        sameRight &&
        sameBottomRight &&
        sameBottom &&
        sameLeft
    ) {
        return { shape: "MissingThreeCorners", rotation: 180 };
    } else if (
        sameTop &&
        sameRight &&
        sameBottom &&
        sameBottomLeft &&
        sameLeft
    ) {
        return { shape: "MissingThreeCorners", rotation: 270 };
    } else if (
        sameTop &&
        sameTopRight &&
        sameRight &&
        sameBottomRight &&
        sameBottom
    ) {
        return { shape: "Edge", rotation: 0 };
    } else if (
        sameRight &&
        sameBottomRight &&
        sameBottom &&
        sameBottomLeft &&
        sameLeft
    ) {
        return { shape: "Edge", rotation: 90 };
    } else if (
        sameTop &&
        sameBottom &&
        sameBottomLeft &&
        sameLeft &&
        sameTopLeft
    ) {
        return { shape: "Edge", rotation: 180 };
    } else if (
        sameTop &&
        sameTopRight &&
        sameRight &&
        sameLeft &&
        sameTopLeft
    ) {
        return { shape: "Edge", rotation: 270 };
    } else if (sameTop && sameRight && sameBottom && sameLeft) {
        return { shape: "X", rotation: 0 };
    } else if (sameTop && sameRight && sameBottomRight && sameBottom) {
        return { shape: "EdgeMissingCorner1", rotation: 0 };
    } else if (sameRight && sameBottom && sameBottomLeft && sameLeft) {
        return { shape: "EdgeMissingCorner1", rotation: 90 };
    } else if (sameTop && sameBottom && sameLeft && sameTopLeft) {
        return { shape: "EdgeMissingCorner1", rotation: 180 };
    } else if (sameTop && sameTopRight && sameRight && sameLeft) {
        return { shape: "EdgeMissingCorner1", rotation: 270 };
    } else if (sameTop && sameTopRight && sameRight && sameBottom) {
        return { shape: "EdgeMissingCorner2", rotation: 0 };
    } else if (sameRight && sameBottomRight && sameBottom && sameLeft) {
        return { shape: "EdgeMissingCorner2", rotation: 90 };
    } else if (sameTop && sameBottom && sameBottomLeft && sameLeft) {
        return { shape: "EdgeMissingCorner2", rotation: 180 };
    } else if (sameTop && sameRight && sameLeft && sameTopLeft) {
        return { shape: "EdgeMissingCorner2", rotation: 270 };
    } else if (sameTop && sameTopRight && sameRight) {
        return { shape: "Corner", rotation: 0 };
    } else if (sameRight && sameBottomRight && sameBottom) {
        return { shape: "Corner", rotation: 90 };
    } else if (sameBottom && sameBottomLeft && sameLeft) {
        return { shape: "Corner", rotation: 180 };
    } else if (sameTop && sameLeft && sameTopLeft) {
        return { shape: "Corner", rotation: 270 };
    } else if (sameRight && sameBottom && sameLeft) {
        return { shape: "T", rotation: 0 };
    } else if (sameTop && sameBottom && sameLeft) {
        return { shape: "T", rotation: 90 };
    } else if (sameTop && sameRight && sameLeft) {
        return { shape: "T", rotation: 180 };
    } else if (sameTop && sameRight && sameBottom) {
        return { shape: "T", rotation: 270 };
    } else if (sameTop && sameBottom) {
        return { shape: "I", rotation: 0 };
    } else if (sameLeft && sameRight) {
        return { shape: "I", rotation: 90 };
    } else if (sameTop && sameRight) {
        return { shape: "L", rotation: 0 };
    } else if (sameRight && sameBottom) {
        return { shape: "L", rotation: 90 };
    } else if (sameBottom && sameLeft) {
        return { shape: "L", rotation: 180 };
    } else if (sameTop && sameLeft) {
        return { shape: "L", rotation: 270 };
    } else if (sameTop) {
        return { shape: "End", rotation: 0 };
    } else if (sameRight) {
        return { shape: "End", rotation: 90 };
    } else if (sameBottom) {
        return { shape: "End", rotation: 180 };
    } else if (sameLeft) {
        return { shape: "End", rotation: 270 };
    } else {
        return { shape: "Island", rotation: 0 };
    }
}

export default function SeatmapDeck({
    deck,
    onFocusGridItem,
    focusedGridItem,
    bigAircraft,
}: ISeatmapDeck) {
    return (
        <>
            {deck.grid.map((row, y) => (
                <Columns key={y} breakpoint="mobile" centered multiline={false}>
                    {(deck.wingsX || deck.exitRowsX) && (
                        <Columns.Column
                            paddingless
                            style={{
                                maxWidth: 60,
                            }}
                        >
                            {deck.wingsX && (
                                <Image
                                    src={
                                        deck.wingsX.start > y ||
                                        deck.wingsX.end < y
                                            ? "/seatmap/air.png"
                                            : deck.wingsX.start === y
                                            ? "/seatmap/wings/frontL.png"
                                            : deck.wingsX.end === y
                                            ? "/seatmap/wings/rearL.png"
                                            : "/seatmap/wings/mid.png"
                                    }
                                />
                            )}
                            {deck.exitRowsX && deck.exitRowsX.includes(y) && (
                                <Image
                                    src="/seatmap/exit.png"
                                    style={{ marginTop: "-100%" }}
                                />
                            )}
                        </Columns.Column>
                    )}
                    <Columns.Column
                        paddingless
                        backgroundColor="light"
                        style={{ width: "1rem" }}
                        narrow
                    />
                    {row.map((col, x) => (
                        <Columns.Column
                            key={x}
                            paddingless
                            style={{ maxWidth: 60, cursor: "pointer" }}
                            backgroundColor="light"
                        >
                            {col &&
                                col.type === "seat" &&
                                (() => {
                                    const { shape, rotation } =
                                        getShapeRotationSeat(deck.grid, x, y);
                                    return (
                                        <>
                                            <Image
                                                src={`/seatmap/griditems/seats/seat${shape}.png`}
                                                style={{
                                                    transform: `rotate(${rotation}deg)`,
                                                    filter: col.available
                                                        ? ""
                                                        : "saturate(0)",
                                                    opacity:
                                                        focusedGridItem !==
                                                            undefined &&
                                                        isSameSeat(
                                                            focusedGridItem,
                                                            col
                                                        )
                                                            ? 0.5
                                                            : 1,
                                                }}
                                                onClick={() =>
                                                    onFocusGridItem(col)
                                                }
                                            />
                                            <Content
                                                style={{
                                                    marginTop: "-100%",
                                                    position: "relative",
                                                    top: "50%",
                                                    zIndex: 1,
                                                    color: "white",
                                                    transform:
                                                        "translateY(-50%)",
                                                    fontSize: `min(1rem, ${
                                                        bigAircraft
                                                            ? "2vw"
                                                            : "3.5vw"
                                                    })`,
                                                }}
                                                onClick={() =>
                                                    onFocusGridItem(col)
                                                }
                                                textAlign="center"
                                            >
                                                <p>{col.number}</p>
                                            </Content>
                                        </>
                                    );
                                })()}
                            {col &&
                                col.type === "facility" &&
                                (() => {
                                    const { shape, rotation } = getShapeComplex(
                                        deck.grid,
                                        x,
                                        y
                                    );
                                    return (
                                        <Image
                                            src={`/seatmap/griditems/facilities/facility${shape}.png`}
                                            style={{
                                                transform: `rotate(${rotation}deg)`,
                                                opacity:
                                                    focusedGridItem !==
                                                        undefined &&
                                                    gridItemMatches(
                                                        focusedGridItem,
                                                        col
                                                    )
                                                        ? 0.5
                                                        : 1,
                                            }}
                                            onClick={() => onFocusGridItem(col)}
                                        />
                                    );
                                })()}
                            {col === null &&
                                (() => {
                                    const { shape, rotation } = getShapeComplex(
                                        deck.grid,
                                        x,
                                        y
                                    );
                                    return (
                                        <Image
                                            src={`/seatmap/griditems/aisle/aisle${shape}.png`}
                                            style={{
                                                transform: `rotate(${rotation}deg)`,
                                                opacity:
                                                    focusedGridItem !==
                                                        undefined &&
                                                    gridItemMatches(
                                                        focusedGridItem,
                                                        col
                                                    )
                                                        ? 0.5
                                                        : 1,
                                            }}
                                            onClick={() => onFocusGridItem(col)}
                                        />
                                    );
                                })()}
                        </Columns.Column>
                    ))}
                    <Columns.Column
                        paddingless
                        backgroundColor="light"
                        style={{ width: "1rem" }}
                        narrow
                    />
                    {(deck.wingsX || deck.exitRowsX) && (
                        <Columns.Column paddingless style={{ maxWidth: 60 }}>
                            {deck.wingsX && (
                                <Image
                                    src={
                                        deck.wingsX.start > y ||
                                        deck.wingsX.end < y
                                            ? "/seatmap/air.png"
                                            : deck.wingsX.start === y
                                            ? "/seatmap/wings/frontR.png"
                                            : deck.wingsX.end === y
                                            ? "/seatmap/wings/rearR.png"
                                            : "/seatmap/wings/mid.png"
                                    }
                                />
                            )}
                            {deck.exitRowsX && deck.exitRowsX.includes(y) && (
                                <Image
                                    src="/seatmap/exit.png"
                                    style={{ marginTop: "-100%" }}
                                />
                            )}
                        </Columns.Column>
                    )}
                </Columns>
            ))}
        </>
    );
}
