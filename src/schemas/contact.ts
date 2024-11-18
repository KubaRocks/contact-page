import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  photoUrl: z.string().url().optional(),
  bio: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  bluesky: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  website: z.string().url().optional(),
  location: z.string().optional(),
});

export type Contact = z.infer<typeof contactSchema>;
