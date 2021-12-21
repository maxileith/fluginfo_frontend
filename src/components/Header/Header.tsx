import { useState } from "react";
import { Heading, Navbar } from "react-bulma-components";
import { NavigateFunction } from "react-router-dom";

export interface IHeader {
    navigate: NavigateFunction;
}

export default function Header({ navigate }: IHeader): JSX.Element {
    const [isActive, setIsActive] = useState<boolean>(false);

    return (
        <Navbar fixed="top" color="info" active={isActive}>
            <Navbar.Brand>
                <Navbar.Item>
                    <Heading size={4} weight="light" style={{ color: "white" }}>
                        Fluginfo
                    </Heading>
                </Navbar.Item>
                <Navbar.Burger onClick={() => setIsActive(!isActive)} />
            </Navbar.Brand>
            <Navbar.Menu>
                <Navbar.Container>
                    <Navbar.Item onClick={() => navigate("/offer-search")}>
                        Offer Search
                    </Navbar.Item>
                    <Navbar.Item onClick={() => navigate("/status")}>
                        Status
                    </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>
        </Navbar>
    );
}
