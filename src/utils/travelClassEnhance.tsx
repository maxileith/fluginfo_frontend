import TApiTravelClass from "../api/types/TApiTravelClass";

export default function travelClassEnhance(
    travelClass: TApiTravelClass
): "No Preference" | "Business" | "Economy" | "First" | "Premium Economy" {
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
    }
}
