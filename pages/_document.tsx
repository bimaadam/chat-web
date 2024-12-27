import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Judul Tab */}
        <title>Aplikasi Chat - Terhubung Lebih Mudah</title>

        {/* Meta tags untuk SEO */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Aplikasi Chat - Terhubung dengan orang-orang di seluruh dunia secara mudah dan cepat."
        />
        <meta
          name="keywords"
          content="aplikasi chat, pesan instan, komunikasi real-time, terhubung, chatting"
        />
        <meta name="author" content="Bima Adam" />

        {/* Open Graph (untuk preview media sosial) */}
        <meta property="og:title" content="Aplikasi Chat" />
        <meta
          property="og:description"
          content="Gabung dengan aplikasi chat untuk terhubung dengan teman dan keluarga secara mudah."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://aplikasi-chat-lo.com" />
        <meta property="og:type" content="website" />

        {/* Kartu Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aplikasi Chat" />
        <meta
          name="twitter:description"
          content="Tetap terhubung dengan aplikasi chat yang mudah digunakan."
        />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:creator" content="@username_lo" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Preload Font */}
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Meta tambahan */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <body className="antialiased bg-base text-text">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
