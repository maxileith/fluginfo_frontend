import TTravelClass from "../api/types/TTravelClass";

export default function travelClassEnhance(travelClass: TTravelClass): string {
    switch (travelClass) {
        case "ALL":
            return "No Preference";
        case "BUSINESS":
            return "Business";
        case "ECONOMY":
            return "Economy";
        case "FIRST":
            return "First";
        case "PREMIUM_ECONOMY":
            return "Premium Economy";
        default:
            return travelClass;
    }
}
