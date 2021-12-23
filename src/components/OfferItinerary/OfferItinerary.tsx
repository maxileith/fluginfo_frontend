import {
    Columns,
    Content,
    Icon,
    Image,
    Media,
    Tag,
} from "react-bulma-components";
import { IItinerary } from "../../api/interfaces/IOffer";
import API from "../../Api";
import SearchDropdownLabel from "../SearchDropdown/SearchDropdownLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faMapMarker,
    faPlaneArrival,
    faPlaneDeparture,
    faStar,
} from "@fortawesome/free-solid-svg-icons";

export interface IOfferItinerary {
    itinerary: IItinerary;
}

export default function OfferItinerary({
    itinerary,
}: IOfferItinerary): JSX.Element {
    const marginTagsRight: number = 2;
    const marginTagsY: number = 1;

    const departureTitle = itinerary.departure.airport.city
        ? `${itinerary.departure.airport.iata} - ${itinerary.departure.airport.city}`
        : itinerary.departure.airport.iata;
    const departureImg = itinerary.departure.airport.countryCode
        ? `${API.defaults.baseURL}/metadata/countries/flag/?countryCode=${itinerary.departure.airport.countryCode}`
        : undefined;
    const arrivalTitle = itinerary.arrival.airport.city
        ? `${itinerary.arrival.airport.iata} - ${itinerary.arrival.airport.city}`
        : itinerary.arrival.airport.iata;
    const arrivalImg = itinerary.arrival.airport.countryCode
        ? `${API.defaults.baseURL}/metadata/countries/flag/?countryCode=${itinerary.arrival.airport.countryCode}`
        : undefined;

    return (
        <>
            <Columns breakpoint="mobile">
                <Columns.Column>
                    <SearchDropdownLabel
                        title={departureTitle}
                        imageUrl={departureImg}
                        icon={faPlaneDeparture}
                    />
                </Columns.Column>
                <Columns.Column>
                    <SearchDropdownLabel
                        title={arrivalTitle}
                        imageUrl={arrivalImg}
                        icon={faPlaneArrival}
                    />
                </Columns.Column>
            </Columns>
            <Columns>
                <Columns.Column>
                    <Content>
                        <Tag.Group
                            hasAddons
                            display="inline-flex"
                            my={marginTagsY}
                            mr={marginTagsRight}
                        >
                            <Tag color="info">
                                {itinerary.duration.hours !== 0 &&
                                    `${itinerary.duration.hours} Hours `}
                                {`${itinerary.duration.minutes} Minutes`}
                            </Tag>
                            <Tag>
                                <Icon>
                                    <FontAwesomeIcon icon={faClock} />
                                </Icon>
                            </Tag>
                        </Tag.Group>
                        <Tag.Group
                            hasAddons
                            display="inline-flex"
                            my={marginTagsY}
                            mr={marginTagsRight}
                        >
                            <Tag color="warning">{itinerary.stops}</Tag>
                            <Tag>
                                <Icon>
                                    <FontAwesomeIcon icon={faMapMarker} />
                                </Icon>
                            </Tag>
                        </Tag.Group>
                        {itinerary.classes.map((c, index) => (
                            <Tag.Group
                                hasAddons
                                key={index}
                                display="inline-flex"
                                my={marginTagsY}
                                mr={marginTagsRight}
                            >
                                <Tag color="primary">{c}</Tag>
                                <Tag>
                                    <Icon>
                                        <FontAwesomeIcon icon={faStar} />
                                    </Icon>
                                </Tag>
                            </Tag.Group>
                        ))}
                    </Content>
                </Columns.Column>
                <Columns.Column>
                    <Media>
                        {itinerary.carriers.map((carrier) => (
                            <Media.Item align="left" key={carrier.carrierCode}>
                                <Image
                                    src={`${API.defaults.baseURL}/metadata/airlines/logo/?filetype=png&height=64&iata=${carrier.carrierCode}&shape=tail&width=64`}
                                    size={64}
                                />
                            </Media.Item>
                        ))}
                    </Media>
                </Columns.Column>
            </Columns>
        </>
    );
}
