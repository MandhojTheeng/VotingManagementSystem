// components/WhyAndHowSections.jsx
import { Users, ShieldCheck, TrendingUp, Globe, Award, CheckCircle, Fingerprint, Mail, Lock } from "lucide-react";

const features = [
  { icon: Users, title: "Your Voice Shapes Nepal", desc: "Every vote directly influences policies and leadership, ensuring the true will of the Nepali people is reflected.", highlight: "Civic Duty" },
  { icon: ShieldCheck, title: "Protect Democratic Values", desc: "Voting is your constitutional right. Your participation safeguards democracy and keeps power with the people.", highlight: "Constitutional Right" },
  { icon: TrendingUp, title: "Drive National Progress", desc: "Your vote decides education, healthcare, and economic policies that improve lives across Nepal.", highlight: "Nation Building" },
  { icon: Globe, title: "Inclusive Democracy", desc: "Every citizen — including Non-Resident Nepalese — can vote securely from anywhere in the world.", highlight: "Equal Rights" },
  { icon: Award, title: "Accountability & Transparency", desc: "Your vote holds leaders accountable and ensures transparent, corruption-free governance.", highlight: "Good Governance" },
  { icon: CheckCircle, title: "Honor Nepal's Legacy", desc: "Each vote honors the sacrifices made for democracy and strengthens our institutions.", highlight: "Democratic Pride" },
];

const stats = [
  { icon: Users, value: "18M+", label: "Eligible Voters" },
  { icon: Award, value: "75+", label: "Years of Democracy" },
  { icon: CheckCircle, value: "753", label: "Local Governments" },
  { icon: TrendingUp, value: "Rising", label: "Youth Participation" },
];

const workflowSteps = [
  { step: "01", title: "Register & Verify", desc: "One-time secure registration with citizenship & biometrics", icon: Fingerprint },
  { step: "02", title: "Receive Credentials", desc: "Get secure login via SMS, email & app", icon: Mail },
  { step: "03", title: "Vote Securely", desc: "Cast your vote with full encryption", icon: Lock },
  { step: "04", title: "Get Confirmation", desc: "Receive blockchain receipt instantly", icon: CheckCircle },
];

export default function WhyAndHowSections() {
  return (
    <>
      {/* WHY YOUR VOTE MATTERS – Badge Centered + Fully Responsive */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #1d4ed8 1px, transparent 1px),
                             linear-gradient(to bottom, #1d4ed8 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-5 py-2 bg-blue-700/10 rounded-full text-blue-700 font-bold text-xs sm:text-sm tracking-wider mb-4">
              YOUR DEMOCRATIC RESPONSIBILITY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-blue-950 mb-4">
              Why Your Vote Matters
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-800 max-w-3xl mx-auto font-medium">
              Every vote strengthens Nepal's democracy and shapes our shared future
            </p>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {features.map((f, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl border border-blue-100 hover:border-blue-700 
                         transition-all duration-300 group flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <f.icon className="w-9 h-9 text-white" />
                </div>

                {/* Centered Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1.5 bg-blue-950 text-white text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
                    {f.highlight}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="mt-4 text-lg sm:text-xl font-bold text-blue-950 mb-3">
                  {f.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 sm:mt-20 bg-gradient-to-r from-blue-800 to-blue-900 rounded-3xl p-8 sm:p-12 shadow-2xl text-white">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10">Nepal's Democratic Strength</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <s.icon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-blue-200" />
                  <div className="text-3xl sm:text-4xl font-black mb-2">{s.value}</div>
                  <div className="text-sm sm:text-base text-blue-100 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS – Fully Responsive */}
      <section className="py-16 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block px-5 py-2 bg-blue-700/10 rounded-full text-blue-700 font-bold text-xs sm:text-sm tracking-wider mb-4">
              SIMPLE • SECURE • ACCESSIBLE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-blue-950 mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-800 max-w-3xl mx-auto font-medium">
              Four secure steps to cast your vote from anywhere in the world
            </p>
          </div>

          {/* Responsive 1→2→4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {workflowSteps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="relative inline-block mb-8">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl 
                                flex items-center justify-center text-white text-2xl sm:text-3xl font-black shadow-xl 
                                group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>
                </div>
                <step.icon className="w-12 h-12 mx-auto mb-4 text-blue-700" />
                <h3 className="text-lg sm:text-xl font-bold text-blue-950 mb-3">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed px-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12 sm:mt-16">
            <a
              href="/register"
              className="inline-flex items-center gap-3 bg-blue-700 hover:bg-blue-800 text-white font-bold 
                       text-lg sm:text-xl px-10 sm:px-12 py-4 sm:py-5 rounded-xl shadow-xl hover:shadow-2xl 
                       transition-all duration-300"
            >
              Start Registration Now
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}