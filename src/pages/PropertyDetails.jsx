// src/components/PropertyDetailsPage.jsx
import React, { useState } from "react";

/**
 * PropertyDetailsPage.jsx
 * Plain React + Tailwind CSS (no TypeScript)
 *
 * Single-file implementation that mimics the RE/MAX property details layout
 * with gold accents and a static gallery (thumbnails + main image).
 *
 * Usage:
 *   <PropertyDetailsPage />
 *
 * Notes:
 * - Replace placeholder image URLs in `exampleProperty.images` with your real images.
 * - Tailwind classes assume Tailwind is configured in your project.
 */

export default function PropertyDetails() {
  // --- Example property data (169 Sunset Ln, London, KY) ---
  const property = {
    title: "169 SUNSET LN",
    address: "London, KY 40744",
    price: "$175,000",
    status: "Active",
    beds: 4,
    baths: 3,
    sqft: "2,750",
    lot: "1.04 acres",
    yearBuilt: 1996,
    mls: "25502973",
    description:
      "Welcome to this beautifully maintained home at 169 Sunset Ln. Spacious open-plan living areas, updated kitchen, hardwood floors, and a large private yard. The property offers country living with easy access to town amenities.",
    features: [
      "Open floor plan",
      "Updated kitchen with island",
      "Hardwood floors",
      "Large fenced backyard",
      "Two-car garage",
      "Basement (partially finished)",
    ],
    images: [
      // Replace these with your real images; kept as Unsplash-style placeholders here
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
    ],
    agent: {
      name: "Tracy Saunders",
      office: "CENTURY 21 Advantage Realty",
      phone: "(606) 555-0134",
      email: "tracy@example.com",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80",
    },
    comparables: [
      {
        image:
          "https://images.unsplash.com/photo-1560184897-6c1d1f3c2f3a?w=800&q=80",
        address: "3131 Lily Rd, London, KY",
        price: "$189,000",
        beds: 3,
        baths: 2,
        sqft: "1,656",
      },
      {
        image:
          "https://images.unsplash.com/photo-1572120360610-d971b9b6a3c2?w=800&q=80",
        address: "334 Timberland Cir, Corbin, KY",
        price: "$159,900",
        beds: 3,
        baths: 2,
        sqft: "1,440",
      },
      {
        image:
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
        address: "298 Smith Brewer Rd, London, KY",
        price: "$197,000",
        beds: 3,
        baths: 2,
        sqft: "1,960",
      },
    ],
    history: [
      {
        date: "08/06/2021",
        source: "Public Record",
        detail: "Sold",
        price: "$85,000",
      },
      {
        date: "04/30/2008",
        source: "Public Record",
        detail: "Sold",
        price: "$81,300",
      },
      {
        date: "06/01/1996",
        source: "Public Record",
        detail: "Sold",
        price: "$13,000",
      },
    ],
    neighborhood: {
      summary:
        "Quiet neighborhood with easy access to schools and highways. Friendly community and a short drive to downtown amenities.",
      highlights: [
        {
          icon: "🏫",
          title: "Schools",
          text: "Top-rated elementary within 10 minutes.",
        },
        {
          icon: "🛒",
          title: "Shopping",
          text: "Convenient grocery and retail nearby.",
        },
        {
          icon: "🌳",
          title: "Parks",
          text: "Multiple parks and walking trails.",
        },
      ],
    },
    mapEmbedUrl:
      "https://maps.google.com/maps?q=169%20sunset%20ln%20london%20ky&t=&z=13&ie=UTF8&iwloc=&output=embed",
  };

  // --- Gallery state (static gallery: main image + thumbnails) ---
  const [mainIndex, setMainIndex] = useState(0);
  const mainImage = property.images[mainIndex];

  // --- Simple mortgage estimator state (basic stub) ---
  const [downPercent, setDownPercent] = useState("20");
  const [interest, setInterest] = useState("6.5");
  const [termYears, setTermYears] = useState("30");
  const priceNumber =
    Number(property.price.replace(/[^0-9.-]+/g, "")) || 175000;

  const calcMortgage = () => {
    const down = (Number(downPercent) / 100) * priceNumber;
    const principal = priceNumber - down;
    const r = Number(interest) / 100 / 12;
    const n = Number(termYears) * 12;
    if (r === 0) return (principal / n).toFixed(2);
    const monthly = (principal * r) / (1 - Math.pow(1 + r, -n));
    return monthly.toFixed(0);
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:underline">
            Home
          </a>{" "}
          &nbsp;›&nbsp;
          <a href="/homes" className="hover:underline">
            Homes
          </a>{" "}
          &nbsp;›&nbsp;
          <span>{property.title}</span>
        </div>

        {/* Header: Title / Price / Quick facts */}
        <div className="bg-white rounded-lg shadow px-6 py-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {property.title}
              </h1>
              <div className="text-sm text-slate-500 mt-1">
                {property.address}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium ring-1 ring-amber-100">
                  {property.status}
                </span>
                <div className="text-2xl md:text-3xl font-extrabold text-amber-600">
                  {property.price}
                </div>
                <div className="text-sm text-slate-500">
                  {property.beds} beds • {property.baths} baths •{" "}
                  {property.sqft} sq ft
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200">
                Save
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 text-white shadow hover:bg-amber-700">
                Contact Agent
              </button>
            </div>
          </div>
        </div>

        {/* Main grid: left (gallery + details) and right (sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / Center: gallery + details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="w-full h-[460px] bg-slate-200">
                <img
                  src={mainImage}
                  alt={`Main ${mainIndex}`}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-4 py-3 border-t">
                <div className="flex gap-3 overflow-x-auto">
                  {property.images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setMainIndex(i)}
                      className={`flex-shrink-0 rounded-md overflow-hidden border ${
                        i === mainIndex
                          ? "ring-2 ring-amber-300"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`thumb-${i}`}
                        className="w-36 h-24 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="font-semibold text-lg mb-3">Property Details</h2>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                  <div>
                    <div className="text-xs text-slate-400">Year Built</div>
                    <div className="font-medium">{property.yearBuilt}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Lot Size</div>
                    <div className="font-medium">{property.lot}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">MLS#</div>
                    <div className="font-medium">{property.mls}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Square Ft</div>
                    <div className="font-medium">{property.sqft}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm text-slate-500 mb-2">Features</h3>
                  <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                    {property.features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="font-semibold text-lg mb-3">Description</h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {property.description}
                </p>

                <div className="mt-4">
                  <h3 className="text-sm font-medium text-slate-600 mb-2">
                    Share
                  </h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-2 border rounded text-sm">
                      Email
                    </button>
                    <button className="px-3 py-2 border rounded text-sm">
                      Print
                    </button>
                    <button className="px-3 py-2 border rounded text-sm">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparables */}
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Comparable Listings
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-3">
                {property.comparables.map((c, i) => (
                  <div
                    key={i}
                    className="min-w-[260px] bg-white rounded-lg shadow overflow-hidden"
                  >
                    <img
                      src={c.image}
                      alt={c.address}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <div className="text-sm text-slate-500">{c.address}</div>
                      <div className="font-semibold mt-1">{c.price}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        {c.beds} Beds • {c.baths} Baths • {c.sqft} Sq Ft
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* History & Neighborhood */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-3">Property History</h2>
                <div className="divide-y divide-gray-100 text-sm text-slate-600">
                  {property.history.map((h, i) => (
                    <div
                      key={i}
                      className="py-3 flex justify-between items-start"
                    >
                      <div>
                        <div className="font-medium">{h.date}</div>
                        <div className="text-xs text-slate-400">{h.source}</div>
                      </div>
                      <div className="flex-1 mx-4">{h.detail}</div>
                      <div className="font-semibold">{h.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-3">Neighborhood</h2>
                <p className="text-sm text-slate-700 mb-4">
                  {property.neighborhood.summary}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {property.neighborhood.highlights.map((h, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                        <span className="text-lg">{h.icon}</span>
                      </div>
                      <div>
                        <div className="font-medium">{h.title}</div>
                        <div className="text-xs text-slate-500">{h.text}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <iframe
                    title="map"
                    src={property.mapEmbedUrl}
                    className="w-full h-36 rounded"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex gap-4 items-center">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <div className="text-xs text-slate-400">Listed By</div>
                  <div className="font-semibold">{property.agent.name}</div>
                  <div className="text-xs text-slate-500">
                    {property.agent.office}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <a
                  href={`tel:${property.agent.phone}`}
                  className="block w-full text-center py-3 rounded-lg bg-amber-600 text-white font-medium"
                >
                  Call Agent
                </a>
                <button className="w-full py-2 border rounded-lg text-amber-600 font-medium">
                  Request Showing
                </button>
                <button className="w-full py-2 border rounded-lg text-slate-700">
                  Share Listing
                </button>
              </div>

              <div className="mt-6 text-sm text-slate-600 border-t pt-4">
                <div className="flex justify-between mb-2">
                  <div>Price</div>
                  <div className="font-semibold text-slate-900">
                    {property.price}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>MLS#</div>
                  <div className="text-slate-500">{property.mls}</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Mortgage Estimate</h3>
              <div className="space-y-3 text-sm">
                <input
                  value={downPercent}
                  onChange={(e) => setDownPercent(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  placeholder="Down %"
                />
                <input
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  placeholder="Interest %"
                />
                <input
                  value={termYears}
                  onChange={(e) => setTermYears(e.target.value)}
                  className="w-full border rounded-lg p-2"
                  placeholder="Term (years)"
                />
                <div className="flex gap-2">
                  <div className="flex-1">
                    <div className="text-xs text-slate-500">Est. monthly</div>
                    <div className="text-lg font-semibold">
                      ₦{calcMortgage()}
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-lg">
                    Recalc
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-sm text-slate-500">
              Advertisement / Local services
            </div>
          </aside>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-slate-500 text-center">
          © Your Real Estate Company — All rights reserved
        </div>
      </div>
    </div>
  );
}
