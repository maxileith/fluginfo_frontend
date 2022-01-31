import { Loader } from "react-bulma-components";

export default function CenteredLoader(): JSX.Element {
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
