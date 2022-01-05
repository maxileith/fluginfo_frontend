import { faCalendar, faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { ChangeEvent } from "react";
import { Box, Button, Columns, Form, Icon } from "react-bulma-components";

export interface IStatusSearchForm {
    flightNumber: string;
    setFlightNumber: (flightNumber: string) => void;
    date: string;
    setDate: (date: string) => void;
    onSearch: () => void;
    readyForTakeOff: boolean;
    loading?: boolean;
}

export default function StatusSearchForm({
    flightNumber,
    setFlightNumber,
    date,
    setDate,
    onSearch,
    readyForTakeOff,
    loading,
}: IStatusSearchForm): JSX.Element {
    return (
        <Box>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    readyForTakeOff && !loading && onSearch();
                }}
            >
                <Columns>
                    <Columns.Column narrow>
                        <Form.Field>
                            <Form.Label>Flight Number</Form.Label>
                            <Form.Control>
                                <Form.Input
                                    type="text"
                                    placeholder="XX1234"
                                    value={flightNumber}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setFlightNumber(e.target.value);
                                    }}
                                />
                            </Form.Control>
                        </Form.Field>
                    </Columns.Column>
                    <Columns.Column narrow>
                        <Form.Field>
                            <Form.Label>Departure Date</Form.Label>
                            <Form.Control>
                                <Form.Input
                                    type="date"
                                    value={date}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => setDate(e.target.value)}
                                    required
                                    min={moment().format("YYYY-MM-DD")}
                                />
                                <Icon align="left">
                                    <FontAwesomeIcon icon={faCalendar} />
                                </Icon>
                            </Form.Control>
                        </Form.Field>
                    </Columns.Column>
                    <Columns.Column narrow textAlign="right">
                        <Form.Field>
                            <Form.Label mobile={{ display: "hidden" }}>
                                &nbsp;
                            </Form.Label>
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
                        </Form.Field>
                    </Columns.Column>
                </Columns>
            </form>
        </Box>
    );
}
