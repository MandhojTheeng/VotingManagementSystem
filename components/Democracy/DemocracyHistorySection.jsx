"use client";

import Image from "next/image";

export default function DemocracyHistorySection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #1d4ed8 1px, transparent 1px),
                             linear-gradient(to bottom, #1d4ed8 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-6 py-2 bg-blue-700/10 rounded-full text-blue-700 font-bold text-sm mb-4 tracking-wider uppercase">
            the glorious history of democracy
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-blue-950 mb-4 leading-tight">
            How Nepal Won Its Freedom
          </h2>
          <p className="text-lg sm:text-xl text-blue-800 max-w-3xl mx-auto font-medium">
            A story of courage, sacrifice, and unity that changed our nation forever
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 sticky top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-2xl p-5 border border-blue-100">
              <Image
                src="/king1.jpg"
                alt="His Majesty King Tribhuvan – Father of Nepali Democracy"
                width={200}
                height={270}
                className="rounded-xl object-cover shadow-lg w-full"
                priority
              />
              <div className="mt-5 text-center">
                <h3 className="text-lg font-black text-blue-950">King Tribhuvan</h3>
                <p className="text-blue-700 font-semibold text-sm">Father of Democracy</p>
                <p className="text-xs text-gray-600 mt-1">7 Falgun 2007 BS</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8 space-y-8">
            {[
              {
                year: "November 1950",
                title: "A King’s Bold Defiance",
                desc: "In a moment that changed history, King Tribhuvan — along with his entire family — walked into the Indian Embassy in Kathmandu and refused to return to the Rana palace. This single act of courage sent shockwaves across Nepal and proved that even the King stood against tyranny.",
              },
              {
                year: "1950–1951",
                title: "The People Rose as One",
                desc: "From the hills of the Himalayas to the plains of the Terai, ordinary Nepalis — farmers, teachers, students, and soldiers — joined the revolution. Led by visionary leaders like B.P. Koirala and Ganesh Man Singh, the Nepali Congress organized both armed resistance and peaceful protests, proving that the people would no longer accept oppression.",
              },
              {
                year: "7 Falgun 2007 BS (18 Feb 1951)",
                title: "Victory of the People",
                desc: "On this historic day, the Rana regime surrendered. After 104 long years of autocratic rule, the people had won. Celebrations erupted across Nepal as citizens realized — for the first time — that their country truly belonged to them.",
              },
              {
                year: "18 February 1951",
                title: "Democracy Was Born",
                desc: "King Tribhuvan returned to a free Nepal and addressed the nation with these immortal words: “From today, the power belongs to the people of Nepal.” With that declaration, Nepal officially became a democratic nation — and a new era of hope began.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-blue-700 
                         transition-all duration-400 p-7 lg:p-9"
              >
                <div className="text-sm font-bold text-blue-950 bg-blue-100 px-5 py-2 rounded-full inline-block mb-4">
                  {item.year}
                </div>
                <h3 className="text-xl lg:text-2xl font-black text-blue-950 mb-4 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Version */}
        <div className="lg:hidden space-y-8">
          <div className="text-center mb-10">
            <Image
              src="/king1.jpg"
              alt="King Tribhuvan"
              width={200}
              height={270}
              className="rounded-xl object-cover shadow-lg mx-auto"
            />
            <h3 className="mt-5 text-2xl font-black text-blue-950">King Tribhuvan</h3>
            <p className="text-blue-700 font-semibold">Father of Democracy</p>
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center mt-20">
          <p className="text-2xl lg:text-3xl font-black text-blue-950 leading-relaxed">
            "Every vote you cast today is a continuation of their dream"
          </p>
          <p className="mt-5 text-lg text-blue-800 font-medium">
            Let us honor their sacrifice — <strong>one vote at a time</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}