import { ChangeEvent } from "react";
import { Box, Form } from "react-bulma-components";
import IApiDuration from "../../api/interfaces/IApiDuration";
import { IApiCarrier } from "../../api/interfaces/IApiOffer";
import RangeInput from "../RangeInput/RangeInput";

export interface IOfferFilterFormAirlines {
    details: IApiCarrier;
    included: boolean;
}

export interface IOfferFilterFormNumberOfStops {
    value: number;
    included: boolean;
}

export interface IOfferFilterForm {
    airlines: IOfferFilterFormAirlines[];
    onChangeAirline: (carrier: IApiCarrier, included: boolean) => void;
    numberOfStops: IOfferFilterFormNumberOfStops[];
    onChangeNumberOfStops: (numberOfStops: number, included: boolean) => void;
    priceMin: number;
    priceMax: number;
    priceLimit: number;
    onChangePriceLimit: (priceLimit: number) => void;
    durationMin: IApiDuration;
    durationMax: IApiDuration;
    durationLimit: IApiDuration;
    onChangeDurationLimit: (durationLimit: IApiDuration) => void;
    numberOfTotalOffers: number;
    numberOfFilteredOffers: number;
}

export default function OfferFilterForm({
    airlines,
    onChangeAirline,
    numberOfStops,
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
}: IOfferFilterForm): JSX.Element {
    console.log(airlines);

    return (
        <Box>
            <p>
                Showing{" "}
                <strong>
                    {numberOfFilteredOffers}/{numberOfTotalOffers}
                </strong>{" "}
                offers.
            </p>
            <hr />
            <Form.Field>
                <Form.Label>Stops</Form.Label>
                {numberOfStops.map((stops) => (
                    <Form.Control key={stops.value}>
                        <Form.Checkbox
                            checked={stops.included}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                onChangeNumberOfStops(
                                    stops.value,
                                    e.target.checked
                                )
                            }
                        >
                            {stops.value === 0
                                ? "Non-Stop"
                                : `${stops.value} Stop`}
                            {stops.value >= 2 && "s"}
                        </Form.Checkbox>
                    </Form.Control>
                ))}
            </Form.Field>
            <Form.Field>
                <Form.Label>Price limit: {priceLimit}€</Form.Label>
                <Form.Control>
                    <RangeInput
                        min={priceMin}
                        max={priceMax}
                        value={priceLimit}
                        onChange={onChangePriceLimit}
                        color="info"
                        isCircle
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>
                    Duration limit:{" "}
                    {durationLimit.hours !== 0 && `${durationLimit.hours}h `}
                    {`${durationLimit.minutes}min`}
                </Form.Label>
                <Form.Control>
                    <RangeInput
                        min={durationMin.hours * 60 + durationMin.minutes}
                        max={durationMax.hours * 60 + durationMax.minutes}
                        value={durationLimit.hours * 60 + durationLimit.minutes}
                        onChange={(value: number) => {
                            onChangeDurationLimit({
                                hours: Math.floor(value / 60),
                                minutes: value % 60,
                            });
                        }}
                        color="info"
                        isCircle
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>Airlines</Form.Label>
                {airlines.map((airline) => (
                    <Form.Control key={airline.details.carrierCode}>
                        <Form.Checkbox
                            checked={airline.included}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                onChangeAirline(
                                    airline.details,
                                    e.target.checked
                                )
                            }
                        >
                            {airline.details.carrier}
                        </Form.Checkbox>
                    </Form.Control>
                ))}
            </Form.Field>
        </Box>
    );
}
