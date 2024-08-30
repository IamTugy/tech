
import { Button } from "@/Button/Button";
import { DisplayCard } from "@/Card/Card";
import { Icon } from "@/Icon/Icon";
import ArcLogo from "~/assets/arc-logo.svg?react";

const ArcCard = () => (
  <DisplayCard className="bg-slate-700 w-full min-w-72 max-w-96 h-[26rem] flex flex-col text-slate-100 gap-4 group">
    <header className="flex items-center">
      <ArcLogo className="size-16"/>
      <div className="w-full flex flex-center">
      <a className="flex gap-2 items-center hover:text-blue-300 active:text-blue-400 " onClick={(e) => {
        e.stopPropagation();
      }}
      href="https://arc.net/" target="_blank" rel="noreferrer"
      >
        <h2 className="text-xl font-bold">Arc Browser</h2>
        <Icon iconName="open_in_new" className="text-xl"/>
      </a>
      </div>
    </header>
    <p className="whitespace-pre-line text-sm">
      We’re all about pushing boundaries and bringing you new features at the Browser Company. But sometimes, truly amazing features can go unnoticed when you’re shipping so many updates every week.
      That’s why we are highlighting our favorite (not-so-obvious) features in Arc Search, the fastest mobile browser in the market. We’ll explore some of the lesser-known features that help you search smarter, save a few taps, and get the information you want, wherever you are.
    </p>
    <footer className="justify-end items-end h-full hidden group-hover:flex gap-2">
      <Button variant="outline" size="sm">Read More <Icon iconName="north_east"/></Button>
    </footer>
  </DisplayCard>
)


export const App = () => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-slate-900 to-slate-950 w-screen h-full h-min-screen pt-6 px-4 gap-6 ">
      <header className="flex gap-4 flex-col sm:flex-row items-center text-slate-50 justify-between px-4">
        <div className="flex gap-4 ">
          <Icon iconName="computer" className="text-3xl"/>
          <h1 className="text-3xl font-bold">Short Tech</h1>
        </div>
        <input type="text" placeholder="Search" className="w-[min(500px,60%)] p-2 rounded-md bg-slate-800 text-slate-50"/>
      </header>
      <div className="flex flex-center h-full">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-fit pb-6">
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
          <ArcCard />
        </section>
      </div>
    </div>
  );
};
