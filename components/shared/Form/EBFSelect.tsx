"use client";
import React, { memo, useCallback, useMemo } from "react";
import { Form, Select } from "antd";
import { Controller, useFormContext, FieldValues, Path } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string | number | boolean;
}

interface EBFSelectProps<T extends FieldValues = FieldValues> {
  label?: string;
  name: Path<T>;
  options: SelectOption[];
  disabled?: boolean;
  mode?: "multiple" | "tags";
  defaultValue?: string | number | boolean | (string | number | boolean)[];
  placeholder?: string;
}

const EBFSelect = memo(<T extends FieldValues = FieldValues>({
  label,
  name,
  options,
  disabled = false,
  mode,
  defaultValue,
  placeholder = "Please Select",
}: EBFSelectProps<T>) => {
  const { control } = useFormContext<T>();
  const filterOption = useCallback(
    (input: string, option?: SelectOption) => {
      return (option?.label ?? "")
        .toLowerCase()
        .includes(input.toLowerCase());
    },
    []
  );

  const defaultPlaceholder = useMemo(
    () => placeholder || "Please Select",
    [placeholder]
  );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue as any}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            placeholder={defaultPlaceholder}
            mode={mode}
            filterOption={filterOption}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            disabled={disabled}
            showSearch
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
  );
}) as <T extends FieldValues = FieldValues>(
  props: EBFSelectProps<T>
) => React.ReactElement;

EBFSelect.displayName = "EBFSelect";

export default EBFSelect;
