import { Box, Columns } from "react-bulma-components";
import IApiStatus, {
    IApiAvailableSeats,
} from "../../api/interfaces/IApiStatus";
import IApiStatusTimings from "../../api/interfaces/IApiStatusTimings";
import StatusDisplayAvailableSeats from "./StatusDisplayAvailableSeats";
import StatusDisplayFlight from "./StatusDisplayFlight";
import StatusDisplayStop from "./StatusDisplayStop";

export interface IStatusDisplay {
    status: IApiStatus;
    showSeatmap: (classId: string) => void;
    liveTimings?: IApiStatusTimings;
}

export default function StatusDisplay({
    status,
    showSeatmap,
    liveTimings,
}: IStatusDisplay): JSX.Element {
    status.availableSeats = status.availableSeats.sort(
        (a: IApiAvailableSeats, b: IApiAvailableSeats) =>
            Number(a.classId > b.classId)
    );

    return (
        <Box>
            <Columns>
                <Columns.Column size={4}>
                    <StatusDisplayStop
                        stop={status.departure}
                        type="departure"
                        liveTiming={liveTimings && liveTimings.departure}
                    />
                </Columns.Column>
                <hr />
                <Columns.Column size={4}>
                    <StatusDisplayStop
                        stop={status.arrival}
                        type="arrival"
                        liveTiming={liveTimings && liveTimings.arrival}
                    />
                </Columns.Column>
                <hr />
                <Columns.Column size={4}>
                    <StatusDisplayFlight
                        duration={status.duration}
                        flightNumber={status.flightNumber}
                        carrier={status.carrier}
                        carrierCode={status.carrierCode}
                        aircraft={status.aircraft}
                    />
                </Columns.Column>
            </Columns>
            <hr />
            <StatusDisplayAvailableSeats
                availableSeats={status.availableSeats}
                showSeatmap={showSeatmap}
            />
        </Box>
    );
}
