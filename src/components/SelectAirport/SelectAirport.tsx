import SearchDropdown from "../SearchDropdown/SearchDropdown";
import API from "../../Api";
import { ISearchDropdownItem } from "../SearchDropdown/SearchDropdownItem";
import { useState } from "react";
import IAirports from "../../apiInterfaces/IAirports";
import {
    faPlaneArrival,
    faPlaneDeparture,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";

export interface ISelectAirport {
    onSelect: (iata: string) => void;
    type: "departure" | "arrival";
}

export default function SelectAirport({
    onSelect,
    type,
}: ISelectAirport): JSX.Element {
    const [dropdownItems, setDropdownItems] = useState<ISearchDropdownItem[]>(
        []
    );

    const handleSearch = (keyword: string) => {
        API.get(
            `metadata/airports/search/?s=${encodeURIComponent(keyword)}`
        ).then((data) => {
            const airports: IAirports[] = data.data.data;
            var items: ISearchDropdownItem[] = airports.map((airport) => ({
                title: `${airport.iata} - ${airport.city}`,
                imageUrl: `${API.defaults.baseURL}/metadata/countries/flag/?countryCode=${airport.countryCode}`,
                value: airport.iata,
            }));

            if (
                keyword !== "" &&
                keyword.indexOf(" ") <= -1 &&
                !items.find(
                    (i) => i.value.toUpperCase() === keyword.toUpperCase()
                )
            ) {
                items = [
                    {
                        title: keyword.toUpperCase(),
                        value: keyword.toUpperCase(),
                        icon: faQuestion,
                    },
                    ...items,
                ];
            }

            setDropdownItems(items);
        });
        // TODO: Error handling
    };

    return (
        <SearchDropdown
            onSelect={onSelect}
            dropdownItems={dropdownItems}
            onSearch={handleSearch}
            defaultLabel={{
                title: "Select Airport",
                icon: type === "departure" ? faPlaneDeparture : faPlaneArrival,
            }}
            searchPlaceholder="Search"
        />
    );
}
