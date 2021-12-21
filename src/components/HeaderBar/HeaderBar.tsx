import { useState } from "react";
import { Heading, Navbar } from "react-bulma-components";

export interface IHeaderBar {}

export default function HeaderBar({}: IHeaderBar): JSX.Element {
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
                    <Navbar.Item href="#">Offer Search</Navbar.Item>
                    <Navbar.Item href="#">Seat Availability</Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>
        </Navbar>
    );
}
