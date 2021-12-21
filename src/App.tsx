import "bulma/css/bulma.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Availability from "./pages/Availability";
import OfferSearch from "./pages/OfferSearch";

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/offer-search" element={<OfferSearch />} />
                    <Route path="/availability" element={<Availability />} />
                    <Route path="*" element={<Navigate to="/offer-search" />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
