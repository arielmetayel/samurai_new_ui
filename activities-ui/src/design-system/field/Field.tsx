"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { ChevronDown } from "react-feather";
import styles from "./Field.module.css";

export type FieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
};

export function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
  className = "",
}: FieldProps) {
  const hintId = useId();
  const errorId = useId();

  return (
    <div className={`${styles.field} ${className}`.trim()}>
      {label ? (
        <label className={styles.label} htmlFor={htmlFor}>
          {label}
        </label>
      ) : null}
      {children}
      {error ? (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type ControlProps = {
  invalid?: boolean;
  className?: string;
};

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & ControlProps;

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ invalid, className = "", ...props }, ref) {
    return (
      <input
        ref={ref}
        className={`${styles.control} ${invalid ? styles.invalid : ""} ${className}`.trim()}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  }
);

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & ControlProps;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ invalid, className = "", ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={`${styles.control} ${invalid ? styles.invalid : ""} ${className}`.trim()}
        aria-invalid={invalid || undefined}
        {...props}
      />
    );
  }
);

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

function optionsFromChildren(children: React.ReactNode): SelectOption[] {
  return React.Children.toArray(children).flatMap((child) => {
    if (!React.isValidElement(child) || child.type !== "option") return [];
    const props = child.props as React.OptionHTMLAttributes<HTMLOptionElement>;
    const label = String(props.children ?? "");
    const value = props.value != null ? String(props.value) : label;
    return [{ value, label, disabled: Boolean(props.disabled) }];
  });
}

export type SelectProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> &
  ControlProps & {
    options?: SelectOption[];
  };

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  function Select(
    {
      invalid,
      className = "",
      children,
      options,
      value,
      defaultValue,
      onChange,
      disabled,
      id,
      name,
      ...props
    },
    ref
  ) {
    const parsed = useMemo(
      () => options ?? optionsFromChildren(children),
      [options, children]
    );
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState(String(defaultValue ?? ""));
    const selectedValue = isControlled ? String(value) : internal;
    const selected = parsed.find((option) => option.value === selectedValue);
    const placeholder = parsed.find((option) => option.value === "" && option.disabled);
    const [open, setOpen] = useState(false);
    const [menuUp, setMenuUp] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;
      const wrap = wrapRef.current;
      if (wrap) {
        const rect = wrap.getBoundingClientRect();
        setMenuUp(window.innerHeight - rect.bottom < 200 && rect.top > 200);
      }
      const onDoc = (event: MouseEvent) => {
        if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
      };
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("mousedown", onDoc);
        document.removeEventListener("keydown", onKey);
      };
    }, [open]);

    function choose(next: string) {
      if (!isControlled) setInternal(next);
      onChange?.({
        target: { value: next, name: name ?? "" },
      } as React.ChangeEvent<HTMLSelectElement>);
      setOpen(false);
    }

    const visibleOptions = parsed.filter((option) => !(option.value === "" && option.disabled));

    return (
      <div className={styles.selectWrap} ref={wrapRef}>
        <button
          {...props}
          ref={ref}
          type="button"
          id={id}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={invalid || undefined}
          className={`${styles.control} ${styles.selectTrigger} ${invalid ? styles.invalid : ""} ${className}`.trim()}
          onClick={() => !disabled && setOpen((current) => !current)}
        >
          <span className={`${styles.selectValue} ${selected && selected.value !== "" ? "" : styles.placeholder}`}>
            {selected && selected.value !== "" ? selected.label : placeholder?.label ?? "בחירה"}
          </span>
          <span className={styles.chevron}>
            <ChevronDown size={16} />
          </span>
        </button>
        {open ? (
          <ul
            className={`${styles.menu} ${menuUp ? styles.menuUp : ""}`}
            role="listbox"
            aria-labelledby={id}
          >
            {visibleOptions.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  className={`${styles.option} ${option.value === selectedValue ? styles.optionActive : ""}`}
                  aria-selected={option.value === selectedValue}
                  disabled={option.disabled}
                  onClick={() => choose(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
);
