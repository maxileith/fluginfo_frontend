import "bulma/css/bulma.css";
import { Dropdown } from "react-bulma-components";
import SearchDropdownLabel, {
    ISearchDropdownLabel,
} from "./SearchDropdownLabel";

export interface ISearchDropdownItem extends ISearchDropdownLabel {
    value: string;
    onSelect?: () => void;
}

export default function SearchDropdownItem({
    title,
    value,
    icon,
    imageUrl,
    onSelect,
}: ISearchDropdownItem): JSX.Element {
    return (
        <Dropdown.Item renderAs="a" value={value} onClick={onSelect}>
            <SearchDropdownLabel
                title={title}
                icon={icon}
                imageUrl={imageUrl}
            />
        </Dropdown.Item>
    );
}
