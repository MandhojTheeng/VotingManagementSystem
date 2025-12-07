// components/FAQ/FAQSection.jsx
import { HelpCircle, ChevronDown } from "lucide-react";

const faqs = [
  { q: "How secure is online voting?", a: "Our platform uses military-grade encryption, biometric authentication, and blockchain technology to ensure complete security. Every vote is encrypted and stored on a distributed ledger, making tampering virtually impossible." },
  { q: "Can I vote from outside Nepal?", a: "Yes! Non-Resident Nepalese (NRNs) can vote from anywhere in the world. Simply log in with your credentials and cast your vote securely through our platform." },
  { q: "How do I verify my vote was counted?", a: "After voting, you'll receive a unique transaction ID. You can use this ID to verify your vote was recorded in the blockchain without revealing who you voted for." },
  { q: "What if I face technical issues while voting?", a: "Our 24/7 support team is available via phone, email, and live chat. We also provide detailed video tutorials and a comprehensive help center." },
  { q: "Is my vote anonymous?", a: "Absolutely. Your vote choice is completely anonymous and encrypted. No one can link your identity to your vote." },
  { q: "What documents do I need to register?", a: "You need a valid Citizenship Certificate, a recent photograph, and biometric data (fingerprint). Registration can be completed online or at designated centers." },
];

export default function FAQSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header – Clean & Professional */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-6 py-2 bg-blue-700/10 rounded-full text-blue-700 font-bold text-sm mb-4">
            HAVE QUESTIONS?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-blue-950 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Find clear answers to common queries about digital voting
          </p>
        </div>

        {/* Beautiful Accordion – Perfect Text Size */}
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-blue-700 
                         transition-all duration-300 overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 lg:p-8 cursor-pointer list-none">
                <div className="flex items-start gap-4 flex-1">
                  <HelpCircle className="w-6 h-6 text-blue-700 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg sm:text-xl font-bold text-blue-950 group-hover:text-blue-700 transition-colors">
                    {faq.q}
                  </h3>
                </div>
                <ChevronDown className="w-6 h-6 text-blue-700 transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                <div className="pl-10 border-l-4 border-blue-700">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}