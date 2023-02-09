import { type StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
  ],
  docs: {
    autodocs: true,
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../../../packages/ui/src/**/*.stories.tsx"],
};

export default config;
