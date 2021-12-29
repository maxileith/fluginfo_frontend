import { Container } from "react-bulma-components";
import CustomFooter from "../components/CustomFooter/CustomFooter";
import Header, { IHeader } from "../components/Header/Header";

export interface ILayout extends IHeader {
    children: React.ReactNode;
}

export default function Layout({ children, navigate }: ILayout): JSX.Element {
    return (
        <>
            <Header navigate={navigate} />
            <Container breakpoint="desktop" max p={4} pb={0}>
                {children}
            </Container>
            <CustomFooter />
        </>
    );
}
