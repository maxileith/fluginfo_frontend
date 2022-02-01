import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Columns, Heading, Message, Pagination } from "react-bulma-components";
import IApiOfferSearch from "../../api/interfaces/IApiOfferSearch";
import TApiTravelClass from "../../api/types/TApiTravelClass";
import API from "../../Api";
import IApiOffer, { IApiCarrier } from "../../api/interfaces/IApiOffer";
import OfferSearchElement from "../organisms/OfferSearch/OfferSearchElement/OfferSearchElement";
import { toast } from "react-toastify";
import unknownErrorHandling from "../../utils/unknownErrorHandling";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import OfferFilterForm, {
    TOfferOrderBy,
} from "../organisms/OfferSearch/OfferFilterForm/OfferFilterForm";
import useIsMounted from "../../hooks/useIsMounted";
import useEffectNotOnMount from "../../hooks/useEffectNotOnMount";
import { NavigateFunction } from "react-router";
import TUseSearchParams from "../../api/types/TUseSearchParams";
import useSearchParamsMock from "../../mocks/useSearchParamsMock";
import useQueryState from "../../hooks/useQueryState";
import OfferSearchForm, {
    TListType,
} from "../organisms/OfferSearch/OfferSearchForm/OfferSearchForm";

export interface IOfferSearch {
    addToOfferSearchCache: (key: string, offers: IApiOffer[]) => void;
    getFromOfferSearchCache: (key: string) => IApiOffer[] | undefined;
    navigate: NavigateFunction;
    useSearchParams: TUseSearchParams;
}

