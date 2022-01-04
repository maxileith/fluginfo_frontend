import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Content,
    Heading,
    Icon,
    Media,
    Table,
    Image,
} from "react-bulma-components";
import IApiDuration from "../../api/interfaces/IApiDuration";
import API from "../../Api";

export interface IStatusDisplayFlight {
    duration: IApiDuration;
    flightNumber: string;
    carrier?: string;
    carrierCode: string;
    aircraft: string;
}

export default function StatusDisplayFlight({
    duration,
    flightNumber,
    carrier,
    carrierCode,
    aircraft,
}: IStatusDisplayFlight): JSX.Element {
    return (
        <>
            <Heading size={4}>
                <Icon mr={2}>
                    <FontAwesomeIcon icon={faPlane} size="sm" />
                </Icon>
                Flight
            </Heading>
            <Heading size={4} subtitle>
                {duration.hours !== 0 && `${duration.hours}h `}
                {`${duration.minutes}min`}
            </Heading>
            <Table>
                <tbody>
                    <tr>
                        <th>Flight Number</th>
                        <td>{flightNumber}</td>
                    </tr>
                    {carrier && (
                        <tr>
                            <th>Carrier</th>
                            <td>{carrier}</td>
                        </tr>
                    )}
                    <tr>
                        <th>Carrier Code</th>
                        <td>
                            <Media>
                                <Media.Item>
                                    <Content>{carrierCode}</Content>
                                </Media.Item>
                                <Media.Item align="right" renderAs="figure">
                                    <Image
                                        src={`${API.defaults.baseURL}/metadata/airlines/logo/?filetype=png&height=32&iata=${carrierCode}&shape=square&width=32`}
                                        display="inline-flex"
                                        alt="Country Flag"
                                        size={24}
                                    />
                                </Media.Item>
                            </Media>
                        </td>
                    </tr>
                    <tr>
                        <th>Aircraft</th>
                        <td>{aircraft}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}
