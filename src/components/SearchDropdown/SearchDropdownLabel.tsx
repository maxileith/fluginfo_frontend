import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bulma/css/bulma.css";
import { Content, Image, Media } from "react-bulma-components";

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
        <Media>
            {icon && (
                <Media.Item align="left" renderAs="figure">
                    <FontAwesomeIcon icon={icon} />
                </Media.Item>
            )}
            {imageUrl && (
                <Media.Item align="left" renderAs="figure">
                    <Image src={imageUrl} size={24} display="inline-flex" />
                </Media.Item>
            )}
            <Media.Item>
                <Content>
                    <p>{title}</p>
                </Content>
            </Media.Item>
        </Media>
    );
}
