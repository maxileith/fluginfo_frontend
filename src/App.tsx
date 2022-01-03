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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastify.scss";

export default function App() {
    return (
        <BrowserRouter>
            <NavigateWrapper />
        </BrowserRouter>
    );
}

function NavigateWrapper(): JSX.Element {
    const navigate: NavigateFunction = useNavigate();
    return (
        <Layout navigate={navigate}>
            <Routes>
                <Route path="/offer/search" element={<OfferSearch />} />
                <Route path="/offer/details/:hash" element={<OfferDetails />} />
                <Route path="/status" element={<Status />} />
                <Route path="*" element={<Navigate to="/offer/search" />} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={7000}
                hideProgressBar={false}
                pauseOnHover={true}
                pauseOnFocusLoss={true}
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
