import SearchDropdown from "../SearchDropdown/SearchDropdown";
import API from "../../Api";
import { ISearchDropdownItem } from "../SearchDropdown/SearchDropdownItem";
import { useState } from "react";
import IAirports from "../../apiInterfaces/IAirports";
import {
    faPlaneArrival,
    faPlaneDeparture,
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
            console.log(data);
            const airports: IAirports[] = data.data.data;
            setDropdownItems(
                airports.map((airport) => ({
                    title: `${airport.iata} - ${airport.city}`,
                    imageUrl: `${API.defaults.baseURL}/metadata/countries/flag/?countryCode=${airport.countryCode}`,
                    value: airport.iata,
                }))
            );
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
        />
    );
}
