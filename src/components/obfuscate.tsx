"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { decodeContactData } from "@/lib/utils";

export const Obfuscate: FC<{ data: string }> = ({ data }) => {
  const [state, setState] = useState("decoding...");

  useEffect(() => setState(decodeContactData(data)), []);

  return <>{state}</>;
};

export const ObfuscateAnchor: FC<{
  "data-handle": string;
  "data-prefix": string;
  children: ReactNode;
  className?: string;
  href?: string;
}> = ({ children, className, ...rest }) => {
  const [state, setState] = useState("decoding...");

  useEffect(() => setState(decodeContactData(rest["data-handle"])), []);

  return (
    <a href={`${rest["data-prefix"]}${state}`} className={className}>
      {children}
    </a>
  );
};
