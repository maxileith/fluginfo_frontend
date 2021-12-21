import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Content, Footer, Hero } from "react-bulma-components";

export interface ICustomFooter {}

export default function CustomFooter({}: ICustomFooter): JSX.Element {
    const footerContent = (
        <Container>
            <Content style={{ textAlign: "center" }}>
                <p>
                    Made with <FontAwesomeIcon icon={faHeart} /> by{" "}
                    <a href="https://leith.de" target="_blank">
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
                    margin: "2rem -1rem -1rem -1rem",
                    visibility: "hidden",
                    zIndex: -10,
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
