import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "light" | "outline" | "ghost";

interface ButtonLinkProps
    extends Omit<React.ComponentProps<typeof Link>, "className"> {
    variant?: Variant;
    className?: string;
    children: React.ReactNode;
}

const VARIANTS: Record<Variant, string> = {
    primary: "bg-foreground text-background hover:bg-foreground/90",
    secondary: "bg-accent text-accent-foreground hover:bg-accent/85",
    light: "bg-white text-zinc-900 hover:bg-white/90",
    outline:
        "border border-white/25 text-white hover:bg-white/10 backdrop-blur-sm",
    ghost: "text-foreground hover:bg-black/5 dark:hover:bg-white/10",
};

/**
 * Anchor counterpart to <Button /> for navigation.
 * Keeps the same pill geometry without nesting a button inside a link.
 */
export function ButtonLink({
    variant = "primary",
    className,
    children,
    ...props
}: ButtonLinkProps) {
    return (
        <Link
            className={cn(
                "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight",
                "transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                VARIANTS[variant],
                className
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
