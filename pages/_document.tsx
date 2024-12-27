import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        {/* Judul Tab */}
        <title>Web Chat - Terhubung Lebih Mudah</title>

        {/* Meta Description for SEO */}
        <meta
          name="description"
          content="Website Chat Aman - Terhubung dengan orang-orang di seluruh dunia secara mudah dan cepat."
        />
      </Head>
      <body className="antialiased bg-base text-text">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}