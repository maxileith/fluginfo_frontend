import { URLSearchParamsInit } from "react-router-dom";

type TUseSearchParams = (
    defaultInit?: URLSearchParamsInit | undefined
) => readonly [
    URLSearchParams,
    (
        nextInit: URLSearchParamsInit,
        navigateOptions?:
            | {
                  replace?: boolean | undefined;
                  state?: any;
              }
            | undefined
    ) => void
];

export default TUseSearchParams;
