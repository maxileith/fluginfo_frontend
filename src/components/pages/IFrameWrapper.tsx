import { useEffect } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";

export interface IIFrameWrapper {
    src: string;
    title: string;
    makeTitleOfTab?: boolean;
}

export default function IFrameWrapper({
    src,
    title,
    makeTitleOfTab,
}: IIFrameWrapper): JSX.Element {
    const { setDocumentTitle } = useDocumentTitle();
    useEffect(() => {
        makeTitleOfTab && setDocumentTitle(title);
    }, [setDocumentTitle, title, makeTitleOfTab]);

    return (
        <iframe
            title={title}
            src={src}
            style={{
                height: "calc(100vh - 7.25rem)",
                width: "100%",
            }}
        />
    );
}
