import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Newspaper, Share2 } from "lucide-react";
import DOMPurify from "dompurify";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleNews } from "../reducers/newsReducer";

export default function NewsDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { news, loading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getSingleNews(id));
  }, [dispatch]);

  if (loading || !news) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-gray-500">
        Loading article...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ---------- HERO SECTION ---------- */}
      <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={news?.images?.[0]?.url || ""}
          alt={news?.images?.[0]?.public_id || ""}
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center px-4 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-semibold mb-4 leading-tight"
          >
            {news?.title}
          </motion.h1>
          <div className="flex justify-center items-center gap-4 text-gray-300 text-sm">
            <span className="flex items-center gap-2">
              <Newspaper size={16} /> {news?.source || "Grace Route Limited"}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />{" "}
              {new Date(news?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </section>

      {/* ---------- ARTICLE CONTENT ---------- */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white shadow-sm rounded-2xl p-6 md:p-10 mt-10"
      >
        <article
          className="prose max-w-none prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(news?.content || ""),
          }}
        ></article>

        {/* Share section */}
        <div className="mt-10 flex justify-between items-center border-t pt-6"></div>
      </motion.section>

      {/* ---------- CTA ---------- */}
      <div className="flex justify-center my-12">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
