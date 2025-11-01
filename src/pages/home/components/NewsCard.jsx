import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-fade";
import { getNews } from "../../../reducers/newsReducer";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from "dompurify";

const NewsCard = () => {
  const dispatch = useDispatch();
  const { loading, items } = useSelector((state) => state.news);

  function truncateHTML(html, limit = 300) {
    const clean = DOMPurify.sanitize(html || "");
    if (!clean) return "";

    // parse sanitized HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(clean, "text/html");

    let cur = 0;
    const outParts = [];

    // walk node tree and append until limit reached
    function walk(node) {
      if (cur >= limit) return;

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        const remaining = limit - cur;
        if (text.length <= remaining) {
          outParts.push(text);
          cur += text.length;
        } else {
          outParts.push(text.slice(0, remaining));
          cur = limit;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();

        // Build start tag with attributes (keep safe: attributes come from sanitized HTML)
        const attrs = Array.from(node.attributes || [])
          .map((a) => ` ${a.name}="${a.value}"`)
          .join("");
        outParts.push(`<${tagName}${attrs}>`);

        // Recurse children
        for (let i = 0; i < node.childNodes.length && cur < limit; i++) {
          walk(node.childNodes[i]);
        }

        outParts.push(`</${tagName}>`);
      }
      // ignore comments, document nodes etc.
    }

    for (let i = 0; i < doc.body.childNodes.length && cur < limit; i++) {
      walk(doc.body.childNodes[i]);
    }

    let result = outParts.join("");
    if (cur >= limit) result = result + "...";

    // final sanitize to ensure nothing dangerous slipped through
    return DOMPurify.sanitize(result);
  }

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Grace Route News
      </h2>

      <Swiper
        modules={[Autoplay, EffectFade]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        className="rounded-2xl overflow-hidden shadow-md"
      >
        {loading ? (
          <p className="text-center py-10">Loading News...</p>
        ) : items?.length === 0 ? (
          <p className="text-center py-10">No news available</p>
        ) : (
          items?.map((news) => (
            <SwiperSlide key={news?._id}>
              <div className="bg-white flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-3/5 w-full">
                  <img
                    src={news?.images?.[0]?.url}
                    alt={news?.images?.[0]?.public_id}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>

                {/* Content with motion */}
                <motion.div
                  className="p-6 md:p-8 flex flex-col justify-center md:w-2/5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  key={news._id} // forces re-animation on slide change
                >
                  <motion.p
                    className="text-sm text-amber-600 font-semibold tracking-wide"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Source: {news.source}
                  </motion.p>

                  <motion.h3
                    className="mt-2 text-2xl md:text-3xl font-bold text-gray-900 leading-snug"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                  >
                    {news.title}
                  </motion.h3>

                  <motion.p
                    className="mt-2 text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                  >
                    Date published: {news.createdAt.split("T")[0]}
                  </motion.p>

                  <motion.p
                    className="mt-4 text-gray-600 text-base leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    dangerouslySetInnerHTML={{
                      __html: truncateHTML(news?.content || "", 400),
                    }}
                  ></motion.p>

                  <motion.a
                    href={`/news-details/${news._id}`}
                    className="mt-6 inline-block text-amber-600 font-medium hover:underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                  >
                    Read Post →
                  </motion.a>
                </motion.div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </section>
  );
};

export default NewsCard;
