import moment from "moment";
import { useEffect, useState } from "react";
import { Columns, Heading, Message, Pagination } from "react-bulma-components";
import IApiOfferSearch from "../api/interfaces/IApiOfferSearch";
import TApiTravelClass from "../api/types/TApiTravelClass";
import OfferSearchForm, {
    TListType,
} from "../components/OfferSearchForm/OfferSearchForm";
import API from "../Api";
import IApiOffer, { IApiCarrier } from "../api/interfaces/IApiOffer";
import OfferElement from "../components/OfferElement/OfferElement";
import useQueryState from "../utils/useQueryState";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import unknownErrorHandling from "../utils/unknownErrorHandling";
import useDocumentTitle from "../utils/useDocumentTitle";
import OfferFilterForm, {
    IOfferFilterForm,
    IOfferFilterFormAirlines,
    IOfferFilterFormNumberOfStops,
} from "../components/OfferFilterForm/OfferFilterForm";
import * as OfferFilterFormStories from "../components/OfferFilterForm/OfferFilterForm.stories";
import IApiDuration from "../api/interfaces/IApiDuration";

export default function OfferSearch(): JSX.Element {
    const navigate = useNavigate();

    // state for the offer search form
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

    // states for offers, etc.
    const [offers, setOffers] = useState<IApiOffer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [fresh, setFresh] = useState<boolean>(true);

    // states for page settings
    const [page, setPage] = useQueryState<number>(1, "page");
    const itemsPerPage: number = 20;

    const { setDocumentTitle } = useDocumentTitle();
    useEffect(() => {
        setDocumentTitle(
            originAirport !== "" && destinationAirport !== ""
                ? `Offer Search - ${originAirport} -> ${destinationAirport}`
                : "Offer Search"
        );
    }, [setDocumentTitle, originAirport, destinationAirport]);

    // everything that is needed for filtering the offers
    const [filterOffers, setFilterOffers] = useState<IApiOffer[]>([]);
    const [filterAirlines, setFilterAirlines] = useState<
        IOfferFilterFormAirlines[]
    >([]);
    const [filterNumberOfStops, setFilterNumberOfStops] = useState<
        IOfferFilterFormNumberOfStops[]
    >([]);
    const [filterPriceMin, setFilterPriceMin] = useState<number>(0);
    const [filterPriceMax, setFilterPriceMax] = useState<number>(0);
    const [filterPriceLimit, setFilterPriceLimit] = useState<number>(0);
    const [filterDurationMin, setDurationMin] = useState<IApiDuration>({
        hours: 0,
        minutes: 0,
    });
    const [filterDurationMax, setDurationMax] = useState<IApiDuration>({
        hours: 0,
        minutes: 0,
    });
    const [filterDurationLimit, setDurationLimit] = useState<IApiDuration>({
        hours: 0,
        minutes: 0,
    });

    // prepare the filter for new search results each time there
    // are new offers
    useEffect(() => {
        setFilterOffers(offers);
    }, [offers]);

    const handleSearch = (): void => {
        setPage(1);
        setLoading(true);
        setOffers([] as IApiOffer[]);
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
                if (error.response === undefined) {
                    toast.error("Network Error.");
                    return;
                }
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
            {!fresh && !loading && (
                <>
                    {filterOffers.length ? (
                        <Message color="success">
                            <Message.Body>
                                We have found{" "}
                                <strong>{filterOffers.length} flights</strong>{" "}
                                matching your search criteria.
                            </Message.Body>
                        </Message>
                    ) : (
                        <Message color="warning">
                            <Message.Body>
                                We have found <strong>no flights</strong>{" "}
                                matching your search criteria.
                            </Message.Body>
                        </Message>
                    )}
                    <Columns>
                        <Columns.Column>
                            {filterOffers
                                .slice(
                                    itemsPerPage * (page - 1),
                                    itemsPerPage * page
                                )
                                .map((offer) => (
                                    <OfferElement
                                        key={offer.hash}
                                        offer={offer}
                                        showDetails={handleDetails}
                                    />
                                ))}
                        </Columns.Column>
                        <Columns.Column narrow>
                            {offers.length !== 0 && (
                                <OfferFilterForm
                                    airlines={filterAirlines}
                                    onChangeAirline={(a, b) => {}}
                                    numberOfStops={filterNumberOfStops}
                                    onChangeNumberOfStops={(a, b) => {}}
                                    priceMin={filterPriceMin}
                                    priceMax={filterPriceMax}
                                    priceLimit={filterPriceLimit}
                                    onChangePriceLimit={setFilterPriceLimit}
                                    durationMin={filterDurationMin}
                                    durationMax={filterDurationMax}
                                    durationLimit={filterDurationLimit}
                                    onChangeDurationLimit={setDurationLimit}
                                    numberOfFilteredOffers={filterOffers.length}
                                    numberOfTotalOffers={offers.length}
                                />
                            )}
                        </Columns.Column>
                    </Columns>
                </>
            )}
            <Pagination
                total={Math.ceil(filterOffers.length / itemsPerPage) || 1}
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
