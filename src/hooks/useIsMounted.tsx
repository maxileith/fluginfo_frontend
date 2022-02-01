import { MutableRefObject, useEffect, useRef } from "react";

// https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component#56537704
export default function useIsMounted(): MutableRefObject<boolean> {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    return isMounted;
}
