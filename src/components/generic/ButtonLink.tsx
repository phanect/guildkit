"use client";

import NextLink from "next/link";
import { useState, type ComponentProps, type ReactElement } from "react";

type Theme = "none" | "button-deep" | "button-pale" | "linktext";

const getThemeClasses = (theme: Theme): string => {
  const common = "cursor-pointer no-underline";
  const buttonCommon = "block w-fit rounded-xl py-2 px-3 transition-colors duration-250 disabled:opacity-50 disabled:cursor-not-allowed";

  switch (theme) {
    case "none":
      return common;
    case "linktext":
      return `${ common } text-gray-500 hover:text-gray-600 hover:underline`;
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

type ButtonProps = Omit<ComponentProps<"button">, "type" | "onClick"> & {
  theme: Theme;
} & (
  {
    // disallow onClick if type === "submit" | "reset"
    type: "submit" | "reset";
    onClick?: undefined;
  } | {
    type?: Exclude<ComponentProps<"button">["type"], "submit" | "reset">;
    onClick?: ComponentProps<"button">["onClick"];
  }
);

export const Button = ({
  type = "button",
  theme,
  className,
  onClick: onClickMain,
  children,
  ...props
}: ButtonProps): ReactElement => {
  const [ isProcessing, setProcessingStatus ] = useState(false);
  const onClick: ComponentProps<"button">["onClick"] | undefined = onClickMain
    ? (...args) => {
      setProcessingStatus(true);

      try {
        onClickMain(...args);
      } finally {
        setProcessingStatus(false);
      }
    }
    : undefined;

  return (
    <button
      type={type}
      className={`${ getThemeClasses(theme) } ${ className }`}
      onClick={onClick}
      disabled={isProcessing}
      {...props}
    >
      {children}
    </button>
  );
};
