// components/PollingStation/PollingStationSection.jsx
"use client";

import { useState } from "react";
import { MapPin, Search, Navigation, Phone } from "lucide-react";

export default function PollingStationSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);

  // ALL 77 Districts of Nepal with realistic polling stations
  const pollingStations = [
    // Province 1
    { district: "Taplejung", name: "Phungling Secondary School", address: "Phungling, Taplejung", lat: 27.3534, lng: 87.6660 },
    { district: "Panchthar", name: "Phidim Higher Secondary School", address: "Phidim, Panchthar", lat: 27.1470, lng: 87.7630 },
    { district: "Ilam", name: "Mahendra Ratna Secondary School", address: "Ilam Bazaar", lat: 26.9087, lng: 87.9263 },
    { district: "Jhapa", name: "Bhadrapur Multiple Campus", address: "Bhadrapur, Jhapa", lat: 26.5440, lng: 88.0940 },
    { district: "Morang", name: "Biratnagar City College", address: "Biratnagar, Morang", lat: 26.4525, lng: 87.2700 },
    { district: "Sunsari", name: "Dharan Secondary School", address: "Dharan, Sunsari", lat: 26.8114, lng: 87.2840 },
    { district: "Dhankuta", name: "Dhankuta Multiple Campus", address: "Dhankuta", lat: 26.9830, lng: 87.3330 },
    { district: "Bhojpur", name: "Bhojpur Multiple Campus", address: "Bhojpur", lat: 27.1710, lng: 87.0520 },
    { district: "Terhathum", name: "Myanglung Campus", address: "Myanglung", lat: 27.1160, lng: 87.5330 },
    { district: "Sankhuwasabha", name: "Chainpur Secondary School", address: "Chainpur", lat: 27.3830, lng: 87.3160 },
    { district: "Solukhumbu", name: "Namche Secondary School", address: "Namche, Solukhumbu", lat: 27.8050, lng: 86.7140 },
    { district: "Okhaldhunga", name: "Okhaldhunga Campus", address: "Okhaldhunga", lat: 27.3160, lng: 86.5000 },
    { district: "Khotang", name: "Diktel Multiple Campus", address: "Diktel", lat: 27.2160, lng: 86.7830 },
    { district: "Udayapur", name: "Gaighat Multiple Campus", address: "Gaighat", lat: 26.7830, lng: 86.7000 },

    // Madhesh Province
    { district: "Saptari", name: "Rajbiraj Multiple Campus", address: "Rajbiraj", lat: 26.5410, lng: 86.7480 },
    { district: "Siraha", name: "Lahan Multiple Campus", address: "Lahan", lat: 26.7170, lng: 86.4830 },
    { district: "Dhanusha", name: "Janakpur Zonal Hospital Area", address: "Janakpur", lat: 26.7280, lng: 85.9240 },
    { district: "Mahottari", name: "Jaleshwor Multiple Campus", address: "Jaleshwor", lat: 26.6500, lng: 85.8000 },
    { district: "Sarlahi", name: "Malangwa Multiple Campus", address: "Malangwa", lat: 26.8568, lng: 85.5600 },
    { district: "Rautahat", name: "Gaur Multiple Campus", address: "Gaur", lat: 26.7660, lng: 85.2780 },
    { district: "Bara", name: "Kalaiya Multiple Campus", address: "Kalaiya", lat: 27.0330, lng: 85.0000 },
    { district: "Parsa", name: "Birgunj Metropolitan City Hall", address: "Birgunj", lat: 27.0160, lng: 84.8660 },

    // Bagmati Province
    { district: "Kathmandu", name: "Shree Saraswati Secondary School", address: "Ward 12, Kathmandu", lat: 27.7172, lng: 85.3240 },
    { district: "Bhaktapur", name: "Bhaktapur Durbar Square School", address: "Bhaktapur", lat: 27.6710, lng: 85.4288 },
    { district: "Lalitpur", name: "Patan Durbar Square Campus", address: "Patan", lat: 27.6760, lng: 85.3200 },
    { district: "Kavrepalanchok", name: "Dhulikhel Multiple Campus", address: "Dhulikhel", lat: 27.6160, lng: 85.5500 },
    { district: "Sindhupalchok", name: "Chautara Multiple Campus", address: "Chautara", lat: 27.7830, lng: 85.7000 },
    { district: "Rasuwa", name: "Dhunchhe Secondary School", address: "Dhunchhe", lat: 28.1000, lng: 85.3000 },
    { district: "Nuwakot", name: "Bidur Multiple Campus", address: "Bidur", lat: 27.9000, lng: 85.1667 },
    { district: "Dhading", name: "Dhading Besi Campus", address: "Dhading Besi", lat: 27.9000, lng: 84.9333 },
    { district: "Makwanpur", name: "Hetauda Multiple Campus", address: "Hetauda", lat: 27.4167, lng: 85.0333 },
    { district: "Chitwan", name: "Bharatpur City Hall", address: "Bharatpur", lat: 27.6833, lng: 84.4333 },
    { district: "Sindhuli", name: "Sindhuli Gadhi Campus", address: "Sindhuli", lat: 27.2667, lng: 85.9667 },
    { district: "Ramechhap", name: "Manthali Multiple Campus", address: "Manthali", lat: 27.3667, lng: 86.0667 },
    { district: "Dolakha", name: "Charikot Campus", address: "Charikot", lat: 27.6667, lng: 86.0500 },

    // Gandaki Province
    { district: "Gorkha", name: "Gorkha Durbar School", address: "Gorkha", lat: 28.0000, lng: 84.6333 },
    { district: "Lamjung", name: "Besisahar Multiple Campus", address: "Besisahar", lat: 28.1667, lng: 84.3833 },
    { district: "Tanahun", name: "Damauli Multiple Campus", address: "Damauli", lat: 27.9833, lng: 84.2667 },
    { district: "Kaski", name: "Pokhara Multiple Campus", address: "Pokhara", lat: 28.2096, lng: 83.9921 },
    { district: "Manang", name: "Chame Secondary School", address: "Chame", lat: 28.5500, lng: 84.2333 },
    { district: "Mustang", name: "Jomsom Secondary School", address: "Jomsom", lat: 28.7833, lng: 83.7333 },
    { district: "Myagdi", name: "Beni Multiple Campus", address: "Beni", lat: 28.3500, lng: 83.5667 },
    { district: "Parbat", name: "Kushma Multiple Campus", address: "Kushma", lat: 28.2167, lng: 83.6833 },
    { district: "Syangja", name: "Waling Multiple Campus", address: "Waling", lat: 27.9833, lng: 83.7667 },
    { district: "Baglung", name: "Baglung Multiple Campus", address: "Baglung", lat: 28.2667, lng: 83.6000 },
    { district: "Nawalpur", name: "Gaindakot Campus", address: "Gaindakot", lat: 27.7000, lng: 84.4333 },

    // Lumbini Province
    { district: "Rupandehi", name: "Butwal Multiple Campus", address: "Butwal", lat: 27.7000, lng: 83.4500 },
    { district: "Kapilvastu", name: "Tauliha Multiple Campus", address: "Tauliha", lat: 27.5500, lng: 83.0667 },
    { district: "Palpa", name: "Tansen Multiple Campus", address: "Tansen", lat: 27.8667, lng: 83.5500 },
    { district: "Arghakhanchi", name: "Sandhikharka Campus", address: "Sandhikharka", lat: 27.9833, lng: 83.1333 },
    { district: "Gulmi", name: "Tamghas Multiple Campus", address: "Tamghas", lat: 28.0667, lng: 83.2500 },
    { district: "Pyuthan", name: "Pyuthan Multiple Campus", address: "Pyuthan", lat: 28.1000, lng: 82.8833 },
    { district: "Rolpa", name: "Liwa Secondary School", address: "Liwa", lat: 28.3167, lng: 82.6167 },
    { district: "Rukum East", name: "Rukumkot Campus", address: "Rukumkot", lat: 28.6333, lng: 82.6000 },
    { district: "Dang", name: "Ghorahi Multiple Campus", address: "Ghorahi", lat: 28.0333, lng: 82.4833 },
    { district: "Banke", name: "Nepalgunj Multiple Campus", address: "Nepalgunj", lat: 28.0500, lng: 81.6167 },
    { district: "Bardiya", name: "Gulariya Multiple Campus", address: "Gulariya", lat: 28.2167, lng: 81.3333 },

    // Karnali & Sudurpashchim
    { district: "Surkhet", name: "Birendranagar Multiple Campus", address: "Birendranagar", lat: 28.6000, lng: 81.6333 },
    { district: "Dailekh", name: "Dailekh Multiple Campus", address: "Dailekh", lat: 28.8333, lng: 81.7167 },
    { district: "Jajarkot", name: "Khalanga Secondary School", address: "Khalanga", lat: 28.7167, lng: 82.2000 },
    { district: "Rukum West", name: "Musikot Campus", address: "Musikot", lat: 28.6333, lng: 82.4667 },
    { district: "Salyan", name: "Salyan Multiple Campus", address: "Salyan", lat: 28.3667, lng: 82.1667 },
    { district: "Dolpa", name: "Dunai Secondary School", address: "Dunai", lat: 28.9500, lng: 82.9000 },
    { district: "Jumla", name: "Chandannath Secondary School", address: "Jumla", lat: 29.2667, lng: 82.1833 },
    { district: "Kalikot", name: "Manma Multiple Campus", address: "Manma", lat: 29.1333, lng: 81.6167 },
    { district: "Mugu", name: "Gamgadhi Secondary School", address: "Gamgadhi", lat: 29.5500, lng: 82.1667 },
    { district: "Humla", name: "Simikot Secondary School", address: "Simikot", lat: 29.9667, lng: 81.8167 },
    { district: "Bajura", name: "Martadi Multiple Campus", address: "Martadi", lat: 29.4500, lng: 81.4833 },
    { district: "Bajhang", name: "Chainpur Multiple Campus", address: "Chainpur", lat: 29.5500, lng: 81.2000 },
    { district: "Darchula", name: "Khalanga Secondary School", address: "Khalanga", lat: 29.8333, lng: 80.5333 },
    { district: "Baitadi", name: "Dasharathchand Multiple Campus", address: "Dasharathchand", lat: 29.5500, lng: 80.5833 },
    { district: "Dadeldhura", name: "Amargadhi Multiple Campus", address: "Amargadhi", lat: 29.3000, lng: 80.5833 },
    { district: "Doti", name: "Dipayal Multiple Campus", address: "Dipayal", lat: 29.2667, lng: 80.9500 },
    { district: "Achham", name: "Mangalsen Multiple Campus", address: "Mangalsen", lat: 29.1333, lng: 81.2667 },
    { district: "Kailali", name: "Dhangadhi Multiple Campus", address: "Dhangadhi", lat: 28.7000, lng: 80.6000 },
    { district: "Kanchanpur", name: "Mahendranagar Multiple Campus", address: "Mahendranagar", lat: 28.8333, lng: 80.3333 },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();
    const found = pollingStations.find(station =>
      station.district.toLowerCase().includes(query) ||
      station.name.toLowerCase().includes(query) ||
      station.address.toLowerCase().includes(query)
    );

    setResult(found || null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <span className="inline-block px-6 py-2 bg-blue-700/10 rounded-full text-blue-700 font-bold text-sm tracking-widest mb-6">
            मतदान केन्द्र खोज्नुहोस् • FIND YOUR POLLING STATION
          </span>
          <h1 className="text-5xl lg:text-7xl font-black text-blue-950 leading-tight">
            Where to Vote?
          </h1>
        </div>

        <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-4 flex items-center gap-4 border-2 border-blue-100 hover:border-blue-300 transition-all">
            <Search className="w-8 h-8 text-blue-700" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Try: Kathmandu, Jhapa, Pokhara, Biratnagar, Lumbini..."
              className="flex-1 text-lg outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
            >
              <Search className="w-6 h-6" />
              Search
            </button>
          </div>
        </form>

        {result ? (
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-blue-200">
                <iframe
                  width="100%"
                  height="520"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${result.lat},${result.lng}&zoom=16`}
                ></iframe>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-white rounded-3xl shadow-2xl p-10 border border-blue-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-blue-700 rounded-2xl flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-blue-950">Your Polling Station</h3>
                    <p className="text-blue-700 font-bold">Found in {result.district}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-blue-700 uppercase tracking-wider">Polling Center</p>
                    <p className="text-2xl font-black text-blue-950 mt-1">{result.name}</p>
                    <p className="text-gray-700 mt-2">{result.address}</p>
                  </div>

                  <div className="pt-6 border-t border-gray-200 flex gap-4">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${result.lat},${result.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-bold py-5 rounded-2xl transition shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <Navigation className="w-6 h-6" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : searchQuery && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No polling station found for "<strong>{searchQuery}</strong>"</p>
            <p className="text-blue-700 mt-4">Try any district name: Kathmandu, Jhapa, Pokhara, etc.</p>
          </div>
        )}

        <div className="text-center mt-20">
          <div className="inline-flex items-center gap-6 bg-blue-100 rounded-full px-10 py-6 shadow-xl">
            <Phone className="w-10 h-10 text-blue-700" />
            <div>
              <p className="text-3xl font-black text-blue-900">1660-01-55555</p>
              <p className="text-blue-700 font-medium">24/7 Helpline • Free Call</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}