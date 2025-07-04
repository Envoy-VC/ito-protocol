import {
  type ComponentProps,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cva, type VariantProps } from "class-variance-authority";
import {
  AnimatePresence,
  cubicBezier,
  type MotionProps,
  motion,
} from "motion/react";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-medium text-base outline-none transition-all duration-150 ease-out focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[97.5%] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        icon: "size-9 rounded-lg",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
      },
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/85",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
        "duotone-destructive":
          "bg-destructive/[0.125] text-destructive shadow-xs hover:bg-destructive/[0.15] focus-visible:ring-destructive/20",
        "duotone-primary":
          "bg-primary/[0.125] text-primary shadow-xs hover:bg-primary/[0.15] focus-visible:ring-primary/20",
        "duotone-success":
          "bg-success/[0.125] text-success shadow-xs hover:bg-success/[0.15] focus-visible:ring-success/20",
        "duotone-warning":
          "bg-warning/[0.125] text-warning shadow-xs hover:bg-warning/[0.15] focus-visible:ring-warning/20",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        warning:
          "bg-warning text-primary-foreground shadow-xs hover:bg-warning/90 focus-visible:ring-warning/20",
      },
    },
  },
);

type ButtonProps = ComponentProps<"button"> &
  MotionProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    animateKey?: string;
    icon?: ReactNode;
    iconKey?: string;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  animateKey,
  icon,
  iconKey,
  ...props
}: ButtonProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: safe
  useLayoutEffect(() => {
    if (measureRef.current) {
      const { width } = measureRef.current.getBoundingClientRect();
      setWidth(width);
    }
  }, [animateKey]);

  return (
    <motion.button
      animate={{ width: width ?? undefined }}
      className={cn(buttonVariants({ className, size, variant }))}
      data-slot="button"
      initial={false}
      style={{ opacity: width === null ? 0 : 1, width: width ?? "auto" }}
      transition={{ damping: 30, stiffness: 320, type: "spring" }}
      {...props}
    >
      {/* Invisible width measuring element */}
      <div
        className={cn(
          "!pointer-events-none !absolute !whitespace-nowrap !opacity-0",
          buttonVariants({ className, size, variant }),
        )}
        ref={measureRef}
      >
        {icon}
        {children}
      </div>

      <AnimatePresence initial={false} mode="wait">
        {icon && (
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 0, scale: 0 }}
            key={`icon-${iconKey}`}
            transition={{ duration: 0.15, ease: cubicBezier(0.85, 0, 0.15, 1) }}
          >
            {icon}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="-translate-y-[1px]"
          exit={{ opacity: 0, x: -15 }}
          initial={{ opacity: 0, x: 15 }}
          key={animateKey}
          transition={{ duration: 0.2, ease: cubicBezier(0.16, 1, 0.3, 1) }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

export { Button, buttonVariants };
