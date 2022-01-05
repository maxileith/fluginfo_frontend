import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function useDocumentTitle(): {
    documentTitle: string;
    setDocumentTitle: Dispatch<SetStateAction<string>>;
} {
    const [documentTitle, setDocumentTitle] = useState<string>(document.title);

    useEffect(() => {
        if (document.title !== documentTitle) {
            document.title = `Fluginfo: ${documentTitle}`;
        }
    }, [documentTitle]);

    return { documentTitle, setDocumentTitle };
}
