import { Container } from "react-bulma-components";

export interface ICenteredContainer {
    children: React.ReactNode;
}

export default function CenteredContainer({
    children,
}: ICenteredContainer): JSX.Element {
    return (
        <Container
            textAlign="center"
            style={{
                position: "absolute",
                top: "40vh",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)",
            }}
        >
            {children}
        </Container>
    );
}
