import { ComponentStory, ComponentMeta } from "@storybook/react";
import FlightOfferForm, { IFlightOfferForm } from "./FlightOfferForm";
import moment from "moment";

export default {
    title: "FlightOfferForm/Standard",
    component: FlightOfferForm,
} as ComponentMeta<typeof FlightOfferForm>;

const Template: ComponentStory<typeof FlightOfferForm> = (
    args: IFlightOfferForm
) => <FlightOfferForm {...args} />;

export const Standard = Template.bind({});
Standard.args = {
    departureDate: moment().format("YYYY-MM-DD"),
    setDepartureDate: (s) => console.log(`departure date: ${s}`),
    returnDate: "",
    setReturnDate: (s) => console.log(`return date: ${s}`),
    originAirport: "",
    setDestinationAirport: (s) => console.log(`destination airport: ${s}`),
    destinationAirport: "",
    setOriginAirport: (s) => console.log(`origin airport: ${s}`),
    nonStop: true,
    setNonStop: (s) => console.log(`non stop: ${s}`),
    adults: 2,
    setAdults: (s) => console.log(`adults: ${s}`),
    children: 1,
    setChildren: (s) => console.log(`children: ${s}`),
    infants: 0,
    setInfants: (s) => console.log(`infants: ${s}`),
    travelClass: "ECONOMY",
    setTravelClass: (s) => console.log(`travel class: ${s}`),
    setAirlineWhitelist: (s) => console.log(`airline whitelist: ${s}`),
    setAirlineBlacklist: (s) => console.log(`airline blacklist: ${s}`),
    onSearch: () => console.log("search triggered"),
};