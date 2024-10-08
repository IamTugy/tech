import { Button } from "@/Button/Button";
import { DisplayCard } from "@/Card/Card";
import { Icon } from "@/Icon/Icon";
import React, { useMemo } from "react";
import { ComponentProps } from "react";
import { Trans, useTranslation } from "react-i18next";
import { twJoin } from "tailwind-merge";


export const TechCard = ({
    title,
    Logo,
    onClickMore,
    hrefProps,
    description,
}: {
    title: string;
    Logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    onClickMore?: () => void;
    hrefProps: ComponentProps<"a">;
    description?: React.ReactNode;
}) => {
  const { t, i18n } = useTranslation();
  const ltr = useMemo(() => i18n.dir(i18n.language) === "ltr", [i18n.dir, i18n.language]);
  return (
  <DisplayCard className="relative bg-slate-700 place-self-stretch max-w-96 min-h-[26rem] flex flex-col text-slate-100 group pb-10">
    <header className="flex items-center gap-2 h-16">
      <a {...hrefProps} className="h-12" >
        <Logo className="h-full" href=""/>
      </a>
      <div className="flex-1 justify-between flex items-center">
        <h2 className="text-xl font-bold">{t(title)}</h2>
        <a className="items-center hover:text-blue-300 active:text-blue-400" 
            {...hrefProps}
        >
            <Icon iconName="open_in_new" className="text-xl"/>
        </a>
      </div>
    </header>
    <p className="whitespace-pre-line text-sm" dir={i18n.dir(i18n.language)}>
        <Trans t={t}>{description}</Trans>
    </p>
    <footer className={twJoin("absolute bottom-3" , ltr ? "right-3" : "left-3")}>
      {onClickMore && <Button variant="soft" size="sm" className="rounded-full aspect-square bg-opacity-50"><Icon iconName={ltr ? "arrow_forward" : "arrow_back"}/></Button>}
    </footer>
  </DisplayCard>
)}