import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import useLazyStateWrapper from "./useLazyStateWrapper";

export interface IUseQueryState<T> {
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
    equals?: (a: T, b: T) => boolean;
    alwaysInUrl?: boolean;
}

// https://everttimberg.io/blog/custom-react-hook-query-stateValue/
export default function useQueryState<T>(
    defaultValue: T,
    paramName: string,
    options: IUseQueryState<T> = {}
): [T, Dispatch<SetStateAction<T>>] {
    // specify default values of options
    const o = {
        serialize: (value: T) =>
            typeof value === "object" ? JSON.stringify(value) : String(value),
        deserialize: (value: string): T =>
            typeof defaultValue === "number"
                ? (Number(value) as unknown as T)
                : typeof defaultValue === "object"
                ? JSON.parse(value)
                : typeof defaultValue === "boolean"
                ? value === "true"
                    ? true
                    : false
                : (value as unknown as T),
        equals: (a: T, b: T): boolean =>
            typeof a === "object"
                ? JSON.stringify(a) === JSON.stringify(b)
                : a === b,
        alwaysInUrl: false,
        ...options,
    };

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const paramValue = searchParams.get(paramName);

    const [stateValue, setStateValue] = useState<T>(
        paramValue === null ? defaultValue : o.deserialize(paramValue)
    );

    // update query parameters on state change
    useEffect(() => {
        const serializedValue =
            stateValue === null ? null : o.serialize(stateValue);

        if (paramValue !== serializedValue) {
            var changed: boolean = false;
            if (o.alwaysInUrl) {
                searchParams.set(paramName, serializedValue || "");
                changed = true;
            } else if (
                serializedValue !== null &&
                !o.equals(stateValue, defaultValue)
            ) {
                searchParams.set(paramName, serializedValue);
                changed = true;
            } else if (paramValue !== null) {
                searchParams.delete(paramName);
                changed = true;
            }
            if (changed) {
                navigate(`?${searchParams.toString()}`, { replace: true });
            }
        }
    }, [stateValue]);

    return useLazyStateWrapper([stateValue, setStateValue]);
}
