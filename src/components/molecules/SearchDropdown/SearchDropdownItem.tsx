import "bulma/css/bulma.css";
import { Dropdown } from "react-bulma-components";
import SearchDropdownLabel, {
    ISearchDropdownLabel,
} from "./SearchDropdownLabel";

export interface ISearchDropdownItem extends ISearchDropdownLabel {
    value: string;
    onClick?: () => void;
}

export default function SearchDropdownItem({
    title,
    value,
    icon,
    imageUrl,
    onClick,
}: ISearchDropdownItem): JSX.Element {
    return (
        <Dropdown.Item
            value={value}
            key={value}
            renderAs="a"
            href="#!"
            onClick={(e: any) => {
                e.preventDefault();
                onClick && onClick();
            }}
        >
            <SearchDropdownLabel
                title={title}
                icon={icon}
                imageUrl={imageUrl}
            />
        </Dropdown.Item>
    );
}
