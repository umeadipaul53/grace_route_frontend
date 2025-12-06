import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: "https://www.gracerouteltd.com",
  });

  const writeStream = createWriteStream("./public/sitemap.xml");
  sitemap.pipe(writeStream);

  const pages = [
    "/",
    "/about-us",
    "/services",
    "/management",
    "/careers",
    "/contact-us",
    "/property-listing",
    "/news-details",
    "/property-details",
    "/buy",
    "/sell",
    "/estates",
    "/faq",
    "/login",
    "/signup",
    "/forgot-password",
    "/verify-user-account",
    "/my-account",
  ];

  pages.forEach((page) => {
    sitemap.write({ url: page, changefreq: "weekly", priority: 0.8 });
  });

  sitemap.end();

  await streamToPromise(sitemap);
  console.log("✅ Sitemap generated!");
}

generateSitemap();
