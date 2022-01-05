import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Columns, Heading, Icon, Table } from "react-bulma-components";
import { IApiAvailableSeats } from "../../api/interfaces/IApiStatus";

export interface IStatusDisplayAvailableSeats {
    availableSeats: IApiAvailableSeats[];
    showSeatmap: (classId: string) => void;
}

export default function StatusDisplayAvailableSeats({
    availableSeats,
    showSeatmap,
}: IStatusDisplayAvailableSeats): JSX.Element {
    var columns: number = 5;
    var rows: number = Math.ceil(availableSeats.length / columns);

    var availableSeatsSlices: IApiAvailableSeats[][] = [];
    for (let i: number = 0; i < availableSeats.length; i += rows) {
        var start: number = i;
        var end: number = Math.min(start + rows, availableSeats.length);
        availableSeatsSlices.push(availableSeats.slice(start, end));
    }

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
            <Columns breakpoint="mobile">
                {availableSeatsSlices.map((slice, index) => (
                    <Columns.Column narrow key={index}>
                        <Table>
                            <tbody>
                                {slice.map((seat) => (
                                    <tr key={seat.classId}>
                                        <th>{seat.classId}</th>
                                        <td>{seat.seats}</td>
                                        <td>
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    showSeatmap(seat.classId);
                                                }}
                                                href="#!"
                                            >
                                                Seatmap
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Columns.Column>
                ))}
            </Columns>
        </>
    );
}
