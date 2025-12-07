// app/election-info/page.jsx
import {
  Calendar,
  Users,
  FileText,
  CheckCircle,    // ← Added
  AlertCircle,
  Clock,
  Award,
  Building2
} from "lucide-react";

export const metadata = {
  title: "Election Information • निर्वाचन जानकारी",
  description: "Latest election schedule, voter education, candidate lists, and official notices",
};

export default function ElectionInfoPage() {
  const importantDates = [
    { date: "2081-03-15", event: "Voter Registration Closes", icon: Clock },
    { date: "2081-03-25", event: "Final Voter List Published", icon: Users },
    { date: "2081-04-10", event: "Candidate Nomination Filing", icon: FileText },
    { date: "2081-04-20", event: "Final Candidate List Released", icon: CheckCircle },
    { date: "2081-04-30", event: "Election Day • मतदान दिवस", icon: Building2, highlight: true },
    { date: "2081-05-05", event: "Result Declaration Begins", icon: Award },
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Elegant Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-8 py-3 bg-blue-700/10 rounded-full text-blue-700 font-bold text-sm tracking-widest mb-8">
            ELECTION INFO • निर्वाचन जानकारी
          </span>
          <h1 className="text-6xl lg:text-8xl font-black text-blue-950 leading-tight">
            Election 2081
          </h1>
          <p className="text-2xl text-blue-800 mt-6 font-medium max-w-4xl mx-auto">
            Everything you need to know about Nepal’s upcoming local elections
          </p>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-3xl p-12 lg:p-20 text-white text-center shadow-3xl mb-20">
          <h2 className="text-5xl lg:text-6xl font-black mb-6">Local Level Election 2081</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div>
              <p className="text-blue-200 text-xl font-medium">Election Date</p>
              <p className="text-6xl font-black mt-3">२०८१ वैशाख ३०</p>
              <p className="text-blue-100 text-2xl mt-2">Saturday • May 13, 2025</p>
            </div>
            <div>
              <p className="text-blue-200 text-xl font-medium">Total Voters</p>
              <p className="text-6xl font-black mt-3">1.89 Crore</p>
            </div>
            <div>
              <p className="text-blue-200 text-xl font-medium">Polling Stations</p>
              <p className="text-6xl font-black mt-3">10,927</p>
            </div>
          </div>
        </div>

        {/* Beautiful Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
          {[
            { icon: Calendar, title: "Election Calendar", desc: "Complete timeline of events", link: "#" },
            { icon: Users, title: "Candidate Lists", desc: "Verified candidates by ward", link: "#" },
            { icon: FileText, title: "Election Laws", desc: "Rules, acts & code of conduct", link: "#" },
            { icon: AlertCircle, title: "Voter Education", desc: "How to vote • ID requirements", link: "#" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-3xl border border-blue-100 p-10 text-center transition-all duration-500 hover:-translate-y-6"
              >
                <div className="w-20 h-20 mx-auto mb-8 bg-blue-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-black text-blue-950 mb-4">{item.title}</h3>
                <p className="text-gray-700 mb-8">{item.desc}</p>
                <a
                  href={item.link}
                  className="inline-flex items-center gap-3 text-blue-700 font-bold hover:text-blue-900 transition"
                >
                  View More
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            );
          })}
        </div>

        {/* Important Dates – Vertical Timeline */}
        <div className="max-w-5xl mx-auto mb-24">
          <h3 className="text-4xl lg:text-5xl font-black text-blue-950 text-center mb-16">
            Key Election Dates
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 h-full hidden lg:block"></div>

            <div className="space-y-12">
              {importantDates.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className={`relative flex items-center justify-between lg:justify-normal lg:odd:flex-row-reverse gap-10 ${
                      item.highlight ? "lg:scale-110" : ""
                    }`}
                  >
                    <div className={`w-full lg:w-5/12 ${i % 2 === 0 ? "lg:text-right" : ""}`}>
                      <div
                        className={`inline-block rounded-3xl p-8 shadow-2xl border-4 ${
                          item.highlight
                            ? "bg-blue-700 text-white border-blue-900"
                            : "bg-white text-blue-950 border-blue-200"
                        }`}
                      >
                        <p className="text-3xl font-black">{item.date.split("-")[2]}</p>
                        <p className="text-lg font-bold opacity-90">
                          {item.date.split("-")[1]}/{item.date.split("-")[0]}
                        </p>
                      </div>
                    </div>

                    <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:block">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl ${item.highlight ? "bg-blue-700" : "bg-white border-4 border-blue-700"}`}>
                        <Icon className={`w-7 h-7 ${item.highlight ? "text-white" : "text-blue-700"}`} />
                      </div>
                    </div>

                    <div className={`w-full lg:w-5/12 ${i % 2 === 0 ? "lg:text-right" : ""}`}>
                      <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-100">
                        <h4 className={`text-2xl font-black ${item.highlight ? "text-blue-700" : "text-blue-950"}`}>
                          {item.event}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-3xl px-16 py-12 shadow-3xl">
            <p className="text-4xl lg:text-5xl font-black leading-relaxed">
              Your Vote • Your Future
            </p>
            <p className="text-2xl mt-6 opacity-90">
              तपाईंको मत • तपाईंको भविष्य
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}