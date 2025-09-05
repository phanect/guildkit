"use client";

import {
  useState,
  type ChangeEventHandler,
  type ComponentProps,
  type ReactElement,
} from "react";
import { WithContext as TagInput, type Tag } from "react-tag-input";
import type { ZodType } from "zod";

type Props = {
  tags: Tag[];
  label: string;
  description?: string;
  validator?: ZodType;
  className: string;
  required: boolean;
} & ComponentProps<typeof TagInput>;

export const TagField = ({
  tags: initialTags,
  label,
  description,
  required = false,
  name,
  validator,
  className,
  ...formProps
}: Props): ReactElement => {
  const [ tags, setTags ] = useState<Tag[]>(initialTags);
  const [ errorMessage, setErrorMessage ] = useState<string>("");

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (evt) => {
    if (!validator) {
      return;
    }

    const { success, error } = validator.safeParse(evt.target.value);
    if (!success) {
      setErrorMessage(error.message);
    }
  };

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

      <TagInput
        onChange={onChange}

        tags={tags}
        suggestions={suggestions}
        separators={[ SEPARATORS.ENTER, SEPARATORS.COMMA ]}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        onTagUpdate={onTagUpdate}
        inputFieldPosition="bottom"
        editable
        clearAll
        onClearAll={onClearAll}
        maxTags={7}
        {...formProps}
      />

      {errorMessage && (
        <small className="block text-red-600 text-sm mt-1">
          {errorMessage}
        </small>
      )}
    </div>
  );
};
