import TApiTravelClass from "../../../api/types/TApiTravelClass";
import moment from "moment";
import {
    Content,
    Heading,
    Progress,
    Image,
    Tag,
    Icon,
    Container,
    Columns,
    Button,
} from "react-bulma-components";
import API from "../../../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faClock,
    faPlane,
    faRoute,
    faStar,
    faTh,
} from "@fortawesome/free-solid-svg-icons";
import travelClassEnhance from "../../../utils/travelClassEnhance";

export interface IOfferDetailsFlight {
    flightNumber: string;
    carrierCode: string;
    carrier: string;
    duration: number;
    aircraft: string;
    cabin: TApiTravelClass;
    classId: string;
    departureTime: string;
    arrivalTime: string;
    showSeatmap: () => void;
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
    showSeatmap,
}: IOfferDetailsFlight): JSX.Element {
    const marginTagsRight: number = 2;
    const marginTagsY: number = 1;

    const tags = (
        <>
            <Tag.Group
                hasAddons
                display="inline-flex"
                my={marginTagsY}
                mr={marginTagsRight}
            >
                <Tag color="info">
                    {Math.floor(duration / 60) !== 0 &&
                        `${Math.floor(duration / 60)}h `}
                    {`${duration % 60}min`}
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
            <hr style={{ margin: "0 0 .5rem 0" }} />
            <Button
                color="link"
                onClick={showSeatmap}
                type="button"
                size="small"
                colorVariant="light"
            >
                <span>Seatmap</span>
                <Icon ml={1}>
                    <FontAwesomeIcon icon={faTh} />
                </Icon>
            </Button>
        </>
    );

    return (
        <>
            <Content textAlign="center" mobile={{ display: "hidden" }}>
                <Image
                    src={`${API.defaults.baseURL}/metadata/airlines/logo/?filetype=png&height=64&iata=${carrierCode}&shape=tail&width=64`}
                    alt={`${carrier} logo`}
                    size={64}
                    style={{
                        margin: "-2.3rem auto 0 auto",
                    }}
                />
                <Container
                    style={{
                        marginTop: "-2.3em",
                        marginBottom: ".25em",
                        width: "200%",
                        marginLeft: "-50%",
                    }}
                >
                    <Tag color="dark">
                        {moment(departureTime).format("h:mm a")}
                    </Tag>
                    <span style={{ width: 85, display: "inline-block" }} />
                    <Tag color="dark">
                        {moment(arrivalTime).format("h:mm a")}
                    </Tag>
                </Container>
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
                {tags}
            </Content>

            <Content textAlign="left" tablet={{ display: "hidden" }}>
                <div
                    style={{
                        borderLeft: "3px solid hsl(0, 0%, 96%)",
                        height: 1000,
                        marginTop: -500,
                        marginBottom: -500,
                        transform: "translateX(23px)",
                        width: 0,
                    }}
                />
                <Columns breakpoint="mobile" vCentered>
                    <Columns.Column narrow p={1}>
                        <Image
                            src={`${API.defaults.baseURL}/metadata/airlines/logo/?filetype=png&height=48&iata=${carrierCode}&shape=square&width=48`}
                            alt={`${carrier} logo`}
                            style={{ width: 48, zIndex: 2 }}
                            mx={2}
                            backgroundColor="white"
                        />
                    </Columns.Column>
                    <Columns.Column>
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
                            <Tag color="dark">
                                {moment(departureTime).format("h:mm a")}
                            </Tag>
                            <Tag>
                                <Icon>
                                    <FontAwesomeIcon icon={faRoute} />
                                </Icon>
                            </Tag>
                            <Tag color="dark">
                                {moment(arrivalTime).format("h:mm a")}
                            </Tag>
                        </Tag.Group>
                        <br />
                        {tags}
                    </Columns.Column>
                </Columns>
            </Content>
        </>
    );
}
