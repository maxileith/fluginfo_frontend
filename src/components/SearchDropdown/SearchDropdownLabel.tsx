import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bulma/css/bulma.css";
import { Image, Level } from "react-bulma-components";

export interface ISearchDropdownLabel {
    title: string;
    icon?: IconDefinition;
    imageUrl?: string;
}

export default function SearchDropdownLabel({
    title,
    icon,
    imageUrl,
}: ISearchDropdownLabel): JSX.Element {
    return (
        <Level>
            <Level.Side align="left">
                {icon && (
                    <Level.Item>
                        <FontAwesomeIcon icon={icon} size="lg" />
                    </Level.Item>
                )}
                {imageUrl && (
                    <Level.Item>
                        <Image src={imageUrl} size={24} display="inline-flex" />
                    </Level.Item>
                )}
                <Level.Item>{title}</Level.Item>
            </Level.Side>
        </Level>
    );
}
