import SearchDropdown from "../SearchDropdown/SearchDropdown";
import API from "../../Api";
import { ISearchDropdownItem } from "../SearchDropdown/SearchDropdownItem";
import { useState } from "react";
import IAirport from "../../api/interfaces/IAirport";
import {
    faPlaneArrival,
    faPlaneDeparture,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";

export interface ISelectAirport {
    onSelect: (iata: string) => void;
    type: "origin" | "destination";
    defaultAirport?: string;
}

export default function SelectAirport({
    onSelect,
    type,
    defaultAirport,
}: ISelectAirport): JSX.Element {
    const [dropdownItems, setDropdownItems] = useState<ISearchDropdownItem[]>(
        []
    );

    const defaultLabel =
        defaultAirport !== undefined
            ? {
                  title: defaultAirport,
                  value: defaultAirport,
                  icon: faQuestion,
              }
            : {
                  title:
                      type === "origin"
                          ? "Origin Airport"
                          : "Destination Airport",
                  icon: type === "origin" ? faPlaneDeparture : faPlaneArrival,
              };

    const handleSearch = (keyword: string) => {
        API.get("metadata/airports/search/", { params: { s: keyword } }).then(
            (data) => {
                const airports: IAirport[] = data.data.data;
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
            }
        );
        // TODO: Error handling
    };

    return (
        <SearchDropdown
            onSelect={onSelect}
            dropdownItems={dropdownItems}
            onSearch={handleSearch}
            defaultLabel={defaultLabel}
            searchPlaceholder="Search"
        />
    );
}
