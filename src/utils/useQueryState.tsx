import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

// https://everttimberg.io/blog/custom-react-hook-query-stateValue/
export default function useQueryState<T>(
    defaultValue: T,
    paramName: string,
    serialize: (value: T) => string = (value: T) => String(value),
    deserialize: (value: string) => T = (value: string) => value as unknown as T
): [T, Dispatch<SetStateAction<T>>] {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const paramValue = searchParams.get(paramName);

    const [stateValue, setStateValue] = useState<T>(
        paramValue === null ? defaultValue : deserialize(paramValue)
    );

    useEffect(() => {
        const serializedValue =
            stateValue === null ? null : serialize(stateValue);

        if (paramValue !== serializedValue) {
            if (serializedValue !== null) {
                searchParams.set(paramName, serializedValue);
            } else {
                searchParams.delete(paramName);
            }
            navigate(`?${searchParams.toString()}`);
        }
    }, [stateValue]);

    useEffect(() => {
        const deserializedValue =
            paramValue === null ? null : deserialize(paramValue);

        setStateValue(deserializedValue || defaultValue);
    }, [searchParams]);

    return [stateValue, setStateValue];
}
