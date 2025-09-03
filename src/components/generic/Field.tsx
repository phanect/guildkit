"use client";

import type { ComponentProps, HTMLInputTypeAttribute, ReactElement } from "react";

type Props<T extends (HTMLInputTypeAttribute | "textarea")> = {
  type: T;
  label: string;
  description?: string;
  errormsgs?: string[];
} & (
  T extends "textarea"
    ? ComponentProps<T>
    : Omit<ComponentProps<"input">, "type">
);

export const Field = <T extends (HTMLInputTypeAttribute | "textarea")>({
  type,
  label,
  description,
  errormsgs,
  required = false,
  name,
  autoComplete = "on",
  className,
  ...formProps
}: Props<T>): ReactElement<Props<T>> => {
  const errormsg = errormsgs?.join(" ");

  const inputClasses = `
    block w-full px-3 py-3 border rounded-md text-base
    transition-colors duration-150 ease-in-out
    focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-100
    ${ errormsg
        ? "border-red-600 focus:border-red-600 focus:ring-red-100"
        : "border-gray-300 focus:border-blue-500"
    }
  `.trim();

  return (
    <div className={className}>
      <label htmlFor={name} className="block w-full">
        <span className="block font-bold mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </span>
      </label>

      { description && (
        <span className="block text-sm text-gray-500 mb-2">
          {description}
        </span>
      )}

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className={`${ inputClasses } min-h-[100px] resize-y`}
          autoComplete={autoComplete}
          {...formProps as ComponentProps<"textarea">}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className={inputClasses}
          autoComplete={autoComplete}
          {...formProps as ComponentProps<"input">}
        />
      )}

      {errormsg && (
        <small className="block text-red-600 text-sm mt-1">
          {errormsg}
        </small>
      )}
    </div>
  );
};
