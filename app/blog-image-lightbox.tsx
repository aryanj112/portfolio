"use client";

import Image from "next/image";
import { useState } from "react";

type BlogImageLightboxProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function BlogImageLightbox({ src, alt, width, height }: BlogImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" className="blogImageButton" onClick={() => setIsOpen(true)}>
        <Image className="blogInlineImage" src={src} alt={alt} width={width} height={height} />
      </button>

      {isOpen ? (
        <div className="blogLightboxBackdrop blogLightboxBackdropOpen" onClick={() => setIsOpen(false)} role="dialog" aria-modal="true">
          <div className="blogLightboxCard blogLightboxCardOpen" onClick={(event) => event.stopPropagation()}>
            <Image className="blogLightboxImage" src={src} alt={alt} width={width} height={height} />
          </div>
        </div>
      ) : null}
    </>
  );
}
