"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { decodeData } from "@/lib/utils";

export const Obfuscate: FC<{ data: string }> = ({ data }) => {
  const [state, setState] = useState("decoding...");

  useEffect(() => setState(decodeData(data)), [data]);

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

  useEffect(() => setState(decodeData(rest["data-handle"])), [rest]);

  return (
    <a href={`${rest["data-prefix"]}${state}`} className={className}>
      {children}
    </a>
  );
};
