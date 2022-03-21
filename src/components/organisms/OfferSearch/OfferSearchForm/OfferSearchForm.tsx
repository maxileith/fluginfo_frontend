import {
    faBaby,
    faCalendar,
    faChild,
    faCog,
    faMale,
    faPlane,
    faStar,
    faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { ChangeEvent, CSSProperties, useState } from "react";
import { Box, Button, Columns, Form, Icon } from "react-bulma-components";
import { NavigateFunction } from "react-router";
import TApiTravelClass from "../../../../api/types/TApiTravelClass";
import travelClassEnhance from "../../../../utils/travelClassEnhance";
import SelectAirport from "../../../molecules/SelectAirport/SelectAirport";

export type TListType = "whitelist" | "blacklist";

const travelerStyle: CSSProperties = { flexShrink: "unset", maxWidth: 125 };

export interface IOfferSearchForm {
    departureDate: string;
    setDepartureDate: (date: string) => void;
    returnDate: string;
    setReturnDate: (date: string) => void;
    originAirport: string;
    setOriginAirport: (iata: string) => void;
    destinationAirport: string;
    setDestinationAirport: (iata: string) => void;
    nonStop: boolean;
    setNonStop: (nonStop: boolean) => void;
    adults: number;
    setAdults: (adults: number) => void;
    children: number;
    setChildren: (children: number) => void;
    infants: number;
    setInfants: (infants: number) => void;
    travelClass: TApiTravelClass;
    setTravelClass: (travelClass: TApiTravelClass) => void;
    airlineListType: TListType;
    setAirlineListType: (type: TListType) => void;
    airlineWhitelist: string;
    setAirlineWhitelist: (whitelist: string) => void;
    airlineBlacklist: string;
    setAirlineBlacklist: (blacklist: string) => void;
    onSearch: () => void;
    loading?: boolean;
    navigate: NavigateFunction;
}

export default function OfferSearchForm({
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    originAirport,
    setOriginAirport,
    destinationAirport,
    setDestinationAirport,
    nonStop,
    setNonStop,
    adults,
    setAdults,
    children,
    setChildren,
    infants,
    setInfants,
    travelClass,
    setTravelClass,
    airlineListType,
    setAirlineListType,
    airlineWhitelist,
    setAirlineWhitelist,
    airlineBlacklist,
    setAirlineBlacklist,
    onSearch,
    loading,
    navigate = () => {},
}: IOfferSearchForm): JSX.Element {
    const [showAdvanced, setShowAdvanced] = useState<boolean>(
        airlineWhitelist !== "" || airlineBlacklist !== ""
    );

    const [defaultOriginAirport] = useState<string | undefined>(
        originAirport !== "" ? originAirport : undefined
    );
    const [defaultDestinationAirport] = useState<string | undefined>(
        destinationAirport !== "" ? destinationAirport : undefined
    );

    const updateListValue = (value: string) => {
        if (airlineListType === "blacklist") {
            setAirlineBlacklist(value.toUpperCase());
        } else {
            setAirlineWhitelist(value.toUpperCase());
        }
    };

    const routeComplete: boolean =
        originAirport !== "" && destinationAirport !== "";

    const travelersMaximumNotExceeded: boolean =
        adults + children + infants <= 9;
    const travelersAtLeastOneAdult: boolean = adults >= 1;
    const travelersComplete: boolean =
        travelersMaximumNotExceeded && travelersAtLeastOneAdult;

    const departureDateNotPast: boolean =
        departureDate >= moment().format("YYYY-MM-DD");
    const returnDateAfterDeparture: boolean =
        returnDate === "" || returnDate >= departureDate;
    const datesComplete: boolean =
        departureDateNotPast && returnDateAfterDeparture;

    const readyForTakeOff: boolean =
        routeComplete && travelersComplete && datesComplete;

    const handleAdultsChange = (value: number) => {
        var leftOver = 9;
        const newAdults = Math.max(1, Math.min(value, 9));
        setAdults(newAdults);
        if (!newAdults) {
            return;
        }
        leftOver -= newAdults;
        const newChildren = Math.min(children, leftOver);
        leftOver -= newChildren;
        setChildren(newChildren);
        const newInfants = Math.min(infants, leftOver);
        setInfants(newInfants);
    };

    const handleChildrenChange = (value: number) => {
        var leftOver = 9;
        const newChildren = Math.min(value, 8);
        setChildren(newChildren);
        if (!newChildren) {
            return;
        }
        leftOver -= newChildren;
        const newAdults = Math.min(adults, leftOver);
        leftOver -= newAdults;
        setAdults(newAdults);
        const newInfants = Math.min(infants, leftOver);
        setInfants(newInfants);
    };

    const handleInfantsChange = (value: number) => {
        var leftOver = 9;
        const newInfants = Math.min(value, 8);
        setInfants(newInfants);
        if (!newInfants) {
            return;
        }
        leftOver -= newInfants;
        const newAdults = Math.min(adults, leftOver);
        leftOver -= newAdults;
        setAdults(newAdults);
        const newChildren = Math.min(children, leftOver);
        setChildren(newChildren);
    };

    return (
        <Box>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    readyForTakeOff && !loading && onSearch();
                }}
            >
                <Columns>
                    <Columns.Column size={7}>
                        <Form.Field>
                            <Form.Label>Route</Form.Label>
                            <Form.Field kind="group" multiline>
                                <Form.Control>
                                    <SelectAirport
                                        type="origin"
                                        onSelect={setOriginAirport}
                                        defaultAirport={defaultOriginAirport}
                                        disabled={loading}
                                        autoFocus
                                    />
                                </Form.Control>
                                <Form.Control>
                                    <SelectAirport
                                        type="destination"
                                        onSelect={setDestinationAirport}
                                        defaultAirport={
                                            defaultDestinationAirport
                                        }
                                        disabled={loading}
                                    />
                                </Form.Control>
                            </Form.Field>
                        </Form.Field>
                        <Form.Field>
                            <Form.Control>
                                <Form.Checkbox
                                    checked={nonStop}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => setNonStop(e.target.checked)}
                                    disabled={loading}
                                >
                                    Non-Stop only
                                </Form.Checkbox>
                            </Form.Control>
                        </Form.Field>
                    </Columns.Column>
                    <Columns.Column size={5}>
                        <Form.Field>
                            <Form.Label>Departure & Return</Form.Label>
                            <Form.Field kind="group" multiline>
                                <Form.Control>
                                    <Form.Input
                                        type="date"
                                        value={departureDate}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) => {
                                            setDepartureDate(e.target.value);
                                            returnDate &&
                                                returnDate < e.target.value &&
                                                setReturnDate(e.target.value);
                                        }}
                                        required
                                        min={moment().format("YYYY-MM-DD")}
                                        disabled={loading}
                                    />
                                    <Icon align="left">
                                        <FontAwesomeIcon icon={faCalendar} />
                                    </Icon>
                                </Form.Control>
                                <Form.Control>
                                    <Form.Input
                                        type="date"
                                        value={returnDate}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) => setReturnDate(e.target.value)}
                                        min={departureDate}
                                        disabled={loading}
                                    />
                                    <Icon align="left">
                                        <FontAwesomeIcon icon={faCalendar} />
                                    </Icon>
                                </Form.Control>
                            </Form.Field>
                        </Form.Field>
                        <Form.Field>
                            <Form.Control>
                                <Form.Checkbox
                                    checked={returnDate !== ""}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setReturnDate(
                                            e.target.checked
                                                ? moment(departureDate)
                                                      .add(7, "days")
                                                      .format("YYYY-MM-DD")
                                                : ""
                                        )
                                    }
                                    disabled={loading}
                                >
                                    Return flight included
                                </Form.Checkbox>
                            </Form.Control>
                        </Form.Field>
                    </Columns.Column>
                </Columns>
                <Columns>
                    <Columns.Column size={7}>
                        <Form.Field>
                            <Form.Label>Travelers</Form.Label>
                            <Form.Field kind="group" multiline>
                                <Form.Control>
                                    <Form.Input
                                        type="number"
                                        value={adults}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleAdultsChange(
                                                e.target.valueAsNumber
                                            )
                                        }
                                        onBlur={() => {
                                            !adults && handleAdultsChange(1);
                                        }}
                                        style={travelerStyle}
                                        required
                                        min={1}
                                        max={9}
                                        disabled={loading}
                                    />
                                    <Icon align="left">
                                        <FontAwesomeIcon icon={faMale} />
                                    </Icon>
                                </Form.Control>
                                <Form.Control>
                                    <Form.Input
                                        type="number"
                                        value={children}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleChildrenChange(
                                                e.target.valueAsNumber
                                            )
                                        }
                                        onBlur={() => {
                                            !children &&
                                                handleChildrenChange(0);
                                        }}
                                        style={travelerStyle}
                                        required
                                        min={0}
                                        max={8}
                                        disabled={loading}
                                    />
                                    <Icon align="left">
                                        <FontAwesomeIcon icon={faChild} />
                                    </Icon>
                                </Form.Control>
                                <Form.Control>
                                    <Form.Input
                                        type="number"
                                        value={infants}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleInfantsChange(
                                                e.target.valueAsNumber
                                            )
                                        }
                                        onBlur={() => {
                                            !infants && handleInfantsChange(0);
                                        }}
                                        style={travelerStyle}
                                        required
                                        min={0}
                                        max={8}
                                        disabled={loading}
                                    />
                                    <Icon align="left">
                                        <FontAwesomeIcon icon={faBaby} />
                                    </Icon>
                                </Form.Control>
                            </Form.Field>
                        </Form.Field>
                    </Columns.Column>
                    <Columns.Column size={5}>
                        <Form.Field>
                            <Form.Label>Travel Class</Form.Label>
                            <Form.Control>
                                <Form.Select
                                    onChange={(
                                        e: ChangeEvent<HTMLSelectElement>
                                    ) =>
                                        setTravelClass(
                                            e.target.value as TApiTravelClass
                                        )
                                    }
                                    required
                                    value={travelClass}
                                    disabled={loading}
                                >
                                    <option value="ALL">
                                        {travelClassEnhance("ALL")}
                                    </option>
                                    <option value="ECONOMY">
                                        {travelClassEnhance("ECONOMY")}
                                    </option>
                                    <option value="PREMIUM_ECONOMY">
                                        {travelClassEnhance("PREMIUM_ECONOMY")}
                                    </option>
                                    <option value="BUSINESS">
                                        {travelClassEnhance("BUSINESS")}
                                    </option>
                                    <option value="FIRST">
                                        {travelClassEnhance("FIRST")}
                                    </option>
                                </Form.Select>
                                <Icon align="left">
                                    <FontAwesomeIcon icon={faStar} />
                                </Icon>
                            </Form.Control>
                        </Form.Field>
                    </Columns.Column>
                </Columns>
                <hr />
                {showAdvanced && (
                    <>
                        <Form.Field>
                            <Form.Label>Filter Airlines</Form.Label>
                            <Form.Field kind="group" multiline>
                                <Form.Control>
                                    <Form.Radio
                                        name="listType"
                                        checked={
                                            airlineListType === "whitelist"
                                        }
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setAirlineListType(
                                                e.target.value as TListType
                                            )
                                        }
                                        value="whitelist"
                                        disabled={loading}
                                    >
                                        Whitelist
                                    </Form.Radio>
                                    <Form.Radio
                                        name="listType"
                                        checked={
                                            airlineListType === "blacklist"
                                        }
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setAirlineListType(
                                                e.target.value as TListType
                                            )
                                        }
                                        value="blacklist"
                                        disabled={loading}
                                    >
                                        Blacklist
                                    </Form.Radio>
                                </Form.Control>
                                <Form.Control fullwidth>
                                    <Form.Input
                                        type="text"
                                        placeholder="IATA Codes"
                                        value={
                                            airlineListType === "blacklist"
                                                ? airlineBlacklist
                                                : airlineWhitelist
                                        }
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) => {
                                            updateListValue(e.target.value);
                                        }}
                                        disabled={loading}
                                    />
                                </Form.Control>
                            </Form.Field>
                        </Form.Field>
                        <hr />
                    </>
                )}
                <Button.Group align="right">
                    <Button
                        onClick={() => navigate("/")}
                        type="button"
                        color="warning"
                        colorVariant="light"
                        tabIndex={-1}
                        disabled={loading}
                    >
                        Reset
                        <Icon ml={1}>
                            <FontAwesomeIcon icon={faUndo} />
                        </Icon>
                    </Button>
                    <Button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        type="button"
                        color="info"
                        colorVariant="light"
                        disabled={
                            loading ||
                            airlineBlacklist !== "" ||
                            airlineWhitelist !== ""
                        }
                        tabIndex={-1}
                    >
                        {showAdvanced ? "Hide" : "Show"} Advanced Settings
                        <Icon ml={1}>
                            <FontAwesomeIcon icon={faCog} />
                        </Icon>
                    </Button>
                    <Button
                        color="info"
                        disabled={!readyForTakeOff}
                        type="submit"
                        loading={loading}
                    >
                        Take Off
                        <Icon ml={1}>
                            <FontAwesomeIcon icon={faPlane} />
                        </Icon>
                    </Button>
                </Button.Group>
            </form>
        </Box>
    );
}
