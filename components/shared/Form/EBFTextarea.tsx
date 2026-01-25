"use client";
import React, { memo, useMemo } from "react";
import { Form } from "antd";
import { Input } from "antd";
import { Controller, useFormContext, FieldValues, Path } from "react-hook-form";

const { TextArea } = Input;

interface EBFTextareaProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
}

const EBFTextarea = (<T extends FieldValues = FieldValues>({
  name,
  label,
  disabled = false,
  placeholder,
  rows = 4,
}: EBFTextareaProps<T>): React.ReactElement => {
  const { control } = useFormContext<T>();
  const defaultPlaceholder = useMemo(
    () => placeholder || `Enter ${label || name} here...`,
    [placeholder, label, name]
  );

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TextArea
              {...field}
              rows={rows}
              disabled={disabled}
              id={name as string}
              size="large"
              placeholder={defaultPlaceholder}
              aria-label={label || (name as string)}
            />
            {error && (
              <small style={{ color: "red" }} role="alert">
                {error.message}
              </small>
            )}
          </Form.Item>
        )}
      />
    </div>
  );
}) as <T extends FieldValues = FieldValues>(
  props: EBFTextareaProps<T>
) => React.ReactElement;

export default EBFTextarea;
