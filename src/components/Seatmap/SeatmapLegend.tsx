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
    return <></>;
}
