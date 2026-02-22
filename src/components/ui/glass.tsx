import { cn } from "@/lib/utils";

interface GlassProps extends React.HTMLAttributes<HTMLDivElement> {
    intensity?: "light" | "medium" | "heavy";
}

export function Glass({ className, intensity = "medium", children, ...props }: GlassProps) {

    const blurMap = {
        light: "backdrop-blur-sm",
        medium: "backdrop-blur-md",
        heavy: "backdrop-blur-xl",
    };

    return (
        <div
            className={cn(
                "relative rounded-3xl border border-white/20 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden",
                blurMap[intensity],
                className
            )}
            {...props}
        >
            {/* Optional Refraction edge glow */}
            <div className="absolute inset-0 pointer-events-none border border-white/10 mix-blend-overlay rounded-[inherit]" />

            {/* Content wrapper */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
