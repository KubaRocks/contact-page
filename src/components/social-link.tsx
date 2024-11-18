import { FC, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import BlueSkyIcon from "@svg/bluesky.svg";
import GitHubIcon from "@svg/github.svg";
import FacebookIcon from "@svg/facebook.svg";
import LinkedInIcon from "@svg/linkedin.svg";
import InstagramIcon from "@svg/instagram.svg";
import TwitterIcon from "@svg/twitter.svg";

type SocialMediaType =
  | "github"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "facebook"
  | "bluesky";

interface SocialLinkProps {
  type: SocialMediaType;
  handle: string | null | undefined;
}

const socialMediaMap: Record<
  SocialMediaType,
  { url: string; icon: ReactNode; label: string }
> = {
  github: {
    url: "https://github.com/",
    icon: <GitHubIcon className="size-4" />,
    label: "GitHub",
  },
  linkedin: {
    url: "https://linkedin.com/in/",
    icon: <LinkedInIcon className="size-4" />,
    label: "LinkedIn",
  },
  twitter: {
    url: "https://x.com/",
    icon: <TwitterIcon className="size-4" />,
    label: "Twitter",
  },
  instagram: {
    url: "https://instagram.com/",
    icon: <InstagramIcon className="size-4" />,
    label: "Instagram",
  },
  facebook: {
    url: "https://facebook.com/",
    icon: <FacebookIcon className="size-4" />,
    label: "Facebook",
  },
  bluesky: {
    url: "https://bsky.app/profile/",
    icon: <BlueSkyIcon className="size-4" />,
    label: "Bluesky",
  },
};

export const SocialLink: FC<SocialLinkProps> = ({ type, handle }) => {
  if (!handle) {
    return null;
  }

  const socialMedia = socialMediaMap[type];
  return (
    <a
      href={`${socialMedia.url}${handle}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${type} profile`}
      className="block"
    >
      <Button
        variant="outline"
        className="w-full justify-start hover:bg-muted transition-all duration-300"
      >
        {socialMedia.icon}
        <span className="ml-2 flex-1 text-left">{handle}</span>
        <span className="text-gray-300 text-sm">{socialMedia.label}</span>
      </Button>
    </a>
  );
};
