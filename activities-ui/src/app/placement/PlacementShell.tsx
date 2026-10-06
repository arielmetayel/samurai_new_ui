"use client";

import { useEffect } from "react";

export default function PlacementShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.classList.add("placementPage");
    body.classList.add("placementPage");
    return () => {
      html.classList.remove("placementPage");
      body.classList.remove("placementPage");
    };
  }, []);

  return <div className={className}>{children}</div>;
}
