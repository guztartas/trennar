import { HomePage } from '@/components/home-page';
import { getGallerySections } from '@/lib/gallery-sections';

export const revalidate = 0;

export default async function Page() {
  const gallerySections = await getGallerySections();

  return <HomePage gallerySections={gallerySections} />;
}
