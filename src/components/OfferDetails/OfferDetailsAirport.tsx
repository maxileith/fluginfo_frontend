import { faFlag, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Content, Image, Heading, Tag, Icon } from "react-bulma-components";
import API from "../../Api";
import IApiAirport from "../../api/interfaces/IApiAirport";

export interface IOfferDetailsAirport {
    airport: IApiAirport;
    type: "origin" | "change" | "destination";
}

export default function OfferDetailsAirport({
    airport,
}: IOfferDetailsAirport): JSX.Element {
    const marginTagsX: number = 1;
    const marginTagsY: number = 1;

    var airportHeading: string = "";

    if (airport.name) {
        airportHeading += airport.name;
    }
    if (airport.city && !airportHeading.includes(airport.city)) {
        airportHeading += ` (${airport.city})`;
    }

    return (
        <Content textAlign="center">
            {airport.countryCode ? (
                <Image
                    src={`${API.defaults.baseURL}/metadata/countries/flag/?countryCode=${airport.countryCode}`}
                    alt={airport.country ? `${airport.country} flag` : "flag"}
                    rounded
                    style={{ maxWidth: 64, margin: "0 auto" }}
                />
            ) : (
                <Icon mt={2}>
                    <FontAwesomeIcon icon={faFlag} size="2x" />
                </Icon>
            )}
            <Heading size={6}>{airport.iata}</Heading>
            <Heading size={6} subtitle weight="light">
                {airportHeading}
            </Heading>
            <Tag.Group
                hasAddons
                display="inline-flex"
                my={marginTagsY}
                mx={marginTagsX}
            >
                <Tag color="dark">UTC{airport.timezone}</Tag>
                <Tag>
                    <Icon>
                        <FontAwesomeIcon icon={faGlobe} />
                    </Icon>
                </Tag>
            </Tag.Group>
        </Content>
    );
}
