import PerplexityLogo from "~/assets/perplexity-logo.svg?react";

export const Perplexity = {
    title: "perplexity.title",
    logo: PerplexityLogo,
    description: "perplexity.description",
    hrefProps: { href: "https://perplexity.ai/", target: "_blank", rel: "noreferrer" },
} as const;
