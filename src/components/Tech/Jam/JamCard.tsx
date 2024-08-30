import { TechCard } from "@/TechCard/TechCard";
import { useTranslation } from "react-i18next";
import JamLogo from "~/assets/jam-logo.svg?react";


export const JamCard = () => {
    const { t } = useTranslation();

    return (
        <TechCard
            title={t("jam.title")}
            Logo={JamLogo}
            hrefProps={{ href: "https://jam.dev/", target: "_blank", rel: "noreferrer" }}
        >
            <p className="whitespace-pre-line text-sm">
                {t("jam.description")}
            </p>
        </TechCard>
    )
}