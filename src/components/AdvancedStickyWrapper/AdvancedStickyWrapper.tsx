import { ReactNode, useCallback, useState } from "react";
import useViewportDimensions from "../../hooks/useViewportDimensions";

export interface IAdvancedStickyWrapper {
    children?: ReactNode;
}

export default function AdvancedStickyWrapper({
    children,
}: IAdvancedStickyWrapper): JSX.Element {
    const { height } = useViewportDimensions();
    const [offset, setOffset] = useState<string>("4rem");

    const ref = useCallback(
        (node: HTMLDivElement) => {
            if (node !== null) {
                var heightDifference: number =
                    node.getBoundingClientRect().height - height;
                setOffset(
                    heightDifference <
                        -8 *
                            parseFloat(
                                getComputedStyle(document.documentElement)
                                    .fontSize
                            )
                        ? "4rem"
                        : `calc(-4rem - ${heightDifference}px)`
                );
            }
        },
        [height]
    );
    return (
        <div
            ref={ref}
            style={{
                position: "sticky",
                top: offset,
            }}
        >
            {children}
        </div>
    );
}
