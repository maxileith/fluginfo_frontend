import moment from "moment";
import { useState } from "react";
import { Box, Container, Heading, Pagination } from "react-bulma-components";
import IOfferSearch from "../api/interfaces/IOfferSearch";
import TTravelClass from "../api/types/TTravelClass";
import FlightOfferForm, {
    TListType,
} from "../components/FlightOfferForm/FlightOfferForm";
import API from "../Api";
import IOffer from "../api/interfaces/IOffer";
import OfferElement from "../components/OfferElement/OfferElement";

export default function OfferSearch(): JSX.Element {
    const queryString: string = window.location.search;
    const urlParams: URLSearchParams = new URLSearchParams(queryString);

    const [departureDate, setDepartureDate] = useState<string>(
        urlParams.get("departureDate") || moment().format("YYYY-MM-DD")
    );
    const [returnDate, setReturnDate] = useState<string>(
        urlParams.get("returnDate") || ""
    );
    const [originAirport, setOriginAirport] = useState<string>(
        urlParams.get("originAirport") || ""
    );
    const [destinationAirport, setDestinationAirport] = useState<string>(
        urlParams.get("destinationAirport") || ""
    );
    const [nonStop, setNonStop] = useState<boolean>(
        urlParams.get("nonStop") ? urlParams.get("nonStop") === "true" : false
    );
    const [adults, setAdults] = useState<number>(
        Number(urlParams.get("adults")) || 1
    );
    const [children, setChildren] = useState<number>(
        Number(urlParams.get("children")) || 0
    );
    const [infants, setInfants] = useState<number>(
        Number(urlParams.get("infants")) || 0
    );
    const [travelClass, setTravelClass] = useState<TTravelClass>(
        (urlParams.get("travelClass") as TTravelClass) || "ALL"
    );
    const [airlineWhitelist, setAirlineWhitelist] = useState<string>(
        urlParams.get("airlineWhitelist") || ""
    );
    const [airlineBlacklist, setAirlineBlacklist] = useState<string>(
        urlParams.get("airlineBlacklist") || ""
    );
    const [airlineListType, setAirlineListType] = useState<TListType>(
        airlineBlacklist === "" ? "whitelist" : "blacklist"
    );

    const [offers, setOffers] = useState<IOffer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [fresh, setFresh] = useState<boolean>(true);

    const [page, setPage] = useState<number>(1);
    const itemsPerPage: number = 20;

    const prepareSearchProps = (): IOfferSearch => {
        var props: IOfferSearch = {
            adults: adults,
            children: children,
            infants: infants,
            nonStop: nonStop,
            departureDate: departureDate,
            destinationLocationCode: destinationAirport,
            originLocationCode: originAirport,
        };
        // now add optional parameters if provided
        if (travelClass !== "ALL") props.travelClass = travelClass;
        if (airlineBlacklist !== "")
            props.excludedAirlineCodes = airlineBlacklist;
        if (airlineWhitelist !== "")
            props.includedAirlineCodes = airlineWhitelist;
        if (returnDate !== "") props.returnDate = returnDate;
        return props;
    };

    const handleSearch = (): void => {
        setPage(1);
        setLoading(true);
        var searchProps: IOfferSearch = prepareSearchProps();
        API.get("offers/search/", { params: searchProps })
            .then((response) => {
                setOffers(response.data.data as IOffer[]);
            })
            .catch((error) => {
                switch (error.response.status) {
                    case 404:
                        setOffers([] as IOffer[]);
                        break;
                    case 400:
                        setOffers([] as IOffer[]);
                        break;
                    default:
                        // TODO: handle error
                        break;
                }
            })
            .finally(() => {
                setLoading(false);
                setFresh(false);
            });
        // TODO: Error handling
    };

    const handleDetails = (hash: string): void => {
        console.log(hash);
    };

    return (
        <Container breakpoint="desktop" max mt={4} my={4}>
            <Heading>Offer Search</Heading>
            <Heading subtitle>Find your desired flight.</Heading>

            <FlightOfferForm
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
        </Container>
    );
}
