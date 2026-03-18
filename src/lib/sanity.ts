import { createClient } from '@sanity/client';
import imageUrlBuilder, { type SanityImageSource } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'ub47w8yp',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export interface PortfolioProject {
  _id: string;
  title: string;
  description: string;
  landscapeImage: SanityImageSource;
  portraitImage: SanityImageSource;
  websiteUrl: string;
  order: number;
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  return sanityClient.fetch(
    `*[_type == "portfolioProject"] | order(order asc) {
      _id,
      title,
      description,
      landscapeImage,
      portraitImage,
      websiteUrl,
      order
    }`
  );
}
