export interface IAmenitiesPower {
    isChargeable: boolean;
    type: "Plug" | "USB-Port" | "Adaptor" | "Plug or USB-Port";
}

export interface IAmenitiesSeatImage {
    title: string;
    description: string;
    href: string;
}

export interface IAmenitiesSeat {
    legSpace: string;
    tilt: "Full flat" | "Angled flat" | "Normal";
    images: IAmenitiesSeatImage[];
}

export interface IAmenitiesWifi {
    isChargeable: boolean;
    type: "Full" | "Partial";
}

export interface IAmenitiesEntertainment {
    isChargeable: boolean;
    type:
        | "Live-TV"
        | "Movies"
        | "Audio & Video on demand"
        | "TV-Shows"
        | "IP-TV";
}

export interface IAmenitiesFood {
    isChargeable: boolean;
    type: "Meal" | "Fresh meal" | "Snacks" | "Fresh snacks";
}

export interface IAmenitiesBeverage {
    isChargeable: boolean;
    type: "Alcoholic" | "Non-Alcoholic" | "With and without alcohol";
}

export interface IAmenities {
    power: IAmenitiesPower;
    seat: IAmenitiesSeat;
    wifi: IAmenitiesWifi;
    entertainment: IAmenitiesEntertainment[];
    food: IAmenitiesFood;
    beverage: IAmenitiesBeverage;
}

export interface IDeckWings {
    startX: number;
    endX: number;
}

export interface IDeckSeatRows {
    start: number;
    end: number;
}

export interface IGridSeat {
    type: "seat";
    number: string;
    available: boolean;
    characteristics: string[];
}

export interface IGridFacility {
    type: "facility";
    name: string;
}

export interface IDeck {
    wings?: IDeckWings;
    seatRows?: IDeckSeatRows;
    grid: (IGridSeat | IGridFacility | null)[][];
}

export default interface ISeatmap {
    amenities: IAmenities;
    decks: IDeck[];
}
