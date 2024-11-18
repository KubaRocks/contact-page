import { FC, ReactNode } from "react";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import WhatsAppIcon from "@svg/whatsapp.svg";
import { decodeData, stripNumber } from "@/lib/utils";
import { Obfuscate, ObfuscateAnchor } from "@/components/obfuscate";
import { encodeData } from "@/server/encode";

type ContactType = "email" | "phone" | "whatsapp" | "website" | "location";

interface ContactLinkProps {
  type: ContactType;
  handle: string | null | undefined;
  obfuscated?: boolean;
}

const contactMap: Record<
  ContactType,
  { icon: ReactNode; label: string; href: string }
> = {
  email: {
    icon: <Mail className="size-4 mr-4" />,
    label: "Email",
    href: "mailto:",
  },
  phone: {
    icon: <Phone className="size-4 mr-4" />,
    label: "Phone",
    href: "tel:",
  },
  whatsapp: {
    icon: <WhatsAppIcon className="size-4 mr-4" />,
    label: "WhatsApp",
    href: "https://wa.me/",
  },
  website: {
    icon: <Globe className="size-4 mr-4" />,
    label: "Website",
    href: "",
  },
  location: {
    icon: <MapPin className="size-4 mr-4" />,
    label: "Location",
    href: "",
  },
};

export const ContactLink: FC<ContactLinkProps> = ({
  type,
  handle,
  obfuscated,
}) => {
  if (!handle) {
    return null;
  }

  const contact = contactMap[type];
  const { value, label } = formatData(handle, type, !!obfuscated);
  const Component = obfuscated ? ObfuscateAnchor : "a";

  if (type === "location") {
    return (
      <div className="flex items-center justify-between bg-muted rounded-full py-2 px-4">
        <div className="flex items-center">
          {contact.icon}
          <span className="text-sm">{handle}</span>
        </div>
        <span className="text-xs text-gray-400">{contact.label}</span>
      </div>
    );
  }

  return (
    <Component
      href={!obfuscated ? `${contact.href}${value}` : ""}
      className="flex items-center justify-between bg-muted rounded-full py-2 px-4 hover:bg-gray-200 transition-all duration-300"
      data-handle={encodeData(value)}
      data-prefix={contact.href}
      target="_blank"
    >
      <div className="flex items-center">
        {contact.icon}
        <span className="text-sm">
          {obfuscated ? <Obfuscate data={encodeData(label)} /> : label}
        </span>
      </div>
      <span className="text-xs text-gray-400">{contact.label}</span>
    </Component>
  );
};

function formatData(data: string, type: ContactType, obfuscated: boolean) {
  const isNumber = type === "phone" || type === "whatsapp";

  if (obfuscated) {
    const decodedData = decodeData(data);
    if (isNumber) {
      const number =
        type === "phone"
          ? `+${stripNumber(decodedData)}`
          : stripNumber(decodedData);
      return {
        value: number,
        label: decodedData,
      };
    }

    return {
      value: decodedData,
      label: decodedData,
    };
  }

  return {
    value: isNumber ? stripNumber(data) : data,
    label: data,
  };
}
