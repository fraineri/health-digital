import { ReactNode } from "react";

interface ProfileFormSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ProfileFormSection({
  title,
  icon,
  children,
  className = "",
}: ProfileFormSectionProps) {
  return (
    <section className={`py-6 first:pt-2 border-b border-border/40 last:border-0 ${className}`}>
      <h3 className="text-[11px] font-extrabold tracking-[0.18em] text-slate-400 mb-5 uppercase flex items-center gap-2">
        {icon && <span className="text-slate-300">{icon}</span>}
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
