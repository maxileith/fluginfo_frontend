import CustomFooter from "../components/CustomFooter/CustomFooter";
import Header from "../components/Header/Header";

export interface ILayout {
    children: React.ReactNode;
}

export default function Layout({ children }: ILayout): JSX.Element {
    return (
        <>
            <Header />
            {children}
            <CustomFooter />
        </>
    );
}
