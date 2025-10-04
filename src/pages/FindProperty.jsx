function FindProperty() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Find a Property</h1>
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <input placeholder="Location" className="p-2 border rounded"/>
        <input placeholder="Price Range" className="p-2 border rounded"/>
        <input placeholder="Property Type" className="p-2 border rounded"/>
        <input placeholder="Bedrooms" className="p-2 border rounded"/>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[1,2,3,4,5,6].map(i=>(
          <div key={i} className="p-4 bg-white dark:bg-gray-800 shadow rounded">
            <img src={`https://picsum.photos/400/250?random=${i}`} alt="Property" className="rounded mb-3"/>
            <h2 className="font-semibold">Property {i}</h2>
            <p>$400,000 · Location {i}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FindProperty;