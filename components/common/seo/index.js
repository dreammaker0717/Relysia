import { NextSeo } from 'next-seo';

export default function Seo({ post }) {
  const { title, slug, sourceUrl } = post;
  return (
    <>
      <NextSeo
        title={title}
        description={`Read more about ${title} on Relysa`}
        canonical= {`https://relysia.com/blog/${slug}`}
        openGraph={{
          type: 'website',
          url: `https://relysia.com/blog/${slug}`,
          title: `${title}`,
          description: `Read more about ${title} on Relysa`,
          locale: 'en_EN',
          site_name: 'Relysia',
          images: [
            {
              url: sourceUrl,
              width: 800,
              height: 600,
              alt: 'Relysia Image',
            },
          ],
        }}
        twitter={{
            handle: '@Relysia_SV',
            site: '@Relysia_SV',
            cardType: 'summary_large_image'
        }}
      />
    </>
  );
}
