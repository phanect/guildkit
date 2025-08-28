import NextLink from "next/link";
import type { ComponentProps, ReactElement } from "react";

type Theme = "none" | "button-deep" | "button-pale" | "linktext";

const getThemeClasses = (theme: Theme): string => {
  const common = "cursor-pointer text-black hover:text-gray-100 no-underline";
  const buttonCommon = "block w-fit rounded-xl py-2 px-3 transition-colors duration-250 disabled:opacity-50 disabled:cursor-not-allowed";

  switch (theme) {
    case "none":
      return common;
    case "linktext":
      return `${ common } underline`;
    case "button-deep":
      return `${ common } ${ buttonCommon } text-white bg-gray-800 hover:bg-gray-600`;
    case "button-pale":
    default:
      return `${ common } ${ buttonCommon } text-black bg-gray-300 hover:bg-gray-400`;
  }
};

type LinkProps = ComponentProps<typeof NextLink> & {
  theme?: Theme;
};

export const Link = ({
  theme = "linktext",
  className,
  children,
  ...props
}: LinkProps): ReactElement => (
  <NextLink
    className={`${ getThemeClasses(theme) } ${ className }`}
    rel="noopener"
    {...props}
  >
    {children}
  </NextLink>
);

type ButtonProps = ComponentProps<"button"> & {
  theme: Theme;
};

export const Button = ({
  theme,
  className,
  children,
  ...props
}: ButtonProps): ReactElement => (
  <button
    className={`${ getThemeClasses(theme) } ${ className }`}
    {...props}
  >
    {children}
  </button>
);
