// components/Contact/ContactSection.jsx
import { MapPin, Phone, Printer, Mail, Facebook, Twitter } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-10 lg:py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-black text-blue-950 border-b-4 border-blue-950 inline-block pb-2">
            Contact Us
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* LEFT: Contact Info */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="grid md:grid-cols-2 gap-6">

              {/* Main Office */}
              <div className="space-y-3.5 text-sm">
                <h3 className="text-base font-black text-blue-950 border-b-4 border-blue-950 pb-1 mb-4 inline-block">
                  Election Commission Nepal
                </h3>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-950 flex-shrink-0" />
                  <span>Kantipath, Kathmandu</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-950 flex-shrink-0" />
                  <div>
                    <span>(977-1) 5328663</span>
                    <span className="text-xs text-gray-500 ml-2">(टोल फ्री ११०२)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Printer className="w-5 h-5 text-blue-950 flex-shrink-0" />
                  <span>Fax: +977-1-4225580</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-950 flex-shrink-0" />
                  <span>info@election.gov.np</span>
                </div>

                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-blue-950 hover:text-blue-700 transition">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-blue-950 hover:text-blue-700 transition">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Spokespersons */}
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-sm font-black text-blue-950 border-b-4 border-blue-950 pb-0.5 mb-2 inline-block">
                    Spokesperson
                  </h4>
                  <p className="font-semibold text-blue-950">Narayan Prasad Bhattarai</p>
                  <p className="text-gray-600">spokesperson@election.gov.np</p>
                </div>

                <div>
                  <h4 className="text-sm font-black text-blue-950 border-b-4 border-blue-950 pb-0.5 mb-2 inline-block">
                    Asst. Spokesperson
                  </h4>
                  <p className="font-semibold text-blue-950">Prakash Neupane</p>
                  <p className="text-gray-600">9851321385 • infoa@election.gov.np</p>
                </div>

                <div>
                  <h4 className="text-sm font-black text-blue-950 border-b-4 border-blue-950 pb-0.5 mb-2 inline-block">
                    Asst. Spokesperson
                  </h4>
                  <p className="font-semibold text-blue-950">Sita Pun Shrees</p>
                  <p className="text-gray-600">9743939053 • ppm@election.gov.np</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
            <h3 className="text-lg font-black text-blue-950 border-b-4 border-blue-950 pb-1.5 mb-6 inline-block">
              Contact Form
            </h3>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-700 focus:outline-none text-sm transition"
                required
              />
              <input
                type="email"
                placeholder="Email *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-700 focus:outline-none text-sm transition"
                required
              />
              <textarea
                rows={5}
                placeholder="Message *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-700 focus:outline-none resize-none text-sm transition"
                required
              />
              <div className="text-right pt-2">
                <button
                  type="submit"
                  className="bg-blue-950 hover:bg-blue-900 text-white font-bold px-9 py-3.5 rounded-lg text-sm shadow-md transition"
                >
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}