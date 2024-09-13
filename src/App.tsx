import { Button } from "@/Button/Button";
import { Icon } from "@/Icon/Icon";
import { ArcBrowser } from "@/Tech/ArcBrowser";
import { Excalidraw } from "@/Tech/Excalidraw";
import { Jam } from "@/Tech/Jam";
import { Perplexity } from "@/Tech/Perplexity";
import { Storybook } from "@/Tech/Storybook";
import { Tailwindcss } from "@/Tech/Tailwindcss";
import { TechCard } from "@/TechCard/TechCard";
import i18next from "i18next";
import { useCallback, useEffect } from "react";
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
    i18next.changeLanguage("en");
  }, []);

  useEffect(() => {
    i18next.on('languageChanged', (lng) => {
      document.documentElement.setAttribute('lang', lng);
    })
    document.title = t("site-header");
  }, [i18n, t]);

  // const dir = useMemo(() => i18n.dir(i18n.language), [i18n.dir, i18n.language]);

  return (
    <div className="flex flex-col bg-gradient-to-b from-slate-900 to-slate-950 w-svw min-h-svh pt-6 px-4 gap-6">
      <header className="flex gap-4 sm:flex-row items-center text-slate-50 justify-between">
        <div className="flex flex-1 sm:w-fit items-center">
          <div className="flex flex-1 gap-4 items-center">
            <Icon iconName="computer" className="text-3xl"/>
            <h1 className="text-3xl font-bold">{t("site-header")}</h1>
          </div>
          <LanguageButton />
        </div>
        {/* <div className="flex justify-end flex-1 sm:w-[min(500px,60%)] gap-4">
          <input type="text" placeholder={t("search")} className="w-full p-2 rounded-md bg-slate-800 text-slate-50" dir={dir}/>
          <LanguageButton className="hidden sm:flex"/>
        </div> */}
      </header>
      <main className={"flex-center"}>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-fit pb-6">
          <TechCard
            title={ArcBrowser.title}
            description={ArcBrowser.description}
            Logo={ArcBrowser.logo}
            hrefProps={ArcBrowser.hrefProps}
          />
          <TechCard 
            title={Jam.title}
            description={Jam.description}
            Logo={Jam.logo}
            hrefProps={Jam.hrefProps}
          />
          <TechCard
            title={Excalidraw.title}
            description={Excalidraw.description}
            Logo={Excalidraw.logo}
            hrefProps={Excalidraw.hrefProps}
          />
          <TechCard
            title={Perplexity.title}
            description={Perplexity.description}
            Logo={Perplexity.logo}
            hrefProps={Perplexity.hrefProps}
          />
          <TechCard
            title={Storybook.title}
            description={Storybook.description}
            Logo={Storybook.logo}
            hrefProps={Storybook.hrefProps}
          />
          <TechCard
            title={Tailwindcss.title}
            description={Tailwindcss.description}
            Logo={Tailwindcss.logo}
            hrefProps={Tailwindcss.hrefProps}
          />
        </section>
      </main>
    </div>
  );
};
