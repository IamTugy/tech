import JamLogo from "~/assets/jam-logo.svg?react";

export const Jam = {
    title: "jam.title",
    logo: JamLogo,
    description: "jam.description",
    hrefProps: { href: "https://jam.dev/", target: "_blank", rel: "noreferrer" },
} as const;
