import { forwardRef, useCallback, useRef } from "react";

export type ButtonProps = Pick<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | "aria-controls"
  | "aria-expanded"
  | "aria-haspopup"
  | "children"
  | "className"
  | "id"
  | "onClick"
  | "style"
  | "type"
> & {
  /** The icon to display before the buttons children. */
  iconStart?: React.ReactNode;
  /** The icon to display after the buttons children. */
  iconEnd?: React.ReactNode;
  /** When true, the button will be announced as disabled to screen-readers only. */
  isDisabled?: boolean;
  /** When true, the button will display a loading indicator. */
  isLoading?: boolean;
  /** When true, the button will have aria-pressed set and be styled visually pressed. */
  isPressed?: boolean;
  /** Text to read out to assistive technologies when button is loading. */
  loadingLabel?: string;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      children,
      className,
      style,
      iconStart,
      iconEnd,
      isDisabled,
      isLoading,
      isPressed,
      loadingLabel = "Busy",
      onClick,
      type = "button",
      ...consumerProps
    }: ButtonProps,
    forwardedRef
  ) {
    const internalRef = useRef<HTMLButtonElement>(null);
    const handleOnClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        internalRef.current?.focus();
        if (isLoading) return;
        onClick?.(event);
      },
      [isLoading, onClick]
    );
    return (
      <button
        {...consumerProps}
        aria-disabled={isDisabled || undefined}
        aria-pressed={isPressed}
        className={className}
        onClick={handleOnClick}
        ref={mergeRefs(internalRef, forwardedRef)}
        style={{
          alignItems: "center",
          display: "inline-flex",
          justifyContent: "center",
          paddingBlock: "0.5rem",
          paddingInline: "1rem",
          position: "relative",
          ...style,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            whiteSpace: "nowrap",
            ...(iconStart ? { marginInlineStart: "-0.5rem" } : undefined),
            ...(iconEnd ? { marginInlineEnd: "-0.5rem" } : undefined),
            ...(isLoading
              ? { opacity: 0 }
              : isDisabled
              ? { opacity: 0.5 }
              : undefined),
          }}
        >
          {iconStart && iconStart}
          {children}
          {iconEnd && iconEnd}
        </span>
        <span
          aria-live="assertive"
          style={{
            alignItems: "center",
            display: "inline-flex",
            inset: 0,
            justifyContent: "center",
            pointerEvents: "none",
            position: "absolute",
          }}
        >
          {isLoading && <span>{loadingLabel}</span>}
        </span>
      </button>
    );
  }
);

/**
 * Merges multiple refs into one. Works with either callback or object refs.
 */
function mergeRefs<T>(...refs: React.ForwardedRef<T>[]) {
  return (value: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    }
  };
}
