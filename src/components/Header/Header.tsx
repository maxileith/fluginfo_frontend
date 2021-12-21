import { useState } from "react";
import { Heading, Navbar } from "react-bulma-components";
import { NavigateFunction, To, useNavigate } from "react-router-dom";

export interface IHeader {}

export default function Header({}: IHeader): JSX.Element {
    const [isActive, setIsActive] = useState<boolean>(false);

    var navigate: NavigateFunction;
    try {
        navigate = useNavigate();
    } catch (e) {
        navigate = () => {};
    }

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
                    <Navbar.Item onClick={() => navigate("/availability")}>
                        Availability
                    </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>
        </Navbar>
    );
}
