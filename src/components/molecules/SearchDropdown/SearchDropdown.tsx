import { faSearch, faUndo, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Dropdown, Form, Icon } from "react-bulma-components";
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

    const handleReset = () => {
        setLabelProps(defaultLabel ? defaultLabel : { title: "-" });
        onSelect("");
    };

    const handleSelect = (item: ISearchDropdownItem) => {
        setLabelProps(item as ISearchDropdownLabel);
        onSelect(item.value);
        setActive(false);
    };

    const [active, setActive] = useState<boolean>(false);

    return (
        <div className={`dropdown ${active ? "is-active" : ""}`}>
            <div className="dropdown-trigger">
                {active ? (
                    <Form.Field className="has-addons">
                        <Form.Control>
                            <Form.Input
                                value={keyword}
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                }}
                                placeholder={searchPlaceholder}
                                disabled={disabled}
                                autoFocus
                                onBlur={() =>
                                    dropdownItems.length === 0 &&
                                    setActive(false)
                                }
                            />
                            <Icon align="left">
                                <FontAwesomeIcon icon={faSearch} />
                            </Icon>
                        </Form.Control>
                        <Form.Control>
                            <Button
                                type="button"
                                color="warning"
                                colorVariant="light"
                                onClick={() => setActive(false)}
                                disabled={disabled}
                                tabIndex={-1}
                            >
                                <Icon>
                                    <FontAwesomeIcon icon={faX} />
                                </Icon>
                            </Button>
                        </Form.Control>
                    </Form.Field>
                ) : (
                    <Form.Field className="has-addons">
                        <Form.Control>
                            <Button
                                type="button"
                                disabled={disabled}
                                onFocus={() => setActive(true)}
                            >
                                <SearchDropdownLabel {...labelProps} />
                            </Button>
                        </Form.Control>
                        <Form.Control>
                            <Button
                                type="button"
                                color="warning"
                                colorVariant="light"
                                onClick={handleReset}
                                disabled={
                                    disabled ||
                                    JSON.stringify(defaultLabel) ===
                                        JSON.stringify(labelProps)
                                }
                                tabIndex={-1}
                            >
                                <Icon>
                                    <FontAwesomeIcon icon={faUndo} />
                                </Icon>
                            </Button>
                        </Form.Control>
                    </Form.Field>
                )}
            </div>
            {dropdownItems.length !== 0 && (
                <div className="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {dropdownItems.map((item) => (
                            <SearchDropdownItem
                                onClick={() => handleSelect(item)}
                                {...item}
                                key={item.value}
                            />
                        ))}
                    </div>
                    <a href="#!" onFocus={() => setActive(false)}></a>
                </div>
            )}
        </div>
    );
}
