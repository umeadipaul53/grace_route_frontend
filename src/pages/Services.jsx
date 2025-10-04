function Services() {
  const services = [
    { title: "Property Buying", desc: "We help you buy your dream property hassle-free." },
    { title: "Property Selling", desc: "Sell your property quickly with our expert marketing." },
    { title: "Property Renting", desc: "Find the perfect rental for your lifestyle." },
    { title: "Consultancy", desc: "Professional advice for all real estate matters." },
    { title: "Valuation", desc: "Get accurate valuations for your property." }
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Our Services</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((s,i)=>(
          <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-2">{s.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Services;