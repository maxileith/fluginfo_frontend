import { Loader } from "react-bulma-components";

export interface ICenteredLoader {}

export default function CenteredLoader({}: ICenteredLoader): JSX.Element {
    return (
        <Loader
            style={{
                position: "absolute",
                top: "calc(40vh - 1.5rem)",
                left: "calc(50% - 1.5rem)",
                fontSize: "3rem",
            }}
        />
    );
}
