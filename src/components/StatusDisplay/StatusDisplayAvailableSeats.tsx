import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Box,
    Button,
    Columns,
    Heading,
    Icon,
    Table,
} from "react-bulma-components";
import { IApiAvailableSeats } from "../../api/interfaces/IApiStatus";

export interface IStatusDisplayAvailableSeats {
    availableSeats: IApiAvailableSeats[];
    showSeatmap: (classId: string) => void;
}

export default function StatusDisplayAvailableSeats({
    availableSeats,
    showSeatmap,
}: IStatusDisplayAvailableSeats): JSX.Element {
    return (
        <>
            <Heading size={4}>
                <Icon mr={2}>
                    <FontAwesomeIcon icon={faStar} size="sm" />
                </Icon>
                Seats
            </Heading>
            <Heading size={4} subtitle>
                Availability by classes
            </Heading>
            <Columns breakpoint="mobile" multiline>
                {availableSeats.map((seats) => (
                    <Columns.Column
                        key={seats.classId}
                        paddingless
                        mx={2}
                        narrow
                    >
                        <Table>
                            <tbody>
                                <tr>
                                    <th style={{ padding: ".5em .375em" }}>
                                        {seats.classId}
                                    </th>
                                    <td style={{ padding: ".5em .375em" }}>
                                        {seats.seats}
                                    </td>
                                    <td style={{ padding: ".5em .375em" }}>
                                        <Button
                                            onClick={() => {
                                                showSeatmap(seats.classId);
                                            }}
                                            size="small"
                                            color="link"
                                            colorVariant="light"
                                        >
                                            Seatmap
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Columns.Column>
                ))}
            </Columns>
        </>
    );
}
