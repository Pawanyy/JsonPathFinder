import { Helmet } from "react-helmet";

interface SeoComponentProps {
    title: string;
    description: string;
    keywords: string;
    author: string;
    baseUrl: string;
}

export default function SeoComponent({ title, description, keywords, author, baseUrl }: SeoComponentProps) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
            <meta property="og:url" content={baseUrl} />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="canonical" href={baseUrl} />
            <script type="application/ld+json">
                {`
            {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "${title}",
                "description": "${description}",
                "url": "${baseUrl}",
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "Any"
            }
            `}
            </script>
        </Helmet>
    )
}