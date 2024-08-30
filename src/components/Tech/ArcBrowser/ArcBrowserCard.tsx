import { TechCard } from "@/TechCard/TechCard";
import { Trans, useTranslation } from "react-i18next";
import ArcLogo from "~/assets/arc-logo.svg?react";


export const ArcBrowserCard = () => {
    const { t } = useTranslation();

    return (
        <TechCard
            title={t("arcBrowser.title")}
            Logo={ArcLogo}
            hrefProps={{ href: "https://arc.net/", target: "_blank", rel: "noreferrer" }}
        >
            <p className="whitespace-pre-line text-sm">
                <Trans t={t}>arcBrowser.description</Trans>
            </p>
        </TechCard>
    )
}