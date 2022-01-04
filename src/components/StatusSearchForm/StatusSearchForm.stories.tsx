import { ComponentStory, ComponentMeta } from "@storybook/react";
import moment from "moment";
import StatusSearchForm, { IStatusSearchForm } from "./StatusSearchForm";

export default {
    title: "StatusSearchForm/Standard",
    component: StatusSearchForm,
} as ComponentMeta<typeof StatusSearchForm>;

const Template: ComponentStory<typeof StatusSearchForm> = (
    args: IStatusSearchForm
) => <StatusSearchForm {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    flightNumber: "",
    setFlightNumber: (s) => console.log(`flightNumber: ${s}`),
    date: moment().format("YYYY-MM-DD"),
    setDate: (s) => console.log(`date: ${s}`),
    onSearch: () => console.log("search triggered"),
};
