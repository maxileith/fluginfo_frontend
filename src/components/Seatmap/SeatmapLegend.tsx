import { Box, Content, Heading, Table, Tag } from "react-bulma-components";
import { IApiAmenities } from "../../api/interfaces/IApiSeatmap";
import TApiSeatmapGridItem from "../../api/types/TApiSeatmapGridItem";

export interface ISeatmapLegend {
    amenities: IApiAmenities;
    gridItem?: TApiSeatmapGridItem;
}

export default function SeatmapLegend({
    amenities,
    gridItem,
}: ISeatmapLegend): JSX.Element {
    return (
        <>
            <hr />
            <Heading size={4}>Amenities</Heading>
            <Box>
                <Table>
                    <tbody>
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
                        {amenities.entertainment.map((e) => (
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
                    </tbody>
                </Table>
            </Box>
            <hr />
            <Heading size={4}>Seatmap Details</Heading>
            <Box>
                <Content>
                    {gridItem === undefined &&
                        "Select an item of the seatmap to get to known the details."}
                    {gridItem === null &&
                        "The selected section is an aisle to move around the plane."}
                    {gridItem &&
                        gridItem.type === "facility" &&
                        `${gridItem.name} (Facility)`}
                    {gridItem && gridItem.type === "seat" && (
                        <>
                            <strong>Seat {gridItem.number}</strong>
                            {gridItem.available ? (
                                <Tag color="success" ml={2}>
                                    available
                                </Tag>
                            ) : (
                                <Tag color="danger" ml={2}>
                                    not available
                                </Tag>
                            )}
                            <ul>
                                {gridItem.characteristics.map((c) => (
                                    <li key={c}>{c}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </Content>
            </Box>
        </>
    );
}
