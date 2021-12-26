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

    const [stateValue, setStateValue] = useState<T>(
        deserialize(searchParams.get(paramName) as string) || defaultValue
    );

    useEffect(() => {
        const serializedValue =
            stateValue === null ? null : serialize(stateValue);

        if (searchParams.get(paramName) !== serializedValue) {
            if (serializedValue !== null) {
                searchParams.set(paramName, serializedValue);
            } else {
                searchParams.delete(paramName);
            }
            navigate(`?${searchParams.toString()}`);
        }
    }, [stateValue]);

    useEffect(() => {
        const deserializedValue = deserialize(
            searchParams.get(paramName) as string
        );

        setStateValue(deserializedValue);
    }, [searchParams]);

    return [stateValue, setStateValue];
}
