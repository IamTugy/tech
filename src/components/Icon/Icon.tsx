import { twMerge } from "tailwind-merge";
import { IconTypes } from "./IconTypes";

/**
 *  Refer to https://fonts.google.com/icons?icon.set=Material+Symbols&icon.style=Rounded for extra info about the icons
 *  @param iconName - the name of the icon, copy the icon name from figma
 *  @param className - styling
 * */
export const Icon = ({
  className,
  iconName,
  FILL = 0,
  wght = 400,
  GRAD = 0,
  opsz = 20,
  ...props
}: {
  iconName: IconTypes;
  className?: string;
  FILL?: number;
  wght?: number;
  GRAD?: number;
  opsz?: number;
} & React.ComponentProps<"span">) => (
  <span
    style={{
      fontVariationSettings: `'FILL' ${FILL}, 'wght' ${wght}, 'GRAD' ${GRAD}, 'opsz' ${opsz}`,
    }}
    className={twMerge("material-symbols-rounded align-middle", className)}
    {...props}
  >
    {iconName}
  </span>
);
