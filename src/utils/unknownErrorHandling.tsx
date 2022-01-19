import { toast } from "react-toastify";

export default function unknownErrorHandling(statusCode: number): void {
    if (statusCode === 503) {
        toast.error("An Amadeus server error occurred.");
    } else if (statusCode >= 500) {
        toast.error("An unknown error has occurred on the server side.");
    } else if (statusCode >= 400) {
        toast.error("An unknown error occurred on the client side.");
    } else {
        toast.error("An unknown error occurred.");
    }
}
