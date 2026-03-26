import type { Metadata } from "next";
import { SiteShell } from "../components";

export const metadata: Metadata = {
  title: "Secret",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-snippet": -1,
      "max-image-preview": "none",
      "max-video-preview": -1,
    },
  },
};

export default function SecretPage() {
  return (
    <SiteShell title="Secret">
      <section className="singleCopyBlock secretContent">
        <p>Replace this paragraph with whatever you want to say here.</p>
      </section>
    </SiteShell>
  );
}
