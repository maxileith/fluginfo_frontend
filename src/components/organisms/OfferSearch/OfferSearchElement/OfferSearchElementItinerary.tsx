import {
    Columns,
    Content,
    Icon,
    Image,
    Media,
    Tag,
} from "react-bulma-components";
import { IApiItinerary } from "../../../../api/interfaces/IApiOffer";
import API from "../../../../Api";
import SearchDropdownLabel from "../../../molecules/SearchDropdown/SearchDropdownLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faPlaneArrival,
    faPlaneDeparture,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import React from "react";
import travelClassEnhance from "../../../../utils/travelClassEnhance";

export interface IOfferSearchElementItinerary {
    itinerary: IApiItinerary;
}

export default function OfferSearchElementItinerary({
    itinerary,
}: IOfferSearchElementItinerary): JSX.Element {
    const marginTagsX: number = 1;
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

    const departureTime: string = moment(itinerary.departure.at).format(
        "h:mm a (DD.MM.YYYY)"
    );
    const arrivalTime: string = moment(itinerary.arrival.at).format(
        "h:mm a (DD.MM.YYYY)"
    );

    return (
        <>
            <Columns breakpoint="tablet">
                <Columns.Column>
                    <SearchDropdownLabel
                        title={departureTitle}
                        imageUrl={departureImg}
                        icon={faPlaneDeparture}
                    />
                    <div />
                    <SearchDropdownLabel title={departureTime} icon={faClock} />
                </Columns.Column>
                <Columns.Column>
                    <SearchDropdownLabel
                        title={arrivalTitle}
                        imageUrl={arrivalImg}
                        icon={faPlaneArrival}
                    />
                    <div />
                    <SearchDropdownLabel title={arrivalTime} icon={faClock} />
                </Columns.Column>
            </Columns>
            <Columns breakpoint="tablet">
                <Columns.Column>
                    <Content>
                        <Tag.Group
                            hasAddons
                            display="inline-flex"
                            my={marginTagsY}
                            mx={marginTagsX}
                        >
                            <Tag color="info">
                                {Math.floor(itinerary.duration / 60) !== 0 &&
                                    `${Math.floor(itinerary.duration / 60)}h `}
                                {`${itinerary.duration % 60}min`}
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
                            mx={marginTagsX}
                        >
                            <Tag color="warning">
                                {itinerary.stops || "Non-Stop"}
                            </Tag>
                            <Tag>
                                <Icon>
                                    <FontAwesomeIcon icon={faPlaneArrival} />
                                </Icon>
                                <Icon>
                                    <FontAwesomeIcon icon={faPlaneDeparture} />
                                </Icon>
                            </Tag>
                        </Tag.Group>
                        {itinerary.classes.map((c, index) => (
                            <Tag.Group
                                hasAddons
                                key={index}
                                display="inline-flex"
                                my={marginTagsY}
                                mx={marginTagsX}
                            >
                                <Tag color="primary">
                                    {travelClassEnhance(c)}
                                </Tag>
                                <Tag>
                                    <Icon>
                                        <FontAwesomeIcon icon={faStar} />
                                    </Icon>
                                </Tag>
                            </Tag.Group>
                        ))}
                    </Content>
                </Columns.Column>
                <Columns.Column paddingless px={4}>
                    <Media mobile={{ display: "hidden" }}>
                        {itinerary.carriers.map((carrier) => (
                            <Media.Item align="left" key={carrier.carrierCode}>
                                <Image
                                    src={`${API.defaults.baseURL}/metadata/airlines/logo/?filetype=png&height=64&iata=${carrier.carrierCode}&shape=square&width=64`}
                                    size={64}
                                    alt={carrier.carrier}
                                />
                            </Media.Item>
                        ))}
                    </Media>
                    <Content tablet={{ display: "hidden" }}>
                        {itinerary.carriers.map((carrier, index) => (
                            <React.Fragment key={carrier.carrierCode}>
                                <span>{carrier.carrier}</span>
                                {index !== itinerary.carriers.length - 1 &&
                                    " • "}
                            </React.Fragment>
                        ))}
                    </Content>
                </Columns.Column>
            </Columns>
        </>
    );
}
