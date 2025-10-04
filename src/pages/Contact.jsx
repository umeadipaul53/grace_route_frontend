function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form className="grid gap-4 max-w-xl">
        <input placeholder="Your Name" className="p-3 border rounded"/>
        <input type="email" placeholder="Your Email" className="p-3 border rounded"/>
        <textarea placeholder="Message" className="p-3 border rounded h-32"></textarea>
        <button type="submit" className="bg-primary text-white py-2 rounded">Send</button>
      </form>
      <div className="mt-8">
        <iframe title="map" src="https://maps.google.com/maps?q=Lagos&t=&z=13&ie=UTF8&iwloc=&output=embed" className="w-full h-64 border rounded"></iframe>
      </div>
    </div>
  );
}
export default Contact;