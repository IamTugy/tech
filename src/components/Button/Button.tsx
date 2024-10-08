import { ComponentProps } from "react";
import { twMerge, type ClassNameValue } from "tailwind-merge";

const variantClassNames = {
    primary: "bg-slate-300 hover:bg-slate-200 text-slate-800 active:bg-slate-100",
    soft: "bg-slate-600 hover:bg-slate-500 active:bg-slate-400",
    outline: "border border-slate-100 hover:bg-slate-600 active:bg-slate-500",
    ghost: "hover:bg-slate-600 active:bg-slate-500",
} as const;

const sizeClassNames = {
    sm: "text-sm font-light py-1 px-2",
    md: "text-base font-normal py-2 px-3",
    lg: "text-lg py-3 px-5 font-normal",
} as const;

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  ...props 
}: ComponentProps<"button"> & { variant?: keyof typeof variantClassNames; size?: keyof typeof sizeClassNames; className?: ClassNameValue }) => {
  return (
    <button className={twMerge("rounded-md flex flex-center", variantClassNames[variant], sizeClassNames[size], className)} {...props}/>
  )
}