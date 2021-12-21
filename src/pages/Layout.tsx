import { NavigateFunction } from "react-router-dom";
import CustomFooter from "../components/CustomFooter/CustomFooter";
import Header, { IHeader } from "../components/Header/Header";

export interface ILayout extends IHeader {
    children: React.ReactNode;
}

export default function Layout({ children, navigate }: ILayout): JSX.Element {
    return (
        <>
            <Header navigate={navigate} />
            {children}
            <CustomFooter />
        </>
    );
}
