import moment from "moment";
import { useState } from "react";
import { Box, Heading, Pagination } from "react-bulma-components";
import IApiOfferSearch from "../api/interfaces/IApiOfferSearch";
import TApiTravelClass from "../api/types/TApiTravelClass";
import OfferSearchForm, {
    TListType,
} from "../components/OfferSearchForm/OfferSearchForm";
import API from "../Api";
import IApiOffer from "../api/interfaces/IApiOffer";
import OfferElement from "../components/OfferElement/OfferElement";
import useQueryState from "../utils/useQueryState";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import unknownErrorHandling from "../utils/unknownErrorHandling";

export default function OfferSearch(): JSX.Element {
    const [departureDate, setDepartureDate] = useQueryState<string>(
        moment().format("YYYY-MM-DD"),
        "departureDate",
        { alwaysInUrl: true }
    );
    const [returnDate, setReturnDate] = useQueryState<string>("", "returnDate");
    const [originAirport, setOriginAirport] = useQueryState<string>(
        "",
        "originAirport"
    );
    const [destinationAirport, setDestinationAirport] = useQueryState<string>(
        "",
        "destinationAirport"
    );
    const [nonStop, setNonStop] = useQueryState<boolean>(false, "nonStop", {
        serialize: (value: boolean) => (value ? "true" : "false"),
        deserialize: (value: string | null) => value === "true",
    });
    const [adults, setAdults] = useQueryState<number>(1, "adults");
    const [children, setChildren] = useQueryState<number>(0, "children");
    const [infants, setInfants] = useQueryState<number>(0, "infants");
    const [travelClass, setTravelClass] = useQueryState<TApiTravelClass>(
        "ALL",
        "travelClass"
    );
    const [airlineWhitelist, setAirlineWhitelist] = useQueryState<string>(
        "",
        "airlineWhitelist"
    );
    const [airlineBlacklist, setAirlineBlacklist] = useQueryState<string>(
        "",
        "airlineBlacklist"
    );
    const [airlineListType, setAirlineListType] = useQueryState<TListType>(
        "whitelist",
        "airlineListType"
    );

    const [offers, setOffers] = useState<IApiOffer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [fresh, setFresh] = useState<boolean>(true);

    const [page, setPage] = useQueryState<number>(1, "page");
    const itemsPerPage: number = 20;

    const navigate = useNavigate();

    const handleSearch = (): void => {
        setPage(1);
        setLoading(true);
        var searchProps: IApiOfferSearch = {
            adults: adults,
            children: children,
            infants: infants,
            nonStop: nonStop,
            departureDate: departureDate,
            destinationLocationCode: destinationAirport,
            originLocationCode: originAirport,
            travelClass: travelClass !== "ALL" ? travelClass : undefined,
            excludedAirlineCodes:
                airlineListType === "blacklist" && airlineBlacklist !== ""
                    ? airlineBlacklist
                    : undefined,
            includedAirlineCodes:
                airlineListType === "whitelist" && airlineWhitelist !== ""
                    ? airlineWhitelist
                    : undefined,
            returnDate: returnDate !== "" ? returnDate : undefined,
        };
        API.get("/offers/search/", { params: searchProps })
            .then((response) => {
                setOffers(response.data.data as IApiOffer[]);
            })
            .catch((error) => {
                setOffers([] as IApiOffer[]);
                switch (error.response.status) {
                    case 400:
                        toast.error("Bad Request.");
                        break;
                    case 404:
                        break;
                    default:
                        unknownErrorHandling(error.response.status);
                        break;
                }
            })
            .finally(() => {
                setLoading(false);
                setFresh(false);
            });
    };

    const handleDetails = (hash: string): void => {
        navigate(`/offer/details/${hash}/`);
    };

    return (
        <>
            <Heading>Offer Search</Heading>
            <Heading subtitle>Find your desired flight.</Heading>

            <OfferSearchForm
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                originAirport={originAirport}
                setOriginAirport={setOriginAirport}
                destinationAirport={destinationAirport}
                setDestinationAirport={setDestinationAirport}
                nonStop={nonStop}
                setNonStop={setNonStop}
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                infants={infants}
                setInfants={setInfants}
                travelClass={travelClass}
                setTravelClass={setTravelClass}
                airlineWhitelist={airlineWhitelist}
                setAirlineWhitelist={setAirlineWhitelist}
                airlineBlacklist={airlineBlacklist}
                setAirlineBlacklist={setAirlineBlacklist}
                airlineListType={airlineListType}
                setAirlineListType={setAirlineListType}
                onSearch={handleSearch}
                loading={loading}
            />
            <Box invisible={fresh}>
                <p>
                    {offers.length ? (
                        <>
                            We have found{" "}
                            <strong>{offers.length} flights</strong> matching
                            your search criteria.
                        </>
                    ) : (
                        <>
                            We have found <strong>no flights</strong> matching
                            your search criteria.
                        </>
                    )}
                </p>
            </Box>
            {offers
                .slice(itemsPerPage * (page - 1), itemsPerPage * page)
                .map((offer) => (
                    <OfferElement
                        key={offer.hash}
                        offer={offer}
                        showDetails={handleDetails}
                    />
                ))}
            <Pagination
                total={Math.ceil(offers.length / itemsPerPage) || 1}
                current={page}
                delta={2}
                showPrevNext={false}
                autoHide
                onChange={setPage}
                disabled={loading}
                showFirstLast={false}
                align="center"
            />
        </>
    );
}
