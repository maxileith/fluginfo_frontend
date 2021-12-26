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
import OfferSearch from "./pages/OfferSearch";
import Status from "./pages/Status";

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
                <Route path="/status" element={<Status />} />
                <Route path="*" element={<Navigate to="/offer/search" />} />
            </Routes>
        </Layout>
    );
}
