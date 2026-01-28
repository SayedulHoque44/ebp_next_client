"use client";
import React, { memo } from "react";
import { Form, Input } from "antd";
import { Controller, useFormContext, FieldValues, Path } from "react-hook-form";

interface EBInputProps<T extends FieldValues = FieldValues> {
  type?: string;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
}

const EBInputComponent = <T extends FieldValues = FieldValues>({
  type = "text",
  name,
  label,
  disabled = false,
  placeholder,
}: EBInputProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name as string}
              size="large"
              disabled={disabled}
              placeholder={placeholder}
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
};

EBInputComponent.displayName = "EBInput";

const EBInput = memo(EBInputComponent) as <T extends FieldValues = FieldValues>(
  props: EBInputProps<T>
) => React.ReactElement;

export default EBInput;
