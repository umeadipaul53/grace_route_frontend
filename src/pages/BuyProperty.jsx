function BuyProperty() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Buy Property</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {[1,2,3].map(i=>(
          <div key={i} className="p-4 bg-white dark:bg-gray-800 shadow rounded">
            <img src={`https://picsum.photos/400/250?random=${i+10}`} alt="Property" className="rounded mb-3"/>
            <h2 className="font-semibold">Luxury Villa {i}</h2>
            <p>$600,000 · City {i}</p>
            <button className="bg-primary text-white py-1 px-3 rounded mt-2">Schedule a Tour</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BuyProperty;