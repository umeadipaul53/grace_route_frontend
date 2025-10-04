function Achievements() {
  const milestones = [
    { year: 2015, text: "Company founded" },
    { year: 2018, text: "Reached 1000 customers" },
    { year: 2022, text: "Won Best Real Estate Agency Award" }
  ];
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Achievements</h1>
      <ul className="space-y-4">
        {milestones.map((m,i)=>(
          <li key={i} className="p-4 bg-white dark:bg-gray-800 shadow rounded">
            <span className="font-bold">{m.year}</span> - {m.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Achievements;