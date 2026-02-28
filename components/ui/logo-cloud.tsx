import {
  ShieldCheck,
  Award,
  Leaf,
  FlaskConical,
  HeartPulse,
  Microscope,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Partner = {
  name: string;
  icon: React.ReactNode;
};

const partners: Partner[] = [
  { name: "WHO GMP Certified", icon: <ShieldCheck className="h-5 w-5" /> },
  { name: "ISO 9001:2015", icon: <Award className="h-5 w-5" /> },
  { name: "Ayush Approved", icon: <Leaf className="h-5 w-5" /> },
  { name: "FSSAI Certified", icon: <FlaskConical className="h-5 w-5" /> },
  { name: "ISO 13485", icon: <HeartPulse className="h-5 w-5" /> },
  { name: "Lab Tested", icon: <Microscope className="h-5 w-5" /> },
  { name: "GMP Standards", icon: <BadgeCheck className="h-5 w-5" /> },
  { name: "100% Natural", icon: <Sparkles className="h-5 w-5" /> },
];

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-2 md:grid-cols-4 border border-border/40 rounded-xl overflow-hidden",
        className
      )}
      {...props}
    >
      {partners.map((partner, index) => (
        <LogoCard key={partner.name} partner={partner} index={index} />
      ))}
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  partner: Partner;
  index: number;
};

function LogoCard({ partner, index, className, ...props }: LogoCardProps) {
  const isEvenRow = Math.floor(index / 2) % 2 === 0;
  const isEvenCol = index % 2 === 0;
  const isAccented =
    (isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol);

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 px-4 py-7 md:py-8 border-b border-r border-border/30 last:border-r-0 transition-colors hover:bg-primary/5",
        isAccented ? "bg-primary/[0.03]" : "bg-background",
        // Remove right border on last column
        (index + 1) % 4 === 0 && "md:border-r-0",
        (index + 1) % 2 === 0 && "border-r-0 md:border-r",
        // Remove bottom border on last row
        index >= partners.length - 4 && "md:border-b-0",
        index >= partners.length - 2 && "border-b-0",
        className
      )}
      {...props}
    >
      <span className="text-primary">{partner.icon}</span>
      <span className="text-sm font-medium text-foreground/80 select-none">
        {partner.name}
      </span>
    </div>
  );
}
