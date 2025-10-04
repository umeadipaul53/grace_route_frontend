function SellProperty() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Sell a Property</h1>
      <ol className="list-decimal ml-6 space-y-2 mb-6">
        <li>Fill the property details form</li>
        <li>Upload property photos</li>
        <li>Our team reviews and publishes</li>
        <li>Start receiving offers!</li>
      </ol>
      <form className="grid gap-4 max-w-xl">
        <input placeholder="Property Title" className="p-2 border rounded"/>
        <textarea placeholder="Description" className="p-2 border rounded h-24"></textarea>
        <button className="bg-primary text-white py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
export default SellProperty;