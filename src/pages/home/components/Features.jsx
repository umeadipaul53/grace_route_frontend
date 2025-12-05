import React from "react";

const Features = () => {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 mt-12 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold">What we offer</h3>
          <p className="mt-3 text-slate-600">
            Step into a world where your dreams shape our mission. At Grace
            Route, we go beyond selling properties — we create value. From
            personalized consultations and innovative property solutions to
            seamless transactions and strategic investment guidance, we ensure
            your real estate journey is stress-free. Whether you’re buying,
            selling, or investing, we deliver opportunities that guarantee
            exceptional returns. With Grace Route Limited, it’s not just about
            owning a house — it’s about securing a lifetime investment.
          </p>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <li className="bg-white rounded-xl p-4 shadow-sm">
              <h5 className="font-semibold">Real Estate</h5>
              <p className="text-xs text-slate-500 mt-1">
                In keeping to our commitment to excellence, we bring your
                visions to reality, offering a complete turnkey design and
                construction service.
              </p>
            </li>
            <li className="bg-white rounded-xl p-4 shadow-sm">
              <h5 className="font-semibold">Investment</h5>
              <p className="text-xs text-slate-500 mt-1">
                Create the future you desire today. Grace Route provides a
                platform to invest with an expectation of generating profit.
              </p>
            </li>
            <li className="bg-white rounded-xl p-4 shadow-sm">
              <h5 className="font-semibold">Real Estate Consultancy</h5>
              <p className="text-xs text-slate-500 mt-1">
                Grace Route offers expert advice on commercial and real estate
                development projects from start to finish.
              </p>
            </li>
            <li className="bg-white rounded-xl p-4 shadow-sm">
              <h5 className="font-semibold">Property Development</h5>
              <p className="text-xs text-slate-500 mt-1">
                At Grace Route, we develop high-quality projects that meet the
                needs of end users with a focus on luxury and sustainability.
              </p>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://res.cloudinary.com/dtzesgkf0/image/upload/what-we-offer_envmyv.png"
            alt="what-we-offer"
            className="w-full h-96 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

const AnotherFeatures = ({ properties }) => {
  return (
    <section id="listings" className="max-w-7xl mx-auto px-6 mt-10">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Featured listings</h3>
        <a className="text-sm text-indigo-600">View all listings →</a>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((p) => (
          <article
            key={p.id}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute right-3 top-3 bg-white/90 rounded-full p-2 text-red-500">
                ♥
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{p.title}</h4>
                <div className="text-indigo-600 font-semibold">{p.price}</div>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                {p.location} • {p.area}
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                <span>{p.beds} beds</span>
                <span>•</span>
                <span>{p.baths} baths</span>
                <button className="ml-auto text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">
                  Schedule tour
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export { Features, AnotherFeatures };
