import StorybookLogo from "~/assets/storybook-logo.svg?react";

export const Storybook = {
    title: "storybook.title",
    logo: StorybookLogo,
    description: "storybook.description",
    hrefProps: { href: "https://storybook.js.org/", target: "_blank", rel: "noreferrer" },
} as const;
