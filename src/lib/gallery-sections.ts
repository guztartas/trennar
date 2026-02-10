import { readdir } from 'node:fs/promises';
import path from 'node:path';

const SECTION_CONFIG = [
  {
    id: 'fisioterapia',
    title: 'Fisioterapia',
    description: 'Área de atendimento para avaliação e tratamento individualizado.',
  },
  {
    id: 'pilates',
    title: 'Pilates',
    description: 'Ambiente dedicado ao pilates clínico, mobilidade e fortalecimento.',
  },
  {
    id: 'atendimento',
    title: 'Atendimento',
    description: 'Recepção e estrutura pensadas para um cuidado próximo e humano.',
  },
] as const;

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

export type GallerySection = {
  id: (typeof SECTION_CONFIG)[number]['id'];
  title: string;
  description: string;
  images: string[];
};

const getSectionImages = async (sectionId: GallerySection['id']) => {
  const sectionPath = path.join(
    process.cwd(),
    'public',
    'images',
    'galeria',
    sectionId,
  );

  try {
    const entries = await readdir(sectionPath, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) => IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()))
      .sort((left, right) =>
        left.localeCompare(right, 'pt-BR', { numeric: true, sensitivity: 'base' }),
      )
      .map((fileName) => `/images/galeria/${sectionId}/${fileName}`);
  } catch {
    return [];
  }
};

export const getGallerySections = async (): Promise<GallerySection[]> => {
  const sections = await Promise.all(
    SECTION_CONFIG.map(async (section) => ({
      ...section,
      images: await getSectionImages(section.id),
    })),
  );

  return sections.filter((section) => section.images.length > 0);
};
