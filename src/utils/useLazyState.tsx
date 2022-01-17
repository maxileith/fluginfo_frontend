import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export interface IUseLazyState<T> {
    initialState: T | (() => T);
    waitMs?: number;
}

export default function useLazyState<T>({
    initialState,
    waitMs = 250,
}: IUseLazyState<T>): [
    T,
    T | undefined,
    Dispatch<SetStateAction<T | undefined>>
] {
    const [state, setState] = useState<T>(initialState);
    const [liveState, setLiveState] = useState<T | undefined>(initialState);
    const liveStateRef = useRef(liveState);
    liveStateRef.current = liveState;

    useEffect(() => {
        window.setTimeout(() => {
            if (liveState && liveState === liveStateRef.current) {
                setLiveState(undefined);
                setState(liveState);
            }
        }, 250);
    }, [liveState]);

    return [state, liveState, setLiveState];
}
