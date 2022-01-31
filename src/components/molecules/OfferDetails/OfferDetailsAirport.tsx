import { faFlag, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Content,
    Image,
    Heading,
    Tag,
    Icon,
    Columns,
} from "react-bulma-components";
import API from "../../../Api";
import IApiAirport from "../../../api/interfaces/IApiAirport";

export interface IOfferDetailsAirport {
    airport: IApiAirport;
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
        <>
            <Content textAlign="center" mobile={{ display: "hidden" }}>
                {airport.countryCode ? (
                    <Image
                        src={`${API.defaults.baseURL}/metadata/countries/flag/?countryCode=${airport.countryCode}`}
                        alt={
                            airport.country ? `${airport.country} flag` : "flag"
                        }
                        rounded
                        style={{ maxWidth: 80, margin: "0 auto", zIndex: 2 }}
                    />
                ) : (
                    <Icon mt={2} style={{ zIndex: 2, position: "relative" }}>
                        <FontAwesomeIcon icon={faFlag} size="3x" />
                    </Icon>
                )}
                <Heading size={6}>{airport.iata}</Heading>
                <Heading size={6} subtitle weight="light">
                    {airportHeading}
                </Heading>
                {airport.timezone && (
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
                )}
            </Content>

            <Content textAlign="left" tablet={{ display: "hidden" }}>
                <Columns breakpoint="mobile" vCentered>
                    <Columns.Column narrow p={1}>
                        {airport.countryCode ? (
                            <Image
                                src={`${API.defaults.baseURL}/metadata/countries/flag/?countryCode=${airport.countryCode}`}
                                alt={
                                    airport.country
                                        ? `${airport.country} flag`
                                        : "flag"
                                }
                                rounded
                                style={{ width: 48, zIndex: 2 }}
                                mx={2}
                            />
                        ) : (
                            <Icon
                                mt={2}
                                mx={2}
                                style={{
                                    zIndex: 2,
                                    position: "relative",
                                    width: 48,
                                }}
                            >
                                <FontAwesomeIcon icon={faFlag} size="2x" />
                            </Icon>
                        )}
                    </Columns.Column>
                    <Columns.Column>
                        <Heading size={6}>
                            {airport.iata}
                            {airport.timezone && (
                                <Tag.Group
                                    hasAddons
                                    display="inline-flex"
                                    my={marginTagsY}
                                    mx={marginTagsX}
                                >
                                    <Tag color="dark">
                                        UTC{airport.timezone}
                                    </Tag>
                                    <Tag>
                                        <Icon>
                                            <FontAwesomeIcon icon={faGlobe} />
                                        </Icon>
                                    </Tag>
                                </Tag.Group>
                            )}
                        </Heading>
                        <Heading size={6} subtitle weight="light">
                            {airportHeading}
                        </Heading>
                    </Columns.Column>
                </Columns>
            </Content>
        </>
    );
}
