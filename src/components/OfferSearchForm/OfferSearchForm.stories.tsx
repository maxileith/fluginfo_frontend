import { ComponentStory, ComponentMeta } from "@storybook/react";
import OfferSearchForm, { IOfferSearchForm } from "./OfferSearchForm";
import moment from "moment";

export default {
    title: "OfferComponents/SearchForm",
    component: OfferSearchForm,
} as ComponentMeta<typeof OfferSearchForm>;

const Template: ComponentStory<typeof OfferSearchForm> = (
    args: IOfferSearchForm
) => <OfferSearchForm {...args} />;

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
    airlineBlacklist: "",
    airlineWhitelist: "",
    airlineListType: "blacklist",
    setAirlineListType: (s) => console.log(`list type: ${s}`),
};
