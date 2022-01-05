import { ComponentMeta } from "@storybook/react";
import Seatmap from "./Seatmap";

export default {
    title: "Seatmap",
    component: Seatmap,
} as ComponentMeta<typeof Seatmap>;

export const FromOfferDetails = <Seatmap from="offerDetails" />;
export const FromStatus = <Seatmap from="status" />;
