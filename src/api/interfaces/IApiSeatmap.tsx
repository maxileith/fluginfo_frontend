import TApiSeatmapGridItem from "../types/TApiSeatmapGridItem";

export interface IApiAmenitiesPower {
    isChargeable: boolean;
    type: "Plug" | "USB-Port" | "Adaptor" | "Plug or USB-Port";
}

export interface IApiAmenitiesSeatImage {
    title: string;
    description: string;
    href: string;
}

export interface IApiAmenitiesSeat {
    legSpace: string;
    tilt: "Full flat" | "Angled flat" | "Normal";
    images: IApiAmenitiesSeatImage[];
}

export interface IApiAmenitiesWifi {
    isChargeable: boolean;
    type: "Full" | "Partial";
}

export interface IApiAmenitiesEntertainment {
    isChargeable: boolean;
    type:
        | "Live-TV"
        | "Movies"
        | "Audio & Video on demand"
        | "TV-Shows"
        | "IP-TV";
}

export interface IApiAmenitiesFood {
    isChargeable: boolean;
    type: "Meal" | "Fresh meal" | "Snacks" | "Fresh snacks";
}

export interface IApiAmenitiesBeverage {
    isChargeable: boolean;
    type: "Alcoholic" | "Non-Alcoholic" | "With and without alcohol";
}

export interface IApiAmenities {
    power: IApiAmenitiesPower;
    seat: IApiAmenitiesSeat;
    wifi: IApiAmenitiesWifi;
    entertainment: IApiAmenitiesEntertainment[];
    food: IApiAmenitiesFood;
    beverage: IApiAmenitiesBeverage;
}

export interface IApiDeckWingsX {
    start: number;
    end: number;
}

export interface IApiGridSeat {
    type: "seat";
    number: string;
    available: "AVAILABLE" | "BLOCKED" | "OCCUPIED";
    characteristics?: string[];
}

export interface IApiGridFacility {
    type: "facility";
    name: string;
}

export interface IApiDeck {
    wingsX?: IApiDeckWingsX;
    exitRowsX?: number[];
    grid: TApiSeatmapGridItem[][];
}

export default interface IApiSeatmap {
    flightNumber: string;
    classId: string;
    departureIata: string;
    arrivalIata: string;
    date: string;
    amenities: IApiAmenities;
    decks: IApiDeck[];
}
