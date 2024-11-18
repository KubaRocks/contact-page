export const encodeData = (contactData?: string): string => {
  if (!contactData) {
    return "";
  }

  // Convert the string to Base64
  return Buffer.from(contactData).toString("base64");
};
