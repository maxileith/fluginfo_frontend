import { ChangeEvent } from "react";
import { Box, Button, Form } from "react-bulma-components";
import { IApiCarrier } from "../../api/interfaces/IApiOffer";
import RangeInput from "../RangeInput/RangeInput";

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
    onChangePriceLimit: (priceLimit: number) => void;
    durationMin: number;
    durationMax: number;
    durationLimit: number;
    onChangeDurationLimit: (durationLimit: number) => void;
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
    return (
        <Box>
            {/*style={{ position: "sticky", top: "4rem" }}*/}
            <p>
                Showing{" "}
                <strong>
                    {numberOfFilteredOffers}/{numberOfTotalOffers}
                </strong>{" "}
                offers.
            </p>
            <hr />
            <Form.Field>
                <Form.Label>Order by</Form.Label>
                <Form.Control>
                    <Button.Group hasAddons>
                        <Button
                            color={orderBy === "price" ? "info" : undefined}
                            onClick={() => setOrderBy("price")}
                            size="small"
                        >
                            Price
                        </Button>
                        <Button
                            color={orderBy === "duration" ? "info" : undefined}
                            onClick={() => setOrderBy("duration")}
                            size="small"
                        >
                            Duration
                        </Button>
                    </Button.Group>
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>Offers per page</Form.Label>
                <Form.Control>
                    <Button.Group hasAddons>
                        {[10, 25, 50, 100].map((n) => (
                            <Button
                                color={n === offersPerPage ? "info" : undefined}
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
            <hr />
            <Form.Field>
                <Form.Label>Stops</Form.Label>
                {possibleNumberOfStops.map((stops) => (
                    <Form.Control key={stops}>
                        <Form.Checkbox
                            checked={includedNumberOfStops.includes(stops)}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                onChangeNumberOfStops(stops, e.target.checked)
                            }
                        >
                            {stops === 0 ? "Non-Stop" : `${stops} Stop`}
                            {stops >= 2 && "s"}
                        </Form.Checkbox>
                    </Form.Control>
                ))}
            </Form.Field>
            <Form.Field>
                <Form.Label>Price: {priceLimit}€</Form.Label>
                <Form.Control>
                    <RangeInput
                        min={priceMin}
                        max={priceMax}
                        value={priceLimit}
                        onChange={onChangePriceLimit}
                        color="info"
                        isCircle
                        waitUntilChange={250}
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>
                    Duration:{" "}
                    {Math.floor(durationLimit / 60) !== 0 &&
                        `${Math.floor(durationLimit / 60)}h `}
                    {`${durationLimit % 60}min`}
                </Form.Label>
                <Form.Control>
                    <RangeInput
                        min={durationMin}
                        max={durationMax}
                        value={durationLimit}
                        onChange={(value: number) => {
                            onChangeDurationLimit(value);
                        }}
                        color="info"
                        isCircle
                        waitUntilChange={250}
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>Airlines</Form.Label>
                {possibleAirlines.map((airline) => (
                    <Form.Control key={airline.carrierCode}>
                        <Form.Checkbox
                            checked={includedAirlineCarrierCode.includes(
                                airline.carrierCode
                            )}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                onChangeAirline(
                                    airline.carrierCode,
                                    e.target.checked
                                )
                            }
                        >
                            {airline.carrier}
                        </Form.Checkbox>
                    </Form.Control>
                ))}
            </Form.Field>
        </Box>
    );
}
