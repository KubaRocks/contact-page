import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encodeContactData = (contactData?: string): string => {
  if (!contactData) {
    return "";
  }

  // Convert the string to Base64
  return Buffer.from(contactData).toString("base64");
};

export const decodeContactData = (encodedData: string): string => {
  if (!atob) return "";

  // Decode the Base64 string
  return atob(encodedData);
};

export function getInitials(name?: string) {
  if (!name) return "";

  const [firstName, lastName] = name.split(" ");
  return `${firstName.charAt(0)}${lastName ? lastName.charAt(0) : ""}`;
}

export function stripNumber(number: string) {
  return number.replace(/\D/g, "");
}
