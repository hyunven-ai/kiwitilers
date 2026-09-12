"use client";

import { useEffect } from "react";

interface CustomCodeInjectorProps {
  headTags?: string;
  bodyTags?: string;
}

export default function CustomCodeInjector({ headTags, bodyTags }: CustomCodeInjectorProps) {
  useEffect(() => {
    // Clean up any previously injected elements
    document
      .querySelectorAll(
        "[data-custom-head-script], [data-custom-head-tag], [data-custom-body-script], [data-custom-body-tag]"
      )
      .forEach((el) => el.remove());

    // 1. Inject & Execute Head Tags
    if (headTags && headTags.trim()) {
      const container = document.createElement("div");
      container.innerHTML = headTags.trim();

      Array.from(container.childNodes).forEach((node) => {
        if (node.nodeName.toLowerCase() === "script") {
          const original = node as HTMLScriptElement;
          const script = document.createElement("script");
          Array.from(original.attributes).forEach((attr) => {
            script.setAttribute(attr.name, attr.value);
          });
          script.textContent = original.textContent;
          script.setAttribute("data-custom-head-script", "true");
          document.head.appendChild(script);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = (node as HTMLElement).cloneNode(true) as HTMLElement;
          el.setAttribute("data-custom-head-tag", "true");
          document.head.appendChild(el);
        }
      });
    }

    // 2. Inject & Execute Body Tags
    if (bodyTags && bodyTags.trim()) {
      const container = document.createElement("div");
      container.innerHTML = bodyTags.trim();

      Array.from(container.childNodes).forEach((node) => {
        if (node.nodeName.toLowerCase() === "script") {
          const original = node as HTMLScriptElement;
          const script = document.createElement("script");
          Array.from(original.attributes).forEach((attr) => {
            script.setAttribute(attr.name, attr.value);
          });
          script.textContent = original.textContent;
          script.setAttribute("data-custom-body-script", "true");
          document.body.appendChild(script);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = (node as HTMLElement).cloneNode(true) as HTMLElement;
          el.setAttribute("data-custom-body-tag", "true");
          document.body.appendChild(el);
        }
      });
    }

    return () => {
      document
        .querySelectorAll(
          "[data-custom-head-script], [data-custom-head-tag], [data-custom-body-script], [data-custom-body-tag]"
        )
        .forEach((el) => el.remove());
    };
  }, [headTags, bodyTags]);

  return null;
}
