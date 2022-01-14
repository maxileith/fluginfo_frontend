import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { Dropdown, Icon } from "react-bulma-components";
import SearchDropdownInput from "./SearchDropdownInput";
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
    waitUntilSearch?: number;
    disabled?: boolean;
}

export default function SearchDropdown({
    onSelect,
    dropdownItems,
    onSearch,
    searchPlaceholder,
    defaultLabel,
    waitUntilSearch = 500,
    disabled,
}: ISearchDropdown): JSX.Element {
    const [keyword, setKeyword] = useState<string>("");
    const keywordRef = useRef(keyword);
    keywordRef.current = keyword;

    const [labelProps, setLabelProps] = useState<ISearchDropdownLabel>(
        defaultLabel ? defaultLabel : { title: "-" }
    );

    const handleSelect = (item: ISearchDropdownItem) => {
        setLabelProps(item as ISearchDropdownLabel);
        onSelect(item.value);
    };

    const handleSearch = (value: string) => {
        window.setTimeout(() => {
            if (value === keywordRef.current) {
                onSearch(value);
            }
        }, waitUntilSearch);
        setKeyword(value);
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
            <SearchDropdownInput
                value={keyword}
                onChange={handleSearch}
                placeholder={searchPlaceholder}
            />
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
