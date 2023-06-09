import SearchDropdown from "../SearchDropdown/SearchDropdown";
import API from "../../../Api";
import { ISearchDropdownItem } from "../SearchDropdown/SearchDropdownItem";
import { useState } from "react";
import IApiAirport from "../../../api/interfaces/IApiAirport";
import {
    faPlaneArrival,
    faPlaneDeparture,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import unknownErrorHandling from "../../../utils/unknownErrorHandling";
import useIsMounted from "../../../hooks/useIsMounted";
import { arrayMoveImmutable } from "array-move";

export interface ISelectAirport {
    onSelect: (iata: string) => void;
    type: "origin" | "destination";
    defaultAirport?: string;
    disabled?: boolean;
    autoFocus?: boolean;
}

export default function SelectAirport({
    onSelect,
    type,
    defaultAirport,
    disabled,
    autoFocus,
}: ISelectAirport): JSX.Element {
    const isMounted = useIsMounted();

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
        API.get("metadata/airports/search/", { params: { s: keyword } })
            .then((data) => {
                const airports: IApiAirport[] = data.data.data;
                var items: ISearchDropdownItem[] = airports.map((airport) => ({
                    title: `${airport.iata} - ${airport.city}`,
                    imageUrl: `${API.defaults.baseURL}/metadata/countries/flag/?countryCode=${airport.countryCode}`,
                    value: airport.iata,
                }));

                if (keyword !== "" && keyword.indexOf(" ") <= -1) {
                    var iataAirportIndex = items.findIndex(
                        (i) => i.value.toUpperCase() === keyword.toUpperCase()
                    );
                    if (iataAirportIndex !== -1) {
                        items = arrayMoveImmutable(items, iataAirportIndex, 0);
                    } else {
                        items = [
                            {
                                title: keyword.toUpperCase(),
                                value: keyword.toUpperCase(),
                                icon: faQuestion,
                            },
                            ...items,
                        ];
                    }
                }
                isMounted.current && setDropdownItems(items);
            })
            .catch((error) => {
                isMounted.current &&
                    setDropdownItems([] as ISearchDropdownItem[]);
                if (error.response === undefined) {
                    toast.error("Network Error.");
                    return;
                }
                switch (error.response.status) {
                    case 400:
                        toast.error("Bad Request.");
                        break;
                    case 404:
                        break;
                    default:
                        unknownErrorHandling(error.response.status);
                        break;
                }
            });
    };

    return (
        <SearchDropdown
            onSelect={onSelect}
            dropdownItems={dropdownItems}
            onSearch={handleSearch}
            defaultLabel={defaultLabel}
            searchPlaceholder="Search"
            disabled={disabled}
            autoFocus={autoFocus}
        />
    );
}
