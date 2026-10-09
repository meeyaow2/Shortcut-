import { AiSubnav } from "@/components/ai/Ai";

/** Every AI + Design page shares one secondary navigation, so the section reads as one place. */
export default function AiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="page pt-2">
        <AiSubnav />
      </div>
      {children}
    </>
  );
}
