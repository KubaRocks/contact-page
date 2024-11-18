import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { decodeContactData, encodeContactData, getInitials } from "@/lib/utils";
import { contactSchema } from "@/schemas/contact";
import { SocialLink } from "@/components/social-link";
import { ContactLink } from "@/components/contact-link";

export async function AnimatedProfileCardComponent() {
  const data = JSON.parse(decodeContactData(process.env.CONTACT as string));
  const contact = contactSchema.parse(data);

  const email = encodeContactData(contact.email);
  const phone = encodeContactData(contact.phone);

  return (
    <div className="min-h-screen w-full bg-left-top bg-gradient-radial from-gray-200 via-stone-300 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-lg ring-8 ring-white/35 border-0">
        <div className="relative h-40 animated-gradient">
          <div className="absolute inset-0 bg-grid-white/25 bg-grid-8" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <CardContent className="relative pt-12 px-6 pb-6 bg-background">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <Avatar className="size-32 border-4 border-background shadow-xl">
              <AvatarImage src={contact.photoUrl} alt={contact.name} />
              <AvatarFallback className="text-4xl font-bold text-gray-300">
                {getInitials(contact.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold">{contact.name}</h2>
            <p className="text-muted-foreground">{contact.title}</p>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            {contact.bio}
          </p>
          <div className="mt-6 space-y-2">
            <SocialLink type="github" handle={contact.github} />
            <SocialLink type="linkedin" handle={contact.linkedin} />
            <SocialLink type="twitter" handle={contact.twitter} />
            <SocialLink type="facebook" handle={contact.facebook} />
            <SocialLink type="instagram" handle={contact.instagram} />
            <SocialLink type="bluesky" handle={contact.bluesky} />
          </div>
          <div className="mt-6 space-y-2">
            <ContactLink type="email" handle={email} obfuscated />
            <ContactLink type="phone" handle={phone} obfuscated />
            <ContactLink type="website" handle={contact.website} />
            <ContactLink type="whatsapp" handle={phone} obfuscated />
            <ContactLink type="location" handle={contact.location} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
