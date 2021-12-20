import { useState } from "react";
import { Dropdown } from "react-bulma-components";
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
}

export default function SearchDropdown({
    onSelect,
    dropdownItems,
    onSearch,
    searchPlaceholder,
    defaultLabel,
}: ISearchDropdown): JSX.Element {
    const [keyword, setKeyword] = useState<string>("");
    const [labelProps, setLabelProps] = useState<ISearchDropdownLabel>(
        defaultLabel ? defaultLabel : { title: "-" }
    );

    const handleSelect = (item: ISearchDropdownItem) => {
        setLabelProps(item as ISearchDropdownLabel);
        onSelect(item.value);
    };

    const handleSearch = (value: string) => {
        setKeyword(value);
        onSearch(value);
    };

    return (
        <Dropdown label={<SearchDropdownLabel {...labelProps} />} closeOnSelect>
            <SearchDropdownInput
                value={keyword}
                onChange={handleSearch}
                placeholder={searchPlaceholder}
            />
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
