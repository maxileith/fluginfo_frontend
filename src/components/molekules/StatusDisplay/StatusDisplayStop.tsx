import {
    faPlaneArrival,
    faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import {
    Content,
    Heading,
    Icon,
    Media,
    Table,
    Image,
    Tag,
} from "react-bulma-components";
import IApiStop from "../../../api/interfaces/IApiStop";
import API from "../../../Api";

export interface IStatusDisplayStop {
    stop: IApiStop;
    type: "arrival" | "departure";
    liveTiming?: string;
}

export default function StatusDisplayStop({
    stop,
    type,
    liveTiming,
}: IStatusDisplayStop): JSX.Element {
    const timeOffset: number | undefined = liveTiming
        ? moment(liveTiming).diff(moment(stop.at), "minutes")
        : undefined;
    const timeOffsetAbs: number = Math.abs(timeOffset || 0);

    return (
        <>
            <Heading size={4}>
                <Icon mr={2}>
                    <FontAwesomeIcon
                        icon={
                            type === "departure"
                                ? faPlaneDeparture
                                : faPlaneArrival
                        }
                        size="sm"
                    />
                </Icon>
                {type === "departure" ? "Departure" : "Arrival"} Airport
            </Heading>
            <Heading size={4} subtitle>
                {moment(liveTiming || stop.at).format("h:mm a (Do MMMM)")}
                {timeOffset !== undefined && (
                    <>
                        {timeOffset === 0 && (
                            <Tag color="success" ml={2}>
                                on time
                            </Tag>
                        )}
                        {timeOffset < 0 && (
                            <Tag color="success" ml={2}>
                                -{" "}
                                {Math.floor(timeOffsetAbs / 60) !== 0 &&
                                    `${Math.floor(timeOffsetAbs / 60)}h `}
                                {`${timeOffsetAbs % 60}min`}
                            </Tag>
                        )}
                        {timeOffset > 0 && (
                            <Tag color="danger" ml={2}>
                                +{" "}
                                {Math.floor(timeOffsetAbs / 60) !== 0 &&
                                    `${Math.floor(timeOffsetAbs / 60)}h `}
                                {`${timeOffsetAbs % 60}min`}
                            </Tag>
                        )}
                    </>
                )}
            </Heading>
            {timeOffset !== undefined && timeOffset !== 0 && (
                <Heading size={6} subtitle style={{ marginTop: "-1.25rem" }}>
                    Scheduled: {moment(stop.at).format("h:mm a (Do MMMM)")}
                </Heading>
            )}
            <Table>
                <tbody>
                    <tr>
                        <th>IATA</th>
                        <td>{stop.airport.iata}</td>
                    </tr>
                    {stop.airport.name && (
                        <tr>
                            <th>Name</th>
                            <td>{stop.airport.name}</td>
                        </tr>
                    )}
                    {stop.airport.city && (
                        <tr>
                            <th>City</th>
                            <td>{stop.airport.city}</td>
                        </tr>
                    )}
                    {stop.airport.country && (
                        <tr>
                            <th>Country</th>
                            <td>
                                <Media>
                                    <Media.Item>
                                        <Content>
                                            {stop.airport.country}
                                        </Content>
                                    </Media.Item>
                                    <Media.Item align="right" renderAs="figure">
                                        <Image
                                            src={`${API.defaults.baseURL}/metadata/countries/flag/?countryCode=${stop.airport.countryCode}`}
                                            display="inline-flex"
                                            alt={`${stop.airport.country} Flag`}
                                            style={{ width: 32 }}
                                        />
                                    </Media.Item>
                                </Media>
                            </td>
                        </tr>
                    )}
                    {stop.airport.countryCode && (
                        <tr>
                            <th>Country Code</th>
                            <td>{stop.airport.countryCode}</td>
                        </tr>
                    )}
                    {stop.airport.timezone && (
                        <tr>
                            <th>Timezone</th>
                            <td>UTC{stop.airport.timezone}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    );
}
