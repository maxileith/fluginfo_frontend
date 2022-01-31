import { Color } from "react-bulma-components/src/components";
import "bulma-slider/dist/css/bulma-slider.min.css";

export interface IRangeInput {
    min?: number;
    max?: number;
    value?: number;
    onChange?: (value: number) => void;
    isFullWidth?: boolean;
    color?: Color;
    isCircle?: boolean;
    step?: number;
    outputText?: string;
    size?: "small" | "medium" | "large";
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
}: IRangeInput): JSX.Element {
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
                value={value}
                step={step}
                type="range"
                onChange={(e) => {
                    onChange && onChange(e.target.valueAsNumber);
                }}
                style={{ margin: ".5rem 0" }}
            />
            {outputText && <output>{outputText}</output>}
        </>
    );
}
