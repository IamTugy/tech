import { Button } from "@/Button/Button";
import { DisplayCard } from "@/Card/Card";
import { Icon } from "@/Icon/Icon";
import React, { useMemo } from "react";
import { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { twJoin } from "tailwind-merge";


export const TechCard = ({
    title,
    Logo,
    onClickMore,
    hrefProps,
    children,
}: {
    title: string;
    Logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    onClickMore?: () => void;
    hrefProps: ComponentProps<"a">;
    children?: React.ReactNode;
}) => {
  const { i18n } = useTranslation();
  const ltr = useMemo(() => i18n.dir(i18n.language) === "ltr", [i18n.dir, i18n.language]);
  return (
  <DisplayCard className="relative bg-slate-700 w-full min-w-72 max-w-96 min-h-[26rem] flex flex-col text-slate-100 group pb-10">
    <header className="flex items-center gap-2 h-16">
      <Logo className="h-full w-fit"/>
      <div className="w-full justify-between flex items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <a className="flex items-center hover:text-blue-300 active:text-blue-400" 
            {...hrefProps}
        >
            <Icon iconName="open_in_new" className="text-xl"/>
        </a>
      </div>
    </header>
    <div dir={i18n.dir(i18n.language)}>
    {children}
    </div>
    <footer className={twJoin("absolute bottom-3" , ltr ? "right-3" : "left-3")}>
      {onClickMore && <Button variant="soft" size="sm" className="rounded-full aspect-square bg-opacity-50"><Icon iconName={ltr ? "arrow_forward" : "arrow_back"}/></Button>}
    </footer>
  </DisplayCard>
)}