import { Button } from "@/Button/Button";
import { Icon } from "@/Icon/Icon";
import { ArcBrowserCard } from "@/Tech/ArcBrowser/ArcBrowserCard";
import { JamCard } from "@/Tech/Jam/JamCard";
import i18next from "i18next";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { twMerge } from "tailwind-merge";


const LanguageButton = ({
  className,
}: {
  className?: string;
}) => {
  const { i18n } = useTranslation();

  const handleClick = useCallback(() => {
    i18n.language === 'en' ? i18n.changeLanguage('he') : i18n.changeLanguage('en');
  }, [i18n]);

  return (
    <Button variant="ghost" className={twMerge("aspect-square rounded-full", className)} onClick={handleClick}>
      {i18n.language === 'en' ? 'He' : 'En'}
    </Button>
  );
}


export const App = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18next.on('languageChanged', (lng) => {
      document.documentElement.setAttribute('lang', lng);
    })
    document.title = t("site-header");
  }, [i18n, t]);

  const dir = useMemo(() => i18n.dir(i18n.language), [i18n.dir, i18n.language]);

  return (
    <div className="flex flex-col bg-gradient-to-b from-slate-900 to-slate-950 w-screen h-full min-h-screen pt-6 px-4 gap-6">
      <header className="flex gap-4 flex-col sm:flex-row items-center text-slate-50 justify-between px-4">
        <div className="flex w-full sm:w-fit items-center">
          <div className="flex w-full gap-4  items-center">
            <Icon iconName="computer" className="text-3xl"/>
            <h1 className="text-3xl font-bold">{t("site-header")}</h1>
          </div>
          <LanguageButton className="flex sm:hidden"/>
        </div>
        <div className="flex justify-end w-full sm:w-[min(500px,60%)] gap-4">
          {/* <input type="text" placeholder={t("search")} className="w-full p-2 rounded-md bg-slate-800 text-slate-50" dir={dir}/> */}
          <LanguageButton className="hidden sm:flex"/>
        </div>
      </header>
      <div className={"flex flex-center h-full"}>
        <section className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-fit pb-6"}>
          <ArcBrowserCard />
          <JamCard />
        </section>
      </div>
    </div>
  );
};
