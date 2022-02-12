module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/preset-create-react-app",
        "@storybook/addon-backgrounds",
        "@storybook/addon-measure",
        "@storybook/addon-outline",
    ],
    framework: "@storybook/react",
    core: {
        builder: "webpack5",
    },
    webpackFinal: async (config, { configType }) => {
        if (configType === "PRODUCTION") {
            config.output.publicPath = "/sb/";
        }
        return config;
    },
    managerWebpack: async (config, { configType }) => {
        if (configType === "PRODUCTION") {
            config.output.publicPath = "/sb/";
        }
        return config;
    },
    staticDirs: ["../public"],
};
