import { file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Experience Schema and Collection
const experienceSchema = z.object({
    slug: z.string(),
    title: z.string(),
    company: z.string(),
    url: z.string().url().optional(),
    location: z.string(),
    start: z.string(),
    end: z.string().optional(),
    description: z.array(z.string()),
});

export type Experience = z.infer<typeof experienceSchema>;

const experience = defineCollection({
    loader: file("src/data/experience.yaml"),
    schema: experienceSchema,
});

// Project Schema and Collection

const projectSchema = z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    links: z
        .object({
            github: z.string().optional(),
            youTube: z.string().optional(),
        })
        .optional(),
});

export type Project = z.infer<typeof projectSchema>;

const projects = defineCollection({
    loader: file("src/data/projects.yaml"),
    schema: projectSchema,
});

// Education Schema and Collection
const educationSchema = z.object({
    institution: z.string(),
    url: z.string().url(),
    degree: z.string(),
    field: z.string(),
    start: z.number(),
    end: z.number(),
});

export type Education = z.infer<typeof educationSchema>;

const education = defineCollection({
    loader: file("src/data/education.yaml"),
    schema: educationSchema,
});

const contactsSchema = z.object({
    type: z.union([z.literal("linkedin"), z.literal("github")]),
    url: z.string().url(),
});

const contacts = defineCollection({
    loader: file("src/data/contacts.yaml"),
    schema: contactsSchema,
});

export type Contacts = z.infer<typeof contactsSchema>;

// Export Collections
export const collections = {
    contacts,
    experience,
    projects,
    education,
};
