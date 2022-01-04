import { Box, Columns } from "react-bulma-components";
import IApiStatus from "../../api/interfaces/IApiStatus";
import StatusDisplayFlight from "./StatusDisplayFlight";
import StatusDisplayStop from "./StatusDisplayStop";

export interface IStatusDisplay {
    status: IApiStatus;
}

export default function StatusDisplay({ status }: IStatusDisplay): JSX.Element {
    const handleSeatmap = (classId: string) => {
        console.log(`seatmap triggered: ${classId}`);
    };

    return (
        <Box>
            <Columns>
                <Columns.Column narrow>
                    <Columns>
                        <Columns.Column>
                            <StatusDisplayStop
                                stop={status.departure}
                                type="departure"
                            />
                        </Columns.Column>
                        <Columns.Column>
                            <StatusDisplayStop
                                stop={status.arrival}
                                type="arrival"
                            />
                        </Columns.Column>
                    </Columns>
                </Columns.Column>
                <Columns.Column>
                    <Columns.Column narrow>
                        <StatusDisplayFlight
                            duration={status.duration}
                            flightNumber={status.flightNumber}
                            carrier={status.carrier}
                            carrierCode={status.carrierCode}
                            aircraft={status.aircraft}
                        />
                    </Columns.Column>
                </Columns.Column>
            </Columns>
        </Box>
    );
}
