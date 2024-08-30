import ExcalidrawLogo from "~/assets/excalidraw-logo.svg?react";

export const Excalidraw = {
    title: "excalidraw.title",
    logo: ExcalidrawLogo,
    description: "excalidraw.description",
    hrefProps: { href: "https://excalidraw.com/", target: "_blank", rel: "noreferrer" },
} as const;