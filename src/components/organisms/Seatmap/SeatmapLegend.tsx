import { Box, Content, Heading, Table, Tag } from "react-bulma-components";
import { IApiAmenities } from "../../../api/interfaces/IApiSeatmap";
import TApiSeatmapGridItem from "../../../api/types/TApiSeatmapGridItem";
import AdvancedStickyWrapper from "../../atoms/AdvancedStickyWrapper/AdvancedStickyWrapper";

export interface ISeatmapLegend {
    amenities: IApiAmenities;
    gridItem?: TApiSeatmapGridItem;
}

export default function SeatmapLegend({
    amenities,
    gridItem,
}: ISeatmapLegend): JSX.Element {
    return (
        <AdvancedStickyWrapper>
            <Heading size={4}>Amenities</Heading>
            <Box>
                <Table>
                    <tbody>
                        {amenities.power && (
                            <tr>
                                <th>Power</th>
                                <td>
                                    {amenities.power.type}{" "}
                                    {amenities.power.isChargeable && (
                                        <Tag ml={2} color="warning">
                                            €
                                        </Tag>
                                    )}
                                </td>
                            </tr>
                        )}
                        {amenities.wifi && (
                            <tr>
                                <th>WiFi</th>
                                <td>
                                    {amenities.wifi.type}{" "}
                                    {amenities.wifi.isChargeable && (
                                        <Tag ml={2} color="warning">
                                            €
                                        </Tag>
                                    )}
                                </td>
                            </tr>
                        )}
                        {amenities.entertainment &&
                            amenities.entertainment.map((e) => (
                                <tr key={e.type}>
                                    <th>Entertainment</th>
                                    <td>
                                        {e.type}
                                        {e.isChargeable && (
                                            <Tag ml={2} color="warning">
                                                €
                                            </Tag>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        {amenities.food && (
                            <tr>
                                <th>Food</th>
                                <td>
                                    {amenities.food.type}{" "}
                                    {amenities.food.isChargeable && (
                                        <Tag ml={2} color="warning">
                                            €
                                        </Tag>
                                    )}
                                </td>
                            </tr>
                        )}
                        {amenities.beverage && (
                            <tr>
                                <th>Beverage</th>
                                <td>
                                    {amenities.beverage.type}{" "}
                                    {amenities.beverage.isChargeable && (
                                        <Tag ml={2} color="warning">
                                            €
                                        </Tag>
                                    )}
                                </td>
                            </tr>
                        )}
                        {amenities.seat && (
                            <>
                                <tr>
                                    <th>Legspace</th>
                                    <td>{amenities.seat.legSpace}</td>
                                </tr>
                                <tr>
                                    <th>Seat Tilt</th>
                                    <td>{amenities.seat.tilt}</td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </Table>
                {((amenities.beverage && amenities.beverage.isChargeable) ||
                    (amenities.food && amenities.food.isChargeable) ||
                    (amenities.wifi && amenities.wifi.isChargeable) ||
                    (amenities.power && amenities.power.isChargeable) ||
                    (amenities.entertainment &&
                        amenities.entertainment.filter((e) => e.isChargeable)
                            .length !== 0)) && (
                    <p>
                        <Tag ml={2} color="warning">
                            €
                        </Tag>{" "}
                        Chargeable
                    </p>
                )}
            </Box>
            <hr />
            <Heading size={4}>Seatmap Details</Heading>
            <Box>
                <Content>
                    {gridItem === undefined &&
                        "Select an item of the seatmap to get to known the details."}
                    {gridItem === null &&
                        "The selected section is an aisle to move around the aircraft."}
                    {gridItem && gridItem.type === "facility" && (
                        <>
                            <strong>{gridItem.name}</strong> (Facility)
                        </>
                    )}
                    {gridItem && gridItem.type === "seat" && (
                        <>
                            <strong>Seat {gridItem.number}</strong>
                            {gridItem.available === "AVAILABLE" && (
                                <Tag color="success" ml={2}>
                                    available
                                </Tag>
                            )}
                            {gridItem.available === "OCCUPIED" && (
                                <Tag color="danger" ml={2}>
                                    occupied
                                </Tag>
                            )}
                            {gridItem.available === "BLOCKED" && (
                                <Tag color="warning" ml={2}>
                                    blocked
                                </Tag>
                            )}
                            {gridItem.characteristics && (
                                <ul>
                                    {gridItem.characteristics.map((c) => (
                                        <li key={c}>{c}</li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </Content>
            </Box>
        </AdvancedStickyWrapper>
    );
}
