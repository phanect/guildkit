"use client";

import {
  useState,
  useRef,
  type ChangeEventHandler,
  type DragEventHandler,
  type ReactElement,
  type MouseEventHandler,
} from "react";
import Image from "next/image";
import {
  commonClasses,
  errorClasses,
  ErrorMessage,
  FieldHeadings,
  validClasses,
  type CommonFieldProps,
} from "./FieldCommons.tsx";
import { Button } from "../ButtonLink.tsx";
import type { ZodType } from "zod";

type Props = CommonFieldProps & {
  validator?: ZodType;
  accept?: string;
  maxSizeMiB?: number;
};

export const UploadField = ({
  label,
  description,
  required = false,
  name,
  validator,
  accept = "image/*",
  maxSizeMiB = 5,
  className,
  ...formProps
}: Props): ReactElement => {
  const [ errorMessage, setErrorMessage ] = useState<string>("");
  const [ preview, setPreview ] = useState<string | null>(null);
  const [ isDragOver, setIsDragOver ] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) {
      setPreview(null);
      setErrorMessage("");
      return;
    }

    const file = files[0];

    if (validator) {
      const { success, error } = validator.safeParse(file);
      if (!success) {
        setErrorMessage(error.issues[0].message);
        setPreview(null);
        return;
      }
    }

    setErrorMessage("");

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (evt) =>
    handleFileChange(evt.target.files);

  const onDragOver: DragEventHandler<HTMLDivElement> = (evt) => {
    evt.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave: DragEventHandler<HTMLDivElement> = (evt) => {
    evt.preventDefault();
    setIsDragOver(false);
  };

  const onDrop: DragEventHandler<HTMLDivElement> = (evt) => {
    evt.preventDefault();
    setIsDragOver(false);
    handleFileChange(evt.dataTransfer.files);
  };

  const onClearImageButtonClicked: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.stopPropagation();
    setPreview(null);
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      <FieldHeadings
        label={label}
        description={description}
        required={required}
        name={name}
      />

      <div
        className={`
          ${ commonClasses }
          ${ errorMessage ? errorClasses : validClasses }
          ${ isDragOver ? "border-blue-500 bg-blue-50" : "" }
          min-h-32 flex flex-col items-center justify-center
          cursor-pointer relative
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          id={name}
          name={name}
          accept={accept}
          onChange={onChange}
          className="hidden"
          {...formProps}
        />

        {preview ? (
          <div className="w-full h-full min-h-32">
            <Image
              src={preview}
              alt="Preview"
              width={300}
              height={200}
              className="max-w-full max-h-48 object-contain mx-auto"
              unoptimized // Since we're using data URLs for preview
            />
            <Button
              theme="none"
              onClick={onClearImageButtonClicked}
              className="absolute top-1 right-1 p-1.5 rounded-full w-fit flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
              aria-label="Remove image"
            >
              <Image src="/vendor/octicons/x.svg" alt="" width={24} height={24} decoding="async" />
            </Button>
          </div>
        ) : (
          <label htmlFor={name} className="text-center py-8 cursor-pointer">
            <div className="text-gray-400 mb-2">
              <Image src="/vendor/tabler/photo-up.svg" alt="" width={48} height={48} decoding="async" />
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-blue-600 hover:text-blue-500">
                Click to upload
              </span> or drop image here.
            </div>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, WebP, GIF, SVG up to {maxSizeMiB}MB
            </p>
          </label>
        )}
      </div>

      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>
    </div>
  );
};
