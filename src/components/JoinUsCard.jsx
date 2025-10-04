export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl shadow-md bg-white ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export default function JoinGraceRouteCard() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Join Grace Route Limited
            </h3>
            <p className="text-sm text-gray-600 max-w-md">
              Learn more about the Grace Route network and how you can be
              empowered in your real estate journey your way.
            </p>
          </div>
          <button className="relative border-2 border-green-950 px-6 py-2 font-semibold text-amber-800 group">
            GET STARTED
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-800 group-hover:w-0 transition-all duration-300"></span>
            <span className="absolute right-0 top-0 h-full w-0.5 bg-gray-800 group-hover:h-0 transition-all duration-300"></span>
          </button>
        </div>
      </div>
    </section>
  );
}
