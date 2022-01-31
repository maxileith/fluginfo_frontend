import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export default function useEffectNotOnMount(
    effect: EffectCallback,
    deps?: DependencyList
): void {
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            effect();
        }
    }, deps);
}
