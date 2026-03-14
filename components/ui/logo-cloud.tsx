import Image from "next/image";
import { cn } from "@/lib/utils";

type Partner = {
  name: string;
  image: string;
};

const partners: Partner[] = [
  {
    name: "GMP Certified",
    image: "https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/1772255367424-removebg-preview.png",
  },
  {
    name: "Ayush Approved",
    image: "https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/1772256665743.png",
  },
  {
    name: "FSSAI Approved",
    image: "https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/WA_1772256180628-removebg-preview.png",
  },
  {
    name: "Lab Tested",
    image: "https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/Gemini_Generated_Image_t6c8yct6c8yct6c8-removebg-preview.png",
  },
  {
    name: "100% Natural",
    image: "https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/Gemini_Generated_Image_oh6rweoh6rweoh6r-removebg-preview.png",
  },
  {
    name: "No Chemicals",
    image: "https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/Gemini_Generated_Image_c9oloec9oloec9ol.png",
  },
  {
    name: "Trusted Seller",
    image: "https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/Gemini_Generated_Image_ukhv5qukhv5qukhv-removebg-preview.png",
  },
  {
    name: "Formulation by Vaidya",
    image: "https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/Gemini_Generated_Image_gpzntmgpzntmgpzn__1_-removebg-preview.png",
  },
  {
    name: "Decades of Experience",
    image: "https://9gk.22b.myftpupload.com/wp-content/uploads/2026/03/Gemini_Generated_Image_tq67tptq67tptq67-1.png",
  },
];

type LogoCloudProps = React.ComponentProps<"div">;

export function LogoCloud({ className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 border border-border/40 rounded-xl overflow-hidden",
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
  const isAccented = index % 2 === 0;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 px-3 py-5 md:py-6 border-b border-r border-border/30 transition-colors hover:bg-primary/5",
        isAccented ? "bg-primary/[0.03]" : "bg-background",
        // Remove right border on last column (3 cols)
        (index + 1) % 3 === 0 && "border-r-0",
        // Remove bottom border on last row
        index >= partners.length - 3 && "border-b-0",
        className
      )}
      {...props}
    >
      <div className="relative w-12 h-12 md:w-14 md:h-14">
        <Image
          src={partner.image}
          alt={partner.name}
          fill
          className="object-contain"
          sizes="56px"
        />
      </div>
      <span className="text-[11px] md:text-xs font-medium text-foreground/80 select-none text-center leading-tight">
        {partner.name}
      </span>
    </div>
  );
}
