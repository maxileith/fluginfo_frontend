import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Icon } from "react-bulma-components";

export interface ISearchDropdownInput {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchDropdownInput({
    value,
    onChange,
    placeholder,
}: ISearchDropdownInput): JSX.Element {
    return (
        <Form.Control m="2">
            <Form.Input
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                }}
                placeholder={placeholder}
            />
            <Icon align="left">
                <FontAwesomeIcon icon={faSearch} />
            </Icon>
        </Form.Control>
    );
}
