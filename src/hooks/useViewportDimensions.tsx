import { useEffect, useState } from "react";

export default function useViewportDimensions(): {
    width: number;
    height: number;
} {
    const [height, setHeight] = useState<number>(window.innerHeight);
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setHeight(window.innerHeight);
            setWidth(window.innerWidth);
        });
    }, []);

    return { width, height };
}
