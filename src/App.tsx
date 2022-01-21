import "bulma/css/bulma.css";
import {
    BrowserRouter,
    Navigate,
    NavigateFunction,
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import Layout from "./pages/Layout";
import OfferDetails from "./pages/OfferDetails";
import OfferSearch from "./pages/OfferSearch";
import Status from "./pages/Status";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastify.scss";
import { useEffect, useState } from "react";
import CenteredLoader from "./components/CenteredLoader/CenteredLoader";
import API from "./Api";
import axios from "axios";
import Seatmap from "./pages/Seatmap";
import IApiOffer from "./api/interfaces/IApiOffer";
import { Map } from "immutable";

export default function App() {
    const [baseURL, setBaseURL] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get("/backendBaseUrl.txt")
            .then((response) => {
                setBaseURL(response.data);
            })
            .catch(() => {
                toast.error(
                    "Failed to determine backend base URL. Fallback to default."
                );
                setBaseURL("http://localhost:8000");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        API.defaults.baseURL = baseURL;
    }, [baseURL]);

    return (
        <>
            {loading ? (
                <CenteredLoader />
            ) : (
                <BrowserRouter>
                    <NavigateWrapper />
                </BrowserRouter>
            )}
        </>
    );
}

function NavigateWrapper(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();

    const [offerSearchCache, setOfferSearchCache] = useState<
        Map<string, IApiOffer[]>
    >(Map());

    const addToOfferSearchCache = (key: string, offers: IApiOffer[]): void => {
        const newMap = offerSearchCache.set(key, offers);
        setOfferSearchCache(newMap);
    };

    const getFromOfferSearchCache = (key: string): IApiOffer[] | undefined => {
        if (offerSearchCache.has(key)) {
            return offerSearchCache.get(key) as IApiOffer[];
        }
        return undefined;
    };

    return (
        <Layout navigate={navigate}>
            <Routes>
                <Route
                    path="/offer/search"
                    element={
                        <OfferSearch
                            addToOfferSearchCache={addToOfferSearchCache}
                            getFromOfferSearchCache={getFromOfferSearchCache}
                        />
                    }
                />
                <Route path="/offer/details/:hash" element={<OfferDetails />} />
                <Route
                    path="/offer/seatmap/:hash/:segmentId"
                    element={<Seatmap from="offerDetails" />}
                />
                <Route path="/status" element={<Status />} />
                <Route
                    path="/status/seatmap/:flightNumber/:date/:classId"
                    element={<Seatmap from="status" />}
                />
                <Route
                    path="*"
                    element={<Navigate to="/offer/search" replace />}
                />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={7000}
                hideProgressBar={false}
                pauseOnHover={true}
                pauseOnFocusLoss={false}
                closeOnClick={false}
                newestOnTop={true}
                draggable={true}
                draggablePercent={60}
                draggableDirection="x"
                limit={5}
                toastStyle={{ backgroundColor: "#fafafa" }}
                style={{ marginBottom: "2.5rem" }}
            />
        </Layout>
    );
}
