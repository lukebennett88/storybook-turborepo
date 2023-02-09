import { type Meta, type StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "./button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    isDisabled: { control: "boolean" },
    isLoading: { control: "boolean" },
    isPressed: { control: "boolean" },
    iconStart: { control: false },
    iconEnd: { control: false },
  },
} satisfies Meta<ButtonProps>;

export const button: StoryObj<ButtonProps> = {
  args: {
    children: "Click me!",
    isDisabled: false,
    isLoading: false,
    isPressed: false,
    loadingLabel: "Busy",
  },
};