export default function OfferSearch({
    addToOfferSearchCache,
    getFromOfferSearchCache,
    navigate = () => {},
    useSearchParams = useSearchParamsMock,
}: IOfferSearch): JSX.Element {
    const isMounted = useIsMounted();

    // state for the offer search form
    const [departureDate, setDepartureDate] = useQueryState<string>(
        moment().format("YYYY-MM-DD"),
        "departureDate",
        navigate,
        useSearchParams,
        { alwaysInUrl: true }
    );
    const [returnDate, setReturnDate] = useQueryState<string>(
        "",
        "returnDate",
        navigate,
        useSearchParams
    );
    const [originAirport, setOriginAirport] = useQueryState<string>(
        "",
        "originAirport",
        navigate,
        useSearchParams
    );
    const [destinationAirport, setDestinationAirport] = useQueryState<string>(
        "",
        "destinationAirport",
        navigate,
        useSearchParams
    );
    const [nonStop, setNonStop] = useQueryState<boolean>(
        false,
        "nonStop",
        navigate,
        useSearchParams
    );
    const [adults, setAdults] = useQueryState<number>(
        1,
        "adults",
        navigate,
        useSearchParams
    );
    const [children, setChildren] = useQueryState<number>(
        0,
        "children",
        navigate,
        useSearchParams
    );
    const [infants, setInfants] = useQueryState<number>(
        0,
        "infants",
        navigate,
        useSearchParams
    );
    const [travelClass, setTravelClass] = useQueryState<TApiTravelClass>(
        "ALL",
        "travelClass",
        navigate,
        useSearchParams
    );
    const [airlineWhitelist, setAirlineWhitelist] = useQueryState<string>(
        "",
        "airlineWhitelist",
        navigate,
        useSearchParams
    );
    const [airlineBlacklist, setAirlineBlacklist] = useQueryState<string>(
        "",
        "airlineBlacklist",
        navigate,
        useSearchParams
    );
    const [airlineListType, setAirlineListType] = useQueryState<TListType>(
        "whitelist",
        "airlineListType",
        navigate,
        useSearchParams
    );

    const getSearchParams = (): IApiOfferSearch => {
        return {
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
    };

    // states for offers, etc.
    const [offers, setOffers] = useState<IApiOffer[]>([]);
    const [searchParamsOfCurrentOffers, setSearchParamsOfCurrentOffers] =
        useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [fresh, setFresh] = useState<boolean>(true);

    // states for page settings
    const [page, setPage] = useQueryState<number>(
        1,
        "page",
        navigate,
        useSearchParams
    );
    const [offersPerPage, setOffersPerPage] = useQueryState<number>(
        10,
        "offersPerPage",
        navigate,
        useSearchParams
    );

    const { setDocumentTitle } = useDocumentTitle();
    useEffect(() => {
        setDocumentTitle(
            originAirport !== "" && destinationAirport !== ""
                ? `Offer Search - ${originAirport} -> ${destinationAirport}`
                : "Offer Search"
        );
    }, [setDocumentTitle, originAirport, destinationAirport]);

    // everything that is needed for filtering the offers
    const [filteredOffers, setFilteredOffers] = useState<IApiOffer[]>([]);
    const [filterPossibleAirlines, setFilterPossibleAirlines] = useState<
        IApiCarrier[]
    >([]);
    const [
        filterIncludedAirlineCarrierCodes,
        setFilterIncludedAirlineCarrierCodes,
    ] = useQueryState<string[]>(
        [],
        "includedAirlines",
        navigate,
        useSearchParams
    );
    const [filterPossibleNumberOfStops, setFilterPossibleNumberOfStops] =
        useState<number[]>([]);
    const [filterIncludedNumberOfStops, setFilterIncludedNumberOfStops] =
        useQueryState<number[]>(
            [],
            "includedNumberOfStops",
            navigate,
            useSearchParams
        );
    const [filterPriceMin, setFilterPriceMin] = useState<number>(0);
    const [filterPriceMax, setFilterPriceMax] = useState<number>(0);
    const [filterPriceLimit, setFilterPriceLimit] = useQueryState<number>(
        0,
        "priceLimit",
        navigate,
        useSearchParams
    );
    const [filterDurationMin, setFilterDurationMin] = useState<number>(0);
    const [filterDurationMax, setFilterDurationMax] = useState<number>(0);
    const [filterDurationLimit, setFilterDurationLimit] = useQueryState<number>(
        0,
        "durationLimit",
        navigate,
        useSearchParams
    );

    const [sortedOffers, setSortedOffers] = useState<IApiOffer[]>([]);
    const [orderBy, setOrderBy] = useQueryState<TOfferOrderBy>(
        "price",
        "orderBy",
        navigate,
        useSearchParams
    );

    const handleSearch = (): void => {
        setPage(1);
        setLoading(true);
        setOffers([] as IApiOffer[]);
        var searchParams: IApiOfferSearch = getSearchParams();
        var stringSearchParams: string = JSON.stringify(searchParams);
        setSearchParamsOfCurrentOffers(stringSearchParams);

        var cacheResponse = getFromOfferSearchCache(stringSearchParams);
        if (cacheResponse !== undefined) {
            setOffers(cacheResponse);
            isMounted.current && setLoading(false);
        } else {
            API.get("/offers/search/", { params: searchParams })
                .then((response) => {
                    if (isMounted.current) {
                        setOffers(response.data.data as IApiOffer[]);
                        addToOfferSearchCache(
                            stringSearchParams,
                            response.data.data as IApiOffer[]
                        );
                    }
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
                            addToOfferSearchCache(stringSearchParams, []);
                            break;
                        default:
                            unknownErrorHandling(error.response.status);
                            break;
                    }
                })
                .finally(() => {
                    isMounted.current && setLoading(false);
                });
        }
    };

    // prepare the filter for new search results each time there
    // are new offers
    useEffectNotOnMount(() => {
        setFilteredOffers(offers);

        // variables to
        const possibleAirlines: IApiCarrier[] = [];
        const possibleNumberOfStops = new Set<number>();
        var priceMin: number = 999999999;
        var priceMax: number = 0;
        var durationMin: number = 999999999;
        var durationMax: number = 0;

        // iterate through all offers to get min / max
        // price, duration, possible airlines and number of stops
        offers.forEach((o) => {
            if (o.price.value > priceMax) {
                priceMax = o.price.value;
            }
            if (o.price.value < priceMin) {
                priceMin = o.price.value;
            }
            o.itineraries.forEach((i) => {
                if (i.duration > durationMax) {
                    durationMax = i.duration;
                }
                if (i.duration < durationMin) {
                    durationMin = i.duration;
                }
                possibleNumberOfStops.add(i.stops);
                i.carriers.forEach((c) => {
                    if (
                        possibleAirlines.find(
                            (p) => p.carrierCode === c.carrierCode
                        ) === undefined
                    ) {
                        possibleAirlines.push(c);
                    }
                });
            });
        });

        // set the state for the filter form
        setFilterPossibleAirlines(Array.from(possibleAirlines));
        !fresh &&
            setFilterIncludedAirlineCarrierCodes(
                Array.from(possibleAirlines).map((a) => a.carrierCode)
            );
        setFilterPossibleNumberOfStops(
            Array.from(possibleNumberOfStops).sort()
        );
        !fresh &&
            setFilterIncludedNumberOfStops(Array.from(possibleNumberOfStops));
        setFilterPriceMin(Math.ceil(priceMin));
        setFilterPriceMax(Math.ceil(priceMax));
        !fresh && setFilterPriceLimit(Math.ceil(priceMax));
        setFilterDurationMin(Math.ceil(durationMin));
        setFilterDurationMax(Math.ceil(durationMax));
        !fresh && setFilterDurationLimit(Math.ceil(durationMax));
        setFresh(false);
    }, [offers]);

    // update filtered offers to the current filter
    // settings
    useEffect(() => {
        var newFilteredOffers: IApiOffer[] = [];

        offers.forEach((o) => {
            if (o.price.value > filterPriceLimit) {
                return;
            }

            for (let a: number = 0; a < o.itineraries.length; a++) {
                var i = o.itineraries[a];
                if (i.duration > filterDurationLimit) {
                    return;
                }
                if (!filterIncludedNumberOfStops.includes(i.stops)) {
                    return;
                }

                for (let b: number = 0; b < i.carriers.length; b++) {
                    var c = i.carriers[b];
                    if (
                        !filterIncludedAirlineCarrierCodes.includes(
                            c.carrierCode
                        )
                    ) {
                        return;
                    }
                }
            }

            newFilteredOffers.push(o);
        });

        setFilteredOffers(newFilteredOffers);
    }, [
        offers,
        filterDurationLimit,
        filterIncludedAirlineCarrierCodes,
        filterIncludedNumberOfStops,
        filterPriceLimit,
    ]);

    // sort the filtered offers
    useEffect(() => {
        var newSortedOffers: IApiOffer[] = [...filteredOffers];
        switch (orderBy) {
            case "price":
                // this is already the default
                // order by the backend
                break;
            case "duration":
                newSortedOffers = newSortedOffers.sort((a, b) => {
                    var aDuration: number = 0;
                    a.itineraries.forEach((x) => (aDuration += x.duration));
                    var bDuration: number = 0;
                    b.itineraries.forEach((x) => (bDuration += x.duration));
                    return aDuration - bDuration;
                });
                break;
        }
        setSortedOffers(newSortedOffers);
    }, [filteredOffers, orderBy]);

    const handleFilterChangeAirline = (
        carrierCode: string,
        include: boolean
    ) => {
        if (include) {
            setFilterIncludedAirlineCarrierCodes([
                ...filterIncludedAirlineCarrierCodes,
                carrierCode,
            ]);
        } else {
            setFilterIncludedAirlineCarrierCodes(
                filterIncludedAirlineCarrierCodes.filter(
                    (x) => x !== carrierCode
                )
            );
        }
    };

    const handleFilterChangeNumberOfStops = (
        numberOfStops: number,
        include: boolean
    ) => {
        if (include) {
            setFilterIncludedNumberOfStops([
                ...filterIncludedNumberOfStops,
                numberOfStops,
            ]);
        } else {
            setFilterIncludedNumberOfStops(
                filterIncludedNumberOfStops.filter((x) => x !== numberOfStops)
            );
        }
    };

    // set page to the last one if the current page does not
    // exit. (Switching e.g. from 25 to 50 offers per page)
    useEffectNotOnMount(() => {
        var lastPage: number =
            Math.ceil(filteredOffers.length / offersPerPage) || 1;
        if (lastPage < page) {
            setPage(lastPage);
        }
    }, [offersPerPage, page, filteredOffers.length]);

    const offerDOM = useMemo(
        () =>
            sortedOffers
                .slice(offersPerPage * (page - 1), offersPerPage * page)
                .map((offer) => (
                    <OfferSearchElement
                        key={offer.hash}
                        offer={offer}
                        showDetails={() =>
                            navigate(`/offer/details/${offer.hash}/`)
                        }
                    />
                )),
        [sortedOffers, offersPerPage, page, navigate]
    );

    useEffect(() => {
        const searchParamString = JSON.stringify(getSearchParams());
        const offersFromCache = getFromOfferSearchCache(searchParamString);
        if (offersFromCache !== undefined) {
            setSearchParamsOfCurrentOffers(searchParamString);
            setOffers(offersFromCache);
        }
    }, []);

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
                navigate={navigate}
            />
            {!fresh && !loading && (
                <>
                    <Columns breakpoint="desktop">
                        {offers.length !== 0 && (
                            <Columns.Column size={"3-desktop" as "one-quarter"}>
                                <OfferFilterForm
                                    possibleAirlines={filterPossibleAirlines}
                                    includedAirlineCarrierCode={
                                        filterIncludedAirlineCarrierCodes
                                    }
                                    onChangeAirline={handleFilterChangeAirline}
                                    possibleNumberOfStops={
                                        filterPossibleNumberOfStops
                                    }
                                    includedNumberOfStops={
                                        filterIncludedNumberOfStops
                                    }
                                    onChangeNumberOfStops={
                                        handleFilterChangeNumberOfStops
                                    }
                                    priceMin={filterPriceMin}
                                    priceMax={filterPriceMax}
                                    priceLimit={filterPriceLimit}
                                    onChangePriceLimit={setFilterPriceLimit}
                                    durationMin={filterDurationMin}
                                    durationMax={filterDurationMax}
                                    durationLimit={filterDurationLimit}
                                    onChangeDurationLimit={
                                        setFilterDurationLimit
                                    }
                                    numberOfFilteredOffers={
                                        filteredOffers.length
                                    }
                                    numberOfTotalOffers={offers.length}
                                    offersPerPage={offersPerPage}
                                    setOffersPerPage={setOffersPerPage}
                                    orderBy={orderBy}
                                    setOrderBy={setOrderBy}
                                />
                            </Columns.Column>
                        )}
                        <Columns.Column>
                            {filteredOffers.length === 0 && (
                                <Message color="danger">
                                    <Message.Body>
                                        We have found{" "}
                                        <strong>no flights</strong> matching
                                        your search criteria.
                                    </Message.Body>
                                </Message>
                            )}
                            {JSON.stringify(getSearchParams()) !==
                                searchParamsOfCurrentOffers && (
                                <Message color="warning">
                                    <Message.Body>
                                        The current results{" "}
                                        <strong>do not apply</strong> to the
                                        above search.
                                    </Message.Body>
                                </Message>
                            )}
                            {offerDOM}
                            <Pagination
                                total={
                                    Math.ceil(
                                        filteredOffers.length / offersPerPage
                                    ) || 1
                                }
                                current={page}
                                delta={2}
                                showPrevNext={false}
                                autoHide
                                onChange={setPage}
                                disabled={loading}
                                showFirstLast={false}
                                align="center"
                            />
                        </Columns.Column>
                    </Columns>
                </>
            )}
        </>
    );
}
