import { ComponentMeta } from "@storybook/react";
import App from "./App";

export default {
    title: "Application",
    component: App,
} as ComponentMeta<typeof App>;

export const Standard = <App />;
