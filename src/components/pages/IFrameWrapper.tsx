export interface IIFrameWrapper {
    src: string;
}

export default function IFrameWrapper({ src }: IIFrameWrapper): JSX.Element {
    return (
        <iframe
            src={src}
            style={{
                height: "calc(100vh - 7.25rem)",
                width: "100%",
            }}
        />
    );
}
