import ArcLogo from "~/assets/arc-logo.svg?react";

export const ArcBrowser = {
    title: "arcBrowser.title",
    logo: ArcLogo,
    description: "arcBrowser.description",
    hrefProps: { href: "https://arc.net/", target: "_blank", rel: "noreferrer" },
} as const;