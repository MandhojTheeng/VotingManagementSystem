// components/Footer/MainFooter.jsx
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Twitter, Youtube } from "lucide-react";

export default function MainFooter() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Logo & Contact */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/government.jpg"
                alt="Election Commission Nepal"
                width={80}
                height={80}
                className="rounded-lg border-2 border-white/20"
              />
              <div>
                <h3 className="text-2xl font-black">Election Commission</h3>
                <p className="text-blue-300 text-sm font-medium">of Nepal</p>
              </div>
            </div>
            <div className="text-blue-200 text-sm space-y-2">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Kantipath, Kathmandu</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" /> +977-1-4263650</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@election.gov.np</p>
            </div>
          </div>

          {/* Quick Links – Now with Official Government Links */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold mb-6">Government Portals</h3>
            <ul className="space-y-3 text-blue-200">
              <li>
                <Link href="https://nepal.gov.np/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2">
                  <span className="text-blue-400">→</span> Nepal Government Portal
                </Link>
              </li>
              <li>
                <Link href="https://moha.gov.np/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2">
                  <span className="text-blue-400">→</span> Ministry of Home Affairs
                </Link>
              </li>
              <li>
                <Link href="https://mofa.gov.np/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2">
                  <span className="text-blue-400">→</span> Ministry of Foreign Affairs
                </Link>
              </li>
              <li>
                <Link href="https://mof.gov.np/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2">
                  <span className="text-blue-400">→</span> Ministry of Finance
                </Link>
              </li>
              <li>
                <Link href="https://www.govnp.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2">
                  <span className="text-blue-400">→</span> Government Directory
                </Link>
              </li>
              <li>
                <Link href="https://www.nrb.org.np/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2">
                  <span className="text-blue-400">→</span> Nepal Rastra Bank
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3 text-blue-200">
              {["Voter Registration", "Update Information", "Duplicate Voter ID", "Transfer Location", "Check Status"].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2">
                    <span className="text-blue-400">→</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6">Follow Us</h3>
            <div className="flex gap-4 mb-8">
              <a href="#" className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-950 transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-950 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-950 transition-all duration-300">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="text-sm text-blue-200">
              <p className="flex items-center gap-2 mb-2"><Phone className="w-4 h-4" /> 1660-01-55555 (Toll Free)</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@election.gov.np</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center text-center gap-4">
            <div>
              <p className="text-sm font-medium text-blue-200">
                © 2025 Election Commission of Nepal • Government of Nepal
              </p>
              <p className="text-xs text-blue-400 mt-1">
                Designed & Developed by <span className="font-bold text-white">Mandhoj Theeng</span>
              </p>
            </div>
            <div className="flex gap-6 text-sm text-blue-300">
              <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}