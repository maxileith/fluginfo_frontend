import { useState } from "react";
import { Heading, Navbar } from "react-bulma-components";
import { NavigateFunction } from "react-router-dom";

export interface IHeader {
    navigate: NavigateFunction;
    currentPath?: string;
}

export default function Header({
    navigate = () => {},
    currentPath = "",
}: IHeader): JSX.Element {
    const [isActive, setIsActive] = useState<boolean>(false);

    const navigateWrapper = (location: string) => {
        if (currentPath !== location) {
            navigate(location);
        }
        setIsActive(false);
    };

    return (
        <Navbar fixed="top" color="info" active={isActive}>
            <Navbar.Brand>
                <Navbar.Item onClick={() => navigateWrapper("/")}>
                    <Heading size={4} weight="light" style={{ color: "white" }}>
                        Fluginfo
                    </Heading>
                </Navbar.Item>
                <Navbar.Burger onClick={() => setIsActive(!isActive)} />
            </Navbar.Brand>
            <Navbar.Menu>
                <Navbar.Container>
                    <Navbar.Item
                        onClick={() => navigateWrapper("/offer/search")}
                        active={currentPath === "/offer/search"}
                    >
                        Offer Search
                    </Navbar.Item>
                    <Navbar.Item
                        onClick={() => navigateWrapper("/status")}
                        active={currentPath === "/status"}
                    >
                        Status
                    </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>
        </Navbar>
    );
}
