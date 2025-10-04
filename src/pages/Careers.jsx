import { useState } from "react";

function Careers() {
  const [filter, setFilter] = useState("");
  const jobs = [
    { id:1, title: "Frontend Developer", location: "Remote" },
    { id:2, title: "Sales Executive", location: "Lagos" },
    { id:3, title: "Property Consultant", location: "Abuja" }
  ];
  const filtered = jobs.filter(j=>j.title.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Careers</h1>
      <input value={filter} onChange={e=>setFilter(e.target.value)} placeholder="Filter jobs..." className="border rounded p-2 mb-6 w-full"/>
      <ul className="space-y-4">
        {filtered.map(job=>(
          <li key={job.id} className="p-4 bg-white dark:bg-gray-800 shadow rounded">
            <h2 className="font-semibold">{job.title}</h2>
            <p>{job.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Careers;