import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Content, Footer } from "react-bulma-components";

export default function CustomFooter(): JSX.Element {
    const footerContent = (
        <Container>
            <Content style={{ textAlign: "center" }}>
                <p>
                    Made with <FontAwesomeIcon icon={faHeart} /> by{" "}
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
                    margin: "2rem 0 -1rem 0",
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
                    marginTop: "2rem",
                    zIndex: 10,
                }}
            >
                {footerContent}
            </Footer>
        </>
    );
}