import { IApiDuration } from "../../api/interfaces/IApiOffer";
import TApiTravelClass from "../../api/types/TApiTravelClass";
import moment from "moment";
import {
    Content,
    Heading,
    Progress,
    Image,
    Tag,
    Icon,
} from "react-bulma-components";
import API from "../../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faPlane, faStar } from "@fortawesome/free-solid-svg-icons";
import travelClassEnhance from "../../utils/travelClassEnhance";

export interface IOfferDetailsFlight {
    flightNumber: string;
    carrierCode: string;
    carrier: string;
    duration: IApiDuration;
    aircraft: string;
    cabin: TApiTravelClass;
    classId: string;
    departureTime: string;
    arrivalTime: string;
}

export default function OfferDetailsFlight({
    flightNumber,
    carrierCode,
    carrier,
    duration,
    aircraft,
    departureTime,
    arrivalTime,
    cabin,
    classId,
}: IOfferDetailsFlight): JSX.Element {
    const marginTagsRight: number = 2;
    const marginTagsY: number = 1;

    return (
        <Content textAlign="center">
            <Image
                src={`${API.defaults.baseURL}/metadata/airlines/logo/?filetype=png&height=64&iata=${carrierCode}&shape=tail&width=64`}
                alt={`${carrier} logo`}
                size={64}
                style={{ margin: "-2.55rem auto -.5rem auto" }}
            />
            <Progress
                style={{
                    marginLeft: "-50%",
                    marginRight: "-50%",
                    width: "200%",
                    height: ".5rem",
                }}
                value={0}
            />
            <Heading size={6}>{flightNumber}</Heading>
            <Heading size={6} subtitle weight="light">
                {carrier}
            </Heading>
            <Tag.Group
                hasAddons
                display="inline-flex"
                my={marginTagsY}
                mr={marginTagsRight}
            >
                <Tag color="info">
                    {duration.hours !== 0 && `${duration.hours}h `}
                    {`${duration.minutes}min`}
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
                <Tag color="primary">
                    {travelClassEnhance(cabin)} ({classId})
                </Tag>
                <Tag>
                    <Icon>
                        <FontAwesomeIcon icon={faStar} />
                    </Icon>
                </Tag>
            </Tag.Group>
            <Tag.Group
                hasAddons
                display="inline-flex"
                my={marginTagsY}
                mr={marginTagsRight}
            >
                <Tag color="warning">{aircraft}</Tag>
                <Tag>
                    <Icon>
                        <FontAwesomeIcon icon={faPlane} />
                    </Icon>
                </Tag>
            </Tag.Group>
        </Content>
    );
}
