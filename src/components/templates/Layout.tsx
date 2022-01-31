import { Container } from "react-bulma-components";
import CustomFooter from "../organisms/CustomFooter/CustomFooter";
import Header, { IHeader } from "../organisms/Header/Header";

export interface ILayout extends IHeader {
    children: React.ReactNode;
}

export default function Layout({ children, navigate }: ILayout): JSX.Element {
    return (
        <>
            <Header navigate={navigate} />
            <Container breakpoint="fullhd" max p={4} pb={0}>
                {children}
            </Container>
            <CustomFooter />
        </>
    );
}
