import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Content, Footer } from "react-bulma-components";
import { NavigateFunction } from "react-router-dom";
import packageJson from "../../../../package.json";

export interface ICustomFooter {
    navigate: NavigateFunction;
}

export default function CustomFooter({
    navigate = () => {},
}: ICustomFooter): JSX.Element {
    const footerContent = (
        <Container>
            <Content style={{ textAlign: "center" }}>
                <p>
                    {packageJson.version} |{" "}
                    <a onClick={() => navigate("/storybook")}>Storybook</a> |{" "}
                    <a onClick={() => navigate("/swagger")}>Swagger</a> | Made
                    with <FontAwesomeIcon icon={faHeart} /> by{" "}
                    <a
                        href="https://de.linkedin.com/in/maxileith"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Maximilian Leith
                    </a>
                    .
                </p>
            </Content>
        </Container>
    );

    return (
        <>
            <Footer
                py={4}
                style={{
                    marginBottom: "-1rem",
                    visibility: "hidden",
                }}
            >
                {footerContent}
            </Footer>
            <Footer
                py={4}
                style={{
                    position: "fixed",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    zIndex: 10,
                }}
            >
                {footerContent}
            </Footer>
        </>
    );
}
