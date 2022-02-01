import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import useEffectNotOnMount from "./useEffectNotOnMount";
import useIsMounted from "./useIsMounted";

export default function useLazyStateWrapper<T>(
    s: [T, Dispatch<SetStateAction<T>> | ((x: T) => void)],
    waitMs: number = 250,
    equals: (a: T, b: T) => boolean = (a: T, b: T) =>
        typeof a === "object"
            ? JSON.stringify(a) === JSON.stringify(b)
            : a === b
): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = s;
    const isMounted = useIsMounted();

    const [stateLive, setStateLive] = useState<T>(state);
    const liveStateRef = useRef(stateLive);
    liveStateRef.current = stateLive;

    useEffectNotOnMount(() => {
        window.setTimeout(() => {
            if (equals(stateLive, liveStateRef.current)) {
                isMounted.current && setState(stateLive);
            }
        }, waitMs);
    }, [stateLive]);

    useEffect(() => {
        setStateLive(state);
    }, [state]);

    return [stateLive, setStateLive];
}
