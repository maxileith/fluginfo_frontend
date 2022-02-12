import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from "react-router-dom";
import OfferDetails from "./components/pages/OfferDetails";
import OfferSearch from "./components/pages/OfferSearch";
import Status from "./components/pages/Status";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastify.scss";
import { useEffect, useState } from "react";
import CenteredLoader from "./components/molecules/CenteredLoader/CenteredLoader";
import API from "./Api";
import axios from "axios";
import Seatmap from "./components/pages/Seatmap";
import IApiOffer from "./api/interfaces/IApiOffer";
import { Map } from "immutable";
import Layout from "./components/templates/Layout";
import IFrameWrapper from "./components/pages/IFrameWrapper";

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
        <Layout navigate={useNavigate()} currentPath={useLocation().pathname}>
            <Routes>
                <Route
                    path="/offer/search"
                    element={
                        <OfferSearch
                            addToOfferSearchCache={addToOfferSearchCache}
                            getFromOfferSearchCache={getFromOfferSearchCache}
                            navigate={useNavigate()}
                            useSearchParams={useSearchParams}
                        />
                    }
                />
                <Route
                    path="/offer/details/:hash"
                    element={
                        <OfferDetails
                            navigate={useNavigate()}
                            useParams={useParams}
                        />
                    }
                />
                <Route
                    path="/offer/seatmap/:hash/:segmentId"
                    element={
                        <Seatmap
                            from="offerDetails"
                            navigate={useNavigate()}
                            useParams={useParams}
                        />
                    }
                />
                <Route
                    path="/status"
                    element={
                        <Status
                            navigate={useNavigate()}
                            useSearchParams={useSearchParams}
                        />
                    }
                />
                <Route
                    path="/status/seatmap/:flightNumber/:date/:classId"
                    element={
                        <Seatmap
                            from="status"
                            navigate={useNavigate()}
                            useParams={useParams}
                        />
                    }
                />
                <Route
                    path="/storybook"
                    element={<IFrameWrapper src="/sb/" />}
                />
                <Route
                    path="/swagger"
                    element={
                        <IFrameWrapper
                            src={`${API.defaults.baseURL}/swagger/`}
                        />
                    }
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
