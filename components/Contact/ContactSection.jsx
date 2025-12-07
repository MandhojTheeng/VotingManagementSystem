// components/Contact/ContactSection.jsx
import { MapPin, Phone, Printer, Mail, Facebook, Twitter } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Minimal & Official Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-black text-blue-950 border-b-4 border-blue-950 inline-block pb-3">
            Contact Us
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT: 100% Official Layout – Clean & Enhanced */}
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-200">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Main Contact */}
              <div>
                <h3 className="text-xl font-black text-blue-950 border-b-4 border-blue-950 pb-2 mb-6 inline-block">
                  Election Commission Nepal
                </h3>
                <div className="space-y-5 text-gray-700">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-950 mt-1 flex-shrink-0" />
                    <span className="leading-relaxed">Kantipath, Kathmandu</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-blue-950 mt-1 flex-shrink-0" />
                    <div>
                      <span className="block leading-relaxed">Phone: (977-1) 5328663</span>
                      <span className="block text-sm">(टोल फ्री 1102)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Printer className="w-6 h-6 text-blue-950 mt-1 flex-shrink-0" />
                    <span className="leading-relaxed">Fax: +977-1-4225580, 4221227</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-blue-950 mt-1 flex-shrink-0" />
                    <span className="leading-relaxed">Email: info@election.gov.np</span>
                  </div>
                  <div className="flex gap-6 mt-8">
                    <a href="#" className="text-blue-950 hover:text-blue-700 transition">
                      <Facebook className="w-8 h-8" />
                    </a>
                    <a href="#" className="text-blue-950 hover:text-blue-700 transition">
                      <Twitter className="w-8 h-8" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Spokespersons */}
              <div className="space-y-8">
                {/* Spokesperson */}
                <div>
                  <h4 className="text-lg font-black text-blue-950 border-b-4 border-blue-950 pb-2 mb-4 inline-block">
                    Spokesperson
                  </h4>
                  <div className="pl-2">
                    <p className="font-semibold text-blue-950">Narayan Prasad Bhattarai</p>
                    <p className="text-sm text-gray-600 mt-1">Phone: —</p>
                    <p className="text-sm text-gray-600">Email: spokesperson@election.gov.np</p>
                  </div>
                </div>

                {/* Assistant Spokesperson 1 */}
                <div>
                  <h4 className="text-lg font-black text-blue-950 border-b-4 border-blue-950 pb-2 mb-4 inline-block">
                    Assistant Spokesperson
                  </h4>
                  <div className="pl-2">
                    <p className="font-semibold text-blue-950">Prakash Neupane</p>
                    <p className="text-sm text-gray-600 mt-1">Phone: 9851321385</p>
                    <p className="text-sm text-gray-600">Email: infoa@election.gov.np</p>
                  </div>
                </div>

                {/* Assistant Spokesperson 2 */}
                <div>
                  <h4 className="text-lg font-black text-blue-950 border-b-4 border-blue-950 pb-2 mb-4 inline-block">
                    Assistant Spokesperson
                  </h4>
                  <div className="pl-2">
                    <p className="font-semibold text-blue-950">Sita Pun Shrees</p>
                    <p className="text-sm text-gray-600 mt-1">Phone: 9743939053</p>
                    <p className="text-sm text-gray-600">Email: ppm@election.gov.np</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form – Clean & Official */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-10 lg:p-12 border border-gray-200">
              <h3 className="text-2xl font-black text-blue-950 border-b-4 border-blue-950 pb-3 mb-10 inline-block">
                Contact Form
              </h3>

              <form className="space-y-8">
                <input
                  type="text"
                  placeholder="name (required) *"
                  className="w-full px-6 py-5 border border-gray-300 rounded-lg focus:border-blue-700 focus:outline-none transition text-base shadow-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="email (required) *"
                  className="w-full px-6 py-5 border border-gray-300 rounded-lg focus:border-blue-700 focus:outline-none transition text-base shadow-sm"
                  required
                />
                <textarea
                  rows={10}
                  placeholder="message (required) *"
                  className="w-full px-6 py-5 border border-gray-300 rounded-lg focus:border-blue-700 focus:outline-none transition resize-none text-base shadow-sm"
                  required
                ></textarea>

                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-blue-950 hover:bg-blue-900 text-white font-black px-16 py-5 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
                  >
                    SEND
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}