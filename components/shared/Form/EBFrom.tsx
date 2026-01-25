"use client";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useCallback,
} from "react";
import { Form } from "antd";
import {
  FormProvider,
  useForm,
  UseFormProps,
  FieldValues,
  Resolver,
} from "react-hook-form";

interface EBFormProps<T extends FieldValues = FieldValues> {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
  defaultValues?: T;
  resolver?: Resolver<T>;
  reset?: boolean;
}

export interface EBFormRef {
  reset: () => void;
}

const EBForm = forwardRef<EBFormRef, EBFormProps>(
  ({ onSubmit, children, defaultValues, resolver, reset }, ref) => {
    // Memoize form config to prevent unnecessary re-initialization
    const formConfig = useMemo<UseFormProps>(() => {
      const config: UseFormProps = {};
      if (defaultValues) {
        config.defaultValues = defaultValues;
      }
      if (resolver) {
        config.resolver = resolver;
      }
      return config;
    }, [defaultValues, resolver]);

    // Initialize the form methods using `useForm`
    const methods = useForm(formConfig);

    // Reset form when defaultValues change
    useEffect(() => {
      if (defaultValues) {
        methods.reset(defaultValues);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValues]);

    // Memoize submit handler
    const submit = useCallback(
      (data: FieldValues) => {
        onSubmit(data as typeof defaultValues);
        if (reset) {
          methods.reset();
        }
      },
      [onSubmit, reset, methods]
    );

    // Expose reset method via ref
    useImperativeHandle(
      ref,
      () => ({
        reset: methods.reset,
      }),
      [methods.reset]
    );

    return (
      <FormProvider {...methods}>
        <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
          {children}
        </Form>
      </FormProvider>
    );
  }
);

EBForm.displayName = "EBForm";

export default EBForm;
