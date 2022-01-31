import { faAngleDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Dropdown, Form, Icon } from "react-bulma-components";
import useLazyStateWrapper from "../../../hooks/useLazyStateWrapper";
import SearchDropdownItem, { ISearchDropdownItem } from "./SearchDropdownItem";
import SearchDropdownLabel, {
    ISearchDropdownLabel,
} from "./SearchDropdownLabel";

export interface ISearchDropdown {
    onSelect: (value: string) => void;
    dropdownItems: ISearchDropdownItem[];
    onSearch: (keyword: string) => void;
    title?: string;
    searchPlaceholder?: string;
    defaultLabel?: ISearchDropdownLabel;
    disabled?: boolean;
}

export default function SearchDropdown({
    onSelect,
    dropdownItems,
    onSearch,
    searchPlaceholder,
    defaultLabel,
    disabled,
}: ISearchDropdown): JSX.Element {
    const [keyword, setKeyword] = useLazyStateWrapper<string>(["", onSearch]);

    const [labelProps, setLabelProps] = useState<ISearchDropdownLabel>(
        defaultLabel ? defaultLabel : { title: "-" }
    );

    const handleSelect = (item: ISearchDropdownItem) => {
        setLabelProps(item as ISearchDropdownLabel);
        onSelect(item.value);
    };

    return (
        <Dropdown
            label={<SearchDropdownLabel {...labelProps} />}
            icon={
                <Icon ml="1">
                    <FontAwesomeIcon icon={faAngleDown} />
                </Icon>
            }
            onClick={(e: React.MouseEvent) => e.preventDefault()}
            disabled={disabled}
        >
            <Form.Control m="2">
                <Form.Input
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}
                    placeholder={searchPlaceholder}
                />
                <Icon align="left">
                    <FontAwesomeIcon icon={faSearch} />
                </Icon>
            </Form.Control>
            {dropdownItems.length !== 0 ? <Dropdown.Divider /> : <></>}
            {dropdownItems.map((item) => (
                <SearchDropdownItem
                    key={item.value}
                    {...item}
                    onSelect={() => handleSelect(item)}
                />
            ))}
        </Dropdown>
    );
}
