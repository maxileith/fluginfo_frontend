import moment from "moment";
import { useState } from "react";
import { Container } from "react-bulma-components";
import IOfferSearch from "../api/interfaces/IOfferSearch";
import TTravelClass from "../api/types/TTravelClass";
import FlightOfferForm from "../components/FlightOfferForm/FlightOfferForm";
import API from "../Api";
import IOffer from "../api/interfaces/IOffer";

export default function OfferSearch(): JSX.Element {
    const [departureDate, setDepartureDate] = useState<string>(
        moment().format("YYYY-MM-DD")
    );
    const [returnDate, setReturnDate] = useState<string>("");
    const [originAirport, setOriginAirport] = useState<string>("");
    const [destinationAirport, setDestinationAirport] = useState<string>("");
    const [nonStop, setNonStop] = useState<boolean>(false);
    const [adults, setAdults] = useState<number>(1);
    const [children, setChildren] = useState<number>(0);
    const [infants, setInfants] = useState<number>(0);
    const [travelClass, setTravelClass] = useState<TTravelClass>("ALL");
    const [airlineWhitelist, setAirlineWhitelist] = useState<string>("");
    const [airlineBlacklist, setAirlineBlacklist] = useState<string>("");

    const [offers, setOffers] = useState<IOffer[]>([]);

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
        var searchProps: IOfferSearch = prepareSearchProps();
        API.get("offers/search/", { params: searchProps }).then((response) => {
            setOffers(response.data.data as IOffer[]);
            console.log(response.data.data);
        });
        // TODO: Error handling
    };

    return (
        <Container breakpoint="desktop" max mt={4}>
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
                setAirlineWhitelist={setAirlineWhitelist}
                setAirlineBlacklist={setAirlineBlacklist}
                onSearch={handleSearch}
            />
            {offers.map((offer) => (
                <p key={offer.hash}>{offer.hash}</p>
            ))}
        </Container>
    );
}
