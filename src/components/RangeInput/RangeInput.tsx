import { Color } from "react-bulma-components/src/components";
import "bulma-slider/dist/css/bulma-slider.min.css";
import { useRef, useState } from "react";

export interface IRangeInput {
    min?: number;
    max?: number;
    value: number;
    onChange: (value: number) => void;
    isFullWidth?: boolean;
    color?: Color;
    isCircle?: boolean;
    step?: number;
    outputText?: string;
    size?: "small" | "medium" | "large";
    waitUntilChange?: number;
}

export default function RangeInput({
    min = 0,
    max = 100,
    value,
    onChange,
    isFullWidth,
    isCircle,
    color,
    step = 1,
    outputText,
    size,
    waitUntilChange = 0,
}: IRangeInput): JSX.Element {
    const [changingValue, setChangingValue] = useState<number | undefined>(
        undefined
    );
    const changingValueRef = useRef(changingValue);
    changingValueRef.current = changingValue;

    const handleChange = (value: number) => {
        window.setTimeout(() => {
            //console.log(value);
            //console.log(changingValueRef.current);
            if (value === changingValueRef.current) {
                onChange(value);
                setChangingValue(undefined);
            }
        }, waitUntilChange);
        setChangingValue(value);
    };

    return (
        <>
            <input
                className={`slider ${outputText && "has-output"} ${
                    isFullWidth && "is-fullwidth"
                } ${isCircle && "is-circle"} ${color && "is-" + color} ${
                    size && "is-" + size
                }`}
                min={min}
                max={max}
                value={changingValue || value}
                step={step}
                type="range"
                onChange={(e) => handleChange(e.target.valueAsNumber)}
                style={{ margin: ".5rem 0" }}
            />
            {outputText && <output>{outputText}</output>}
        </>
    );
}
