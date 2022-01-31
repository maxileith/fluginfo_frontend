import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Block, Box, Button, Form, Icon, Level } from "react-bulma-components";
import { IApiCarrier } from "../../../../api/interfaces/IApiOffer";
import useLazyStateWrapper from "../../../../hooks/useLazyStateWrapper";
import AdvancedStickyWrapper from "../../../atoms/AdvancedStickyWrapper/AdvancedStickyWrapper";
import RangeInput from "../../../atoms/RangeInput/RangeInput";

export type TOfferOrderBy = "price" | "duration";

export interface IOfferFilterForm {
    possibleAirlines: IApiCarrier[];
    includedAirlineCarrierCode: string[];
    onChangeAirline: (carrierCode: string, include: boolean) => void;
    possibleNumberOfStops: number[];
    includedNumberOfStops: number[];
    onChangeNumberOfStops: (numberOfStops: number, include: boolean) => void;
    priceMin: number;
    priceMax: number;
    priceLimit: number;
    onChangePriceLimit: Dispatch<SetStateAction<number>>;
    durationMin: number;
    durationMax: number;
    durationLimit: number;
    onChangeDurationLimit: Dispatch<SetStateAction<number>>;
    numberOfTotalOffers: number;
    numberOfFilteredOffers: number;
    offersPerPage: number;
    setOffersPerPage: (offersPerPage: number) => void;
    orderBy: TOfferOrderBy;
    setOrderBy: (orderBy: TOfferOrderBy) => void;
}

export default function OfferFilterForm({
    possibleAirlines,
    includedAirlineCarrierCode,
    onChangeAirline,
    possibleNumberOfStops,
    includedNumberOfStops,
    onChangeNumberOfStops,
    priceMin,
    priceMax,
    priceLimit,
    onChangePriceLimit,
    durationMin,
    durationMax,
    durationLimit,
    onChangeDurationLimit,
    numberOfFilteredOffers,
    numberOfTotalOffers,
    offersPerPage,
    setOffersPerPage,
    orderBy,
    setOrderBy,
}: IOfferFilterForm): JSX.Element {
    const [priceLimitLazy, setPriceLimitLazy] = useLazyStateWrapper([
        priceLimit,
        onChangePriceLimit,
    ]);
    const [durationLimitLazy, setDurationLimitLazy] = useLazyStateWrapper([
        durationLimit,
        onChangeDurationLimit,
    ]);

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <AdvancedStickyWrapper>
            <Box>
                <Level marginless breakpoint="mobile">
                    <Level.Side align="left">
                        <Level.Item>
                            <p>
                                Showing{" "}
                                <strong>
                                    {numberOfFilteredOffers}/
                                    {numberOfTotalOffers}
                                </strong>{" "}
                                offers.
                            </p>
                        </Level.Item>
                    </Level.Side>
                    <Level.Side align="right" desktop={{ display: "hidden" }}>
                        <Level.Item>
                            <Button
                                onClick={() => setVisible(!visible)}
                                color="info"
                            >
                                {visible ? "Hide" : "Show"} Filter
                                <Icon ml={1}>
                                    <FontAwesomeIcon icon={faFilter} />
                                </Icon>
                            </Button>
                        </Level.Item>
                    </Level.Side>
                </Level>

                <Block touch={{ display: visible ? "block" : "hidden" }}>
                    <hr />
                    <Form.Field kind="group" multiline>
                        <Form.Field mr={4}>
                            <Form.Label>Order by</Form.Label>
                            <Form.Control>
                                <Button.Group hasAddons>
                                    <Button
                                        color="info"
                                        colorVariant={
                                            orderBy !== "price"
                                                ? "light"
                                                : undefined
                                        }
                                        onClick={() => setOrderBy("price")}
                                        size="small"
                                    >
                                        Price
                                    </Button>
                                    <Button
                                        color="info"
                                        colorVariant={
                                            orderBy !== "duration"
                                                ? "light"
                                                : undefined
                                        }
                                        onClick={() => setOrderBy("duration")}
                                        size="small"
                                    >
                                        Duration
                                    </Button>
                                </Button.Group>
                            </Form.Control>
                        </Form.Field>
                        <Form.Field mr={4}>
                            <Form.Label>Offers per page</Form.Label>
                            <Form.Control>
                                <Button.Group hasAddons>
                                    {[10, 25, 50, 100].map((n) => (
                                        <Button
                                            color="info"
                                            colorVariant={
                                                n !== offersPerPage
                                                    ? "light"
                                                    : undefined
                                            }
                                            onClick={() => setOffersPerPage(n)}
                                            size="small"
                                            key={n}
                                        >
                                            {n}
                                        </Button>
                                    ))}
                                </Button.Group>
                            </Form.Control>
                        </Form.Field>
                    </Form.Field>
                    <hr />
                    <Form.Field kind="group" multiline>
                        <Form.Field mr={4} style={{ minWidth: "5rem" }}>
                            <Form.Label>Stops</Form.Label>
                            {possibleNumberOfStops.map((stops) => (
                                <Form.Control key={stops}>
                                    <Form.Checkbox
                                        checked={includedNumberOfStops.includes(
                                            stops
                                        )}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            onChangeNumberOfStops(
                                                stops,
                                                e.target.checked
                                            )
                                        }
                                    >
                                        {stops === 0
                                            ? "Non-Stop"
                                            : `${stops} Stop`}
                                        {stops >= 2 && "s"}
                                    </Form.Checkbox>
                                </Form.Control>
                            ))}
                        </Form.Field>
                        <Form.Field mr={4}>
                            <Form.Label>Price: {priceLimitLazy}€</Form.Label>
                            <Form.Control>
                                <RangeInput
                                    min={priceMin}
                                    max={priceMax}
                                    value={priceLimitLazy}
                                    onChange={setPriceLimitLazy}
                                    color="info"
                                    isCircle
                                />
                            </Form.Control>
                            <Form.Label>
                                Duration:{" "}
                                {Math.floor(durationLimitLazy / 60) !== 0 &&
                                    `${Math.floor(durationLimitLazy / 60)}h `}
                                {`${durationLimitLazy % 60}min`}
                            </Form.Label>
                            <Form.Control>
                                <RangeInput
                                    min={durationMin}
                                    max={durationMax}
                                    value={durationLimitLazy}
                                    onChange={(value: number) => {
                                        setDurationLimitLazy(value);
                                    }}
                                    color="info"
                                    isCircle
                                />
                            </Form.Control>
                        </Form.Field>
                        <Form.Field mr={4} style={{ maxWidth: "100%" }}>
                            <Form.Label>Airlines</Form.Label>
                            {possibleAirlines.map((airline) => (
                                <Form.Control key={airline.carrierCode}>
                                    <Form.Checkbox
                                        checked={includedAirlineCarrierCode.includes(
                                            airline.carrierCode
                                        )}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) =>
                                            onChangeAirline(
                                                airline.carrierCode,
                                                e.target.checked
                                            )
                                        }
                                        style={{
                                            textOverflow: "ellipsis",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            width: "100%",
                                        }}
                                    >
                                        {airline.carrierCode} -{" "}
                                        {airline.carrier}
                                    </Form.Checkbox>
                                </Form.Control>
                            ))}
                        </Form.Field>
                    </Form.Field>
                </Block>
            </Box>
        </AdvancedStickyWrapper>
    );
}
