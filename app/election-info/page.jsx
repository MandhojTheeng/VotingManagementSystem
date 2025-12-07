import {
  Calendar,
  Users,
  FileText,
  CheckCircle,   
  AlertCircle,
  Clock,
  Award,
  Building2,
  ChevronRight
} from "lucide-react";

import MainFooter from "../../components/Footer/MainFooter";

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
    <>
      <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-block px-8 py-3 bg-blue-700/10 rounded-full text-blue-700 font-bold text-sm tracking-widest mb-6">
              ELECTION INFO • निर्वाचन जानकारी
            </span>
            <h1 className="text-6xl lg:text-8xl font-black text-blue-950 leading-tight">
              Election 2081
            </h1>
            <p className="text-xl lg:text-2xl text-blue-800 mt-6 font-medium max-w-3xl mx-auto">
              Everything you need to know about Nepal’s upcoming local elections
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-2xl p-8 lg:p-12 text-white shadow-xl mb-20">
            <div className="text-center">
              <h2 className="text-3xl lg:text-4xl font-black mb-8">Local Level Election 2081</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <p className="text-blue-200 text-sm lg:text-base font-semibold uppercase tracking-wider">Election Date</p>
                  <p className="text-5xl lg:text-6xl font-black mt-3">30</p>
                  <p className="text-2xl lg:text-3xl font-bold text-blue-100 mt-1">वैशाख २०८१</p>
                  <p className="text-sm lg:text-base text-blue-200 mt-2 opacity-90">Saturday • May 13, 2025</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-200 text-sm lg:text-base font-semibold uppercase tracking-wider">Total Voters</p>
                  <p className="text-5xl lg:text-6xl font-black mt-3">1.89</p>
                  <p className="text-2xl lg:text-3xl font-bold text-blue-100">Crore</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-200 text-sm lg:text-base font-semibold uppercase tracking-wider">Polling Stations</p>
                  <p className="text-5xl lg:text-6xl font-black mt-3">10,927</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Calendar, title: "Election Calendar", desc: "Complete timeline of events" },
              { icon: Users, title: "Candidate Lists", desc: "Verified candidates by ward" },
              { icon: FileText, title: "Election Laws", desc: "Rules, acts & code of conduct" },
              { icon: AlertCircle, title: "Voter Education", desc: "How to vote • ID requirements" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl border border-blue-100 p-7 text-center transition-all duration-300 hover:-translate-y-2">
                  <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-9 h-9 text-white" />
                  </div>
                  <h3 className="text-xl font-black text-blue-950 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                  <a href="#" className="text-blue-700 font-bold text-sm flex items-center justify-center gap-1 hover:gap-2 transition-all">
                    View More <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              );
            })}
          </div>
          <div className="max-w-5xl mx-auto py-16">
            <h3 className="text-4xl lg:text-5xl font-black text-blue-950 text-center mb-20">
              Key Election Dates
            </h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-blue-400 to-transparent h-full hidden lg:block opacity-60"></div>
              <div className="space-y-20">
                {importantDates.map((item, index) => {
                  const Icon = item.icon;
                  const isLeft = index % 2 === 0;

                  return (
                    <div key={index} className="relative group">
                      <div className="hidden lg:flex items-center justify-between">
                        <div className={`w-5/12 ${isLeft ? "text-right" : "opacity-0"}`}>
                          {isLeft && (
                            <div className={`inline-block rounded-2xl px-6 py-5 shadow-xl border-2 transition-all duration-500 group-hover:scale-105 ${
                              item.highlight
                                ? "bg-gradient-to-r from-blue-700 to-indigo-800 text-white border-blue-900 shadow-2xl"
                                : "bg-white text-blue-950 border-blue-300"
                            }`}>
                              <p className="text-4xl font-black leading-none">{item.date.split("-")[2]}</p>
                              <p className="text-sm font-bold opacity-90 mt-1">
                                {item.date.split("-")[1]}/{item.date.split("-")[0]}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="absolute left-1/2 transform -translate-x-1/2">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl ring-8 ring-white transition-all duration-500 group-hover:scale-125 ${
                            item.highlight
                              ? "bg-gradient-to-br from-blue-700 to-indigo-900 ring-blue-100"
                              : "bg-white border-4 border-blue-600"
                          }`}>
                            <Icon className={`w-9 h-9 ${item.highlight ? "text-white" : "text-blue-700"}`} />
                          </div>
                        </div>

                        <div className={`w-5/12 ${!isLeft ? "text-left" : "opacity-0"}`}>
                          {(!isLeft || isLeft) && (
                            <div className="inline-block">
                              <div className="bg-white rounded-2xl px-6 py-5 shadow-xl border-2 border-blue-200">
                                <h4 className={`font-black text-xl leading-tight ${item.highlight ? "text-blue-700" : "text-blue-950"}`}>
                                  {item.event}
                                </h4>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Mobile */}
                      <div className="lg:hidden flex items-center gap-5 px-6 py-4">
                        <div className={`w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center shadow-lg ${
                          item.highlight ? "bg-gradient-to-br from-blue-700 to-indigo-800" : "bg-white border-4 border-blue-600"
                        }`}>
                          <Icon className={`w-8 h-8 ${item.highlight ? "text-white" : "text-blue-700"}`} />
                        </div>
                        <div className="flex-1 bg-white rounded-xl p-4 shadow border border-blue-100">
                          <p className="font-bold text-blue-950 text-lg">{item.event}</p>
                          <p className="text-sm text-gray-600 mt-1 font-medium">
                            {item.date.split("-")[2]} {item.date.split("-")[1]}/{item.date.split("-")[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="text-center mt-12 py-10">
            <p className="text-lg lg:text-xl font-semibold text-blue-900 tracking-wider">
              Your Vote • Your Future
              <span className="mx-4 text-blue-600">|</span>
              तपाईंको मत • तपाईंको भविष्य
            </p>
          </div>

        </div>
      </section>
      <MainFooter />
    </>
  );
}