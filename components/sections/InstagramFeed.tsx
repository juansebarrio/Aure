import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { siteConfig } from "@/lib/site";

/**
 * Feed de Instagram con datos MOCK.
 * TODO(integración): conectar el feed real (Instagram Graph API).
 *   Variables esperadas: INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID.
 *   Reemplazar MOCK_POSTS por la respuesta de la API y los ImagePlaceholder
 *   por <Image> con la media real.
 */
const MOCK_POSTS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  alt: `Publicación ${i + 1}`,
}));

export function InstagramFeed() {
  return (
    <Section background="white">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>Seguinos</Eyebrow>
          <h2 className="mt-5 text-3xl font-medium tracking-display sm:text-4xl">
            @aure en Instagram
          </h2>
        </div>
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-azul underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          Ver perfil →
        </a>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {MOCK_POSTS.map((post) => (
          <li key={post.id}>
            <ImagePlaceholder aspect="aspect-square" label={post.alt} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
