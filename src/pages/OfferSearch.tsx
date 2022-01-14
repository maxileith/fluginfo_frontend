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
import OfferFilterForm from "../components/OfferFilterForm/OfferFilterForm";

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
    const [itemsPerPage, setItemsPerPage] = useQueryState<number>(
        25,
        "itemsPerPage"
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
    ] = useState<string[]>([]);
    const [filterPossibleNumberOfStops, setFilterPossibleNumberOfStops] =
        useState<number[]>([]);
    const [filterIncludedNumberOfStops, setFilterIncludedNumberOfStops] =
        useState<number[]>([]);
    const [filterPriceMin, setFilterPriceMin] = useState<number>(0);
    const [filterPriceMax, setFilterPriceMax] = useState<number>(0);
    const [filterPriceLimit, setFilterPriceLimit] = useState<number>(0);
    const [filterDurationMin, setFilterDurationMin] = useState<number>(0);
    const [filterDurationMax, setFilterDurationMax] = useState<number>(0);
    const [filterDurationLimit, setFilterDurationLimit] = useState<number>(0);

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

    // prepare the filter for new search results each time there
    // are new offers
    useEffect(() => {
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
            var durationSum: number = 0;
            o.itineraries.forEach((i) => {
                durationSum += i.duration;
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
            var durationAverage = durationSum / o.itineraries.length;
            if (durationAverage > durationMax) {
                durationMax = durationAverage;
            }
            if (durationAverage < durationMin) {
                durationMin = durationAverage;
            }
        });

        // set the state for the filter form
        setFilterPossibleAirlines(Array.from(possibleAirlines));
        setFilterIncludedAirlineCarrierCodes(
            Array.from(possibleAirlines).map((a) => a.carrierCode)
        );
        setFilterPossibleNumberOfStops(Array.from(possibleNumberOfStops));
        setFilterIncludedNumberOfStops(Array.from(possibleNumberOfStops));
        setFilterPriceMin(Math.ceil(priceMin));
        setFilterPriceMax(Math.ceil(priceMax));
        setFilterPriceLimit(Math.ceil(priceMax));
        setFilterDurationMin(Math.ceil(durationMin));
        setFilterDurationMax(Math.ceil(durationMax));
        setFilterDurationLimit(Math.ceil(durationMax));
    }, [offers]);

    // update visible Offers to the current filter
    // settings
    useEffect(() => {
        var newFilteredOffers: IApiOffer[] = [];

        offers.forEach((o) => {
            if (o.price.value > filterPriceLimit) {
                return;
            }

            var durationSum: number = 0;

            for (let a: number = 0; a < o.itineraries.length; a++) {
                var i = o.itineraries[a];
                durationSum += i.duration;
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

            var durationAverage = durationSum / o.itineraries.length;
            if (durationAverage > filterDurationLimit) {
                return;
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
                    {filteredOffers.length === 0 && (
                        <Message color="danger">
                            <Message.Body>
                                We have found <strong>no flights</strong>{" "}
                                matching your search criteria.
                            </Message.Body>
                        </Message>
                    )}
                    <Columns>
                        <Columns.Column narrow>
                            {offers.length !== 0 && (
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
                                />
                            )}
                        </Columns.Column>
                        <Columns.Column>
                            {filteredOffers
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
                    </Columns>
                </>
            )}
            <Pagination
                total={Math.ceil(filteredOffers.length / itemsPerPage) || 1}
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
