export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/10 via-transparent to-blue-900/10" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #1d4ed8 1px, transparent 1px),
                           linear-gradient(to bottom, #1d4ed8 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      <div className="absolute top-8 left-8 hidden lg:block">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-700 to-blue-800 opacity-10"></div>
      </div>
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 opacity-10"></div>
      </div>

      <div className="relative text-center max-w-6xl mx-auto z-10">
        
        {/* Animated Voting Icon */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="relative">
            <svg className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36" viewBox="0 0 100 100">
              {/* Ballot box */}
              <rect x="20" y="60" width="60" height="30" rx="3" fill="#1d4ed8" className="drop-shadow-lg"/>
              <rect x="22" y="62" width="56" height="4" fill="white" opacity="0.2"/>
              <rect x="30" y="52" width="40" height="8" rx="2" fill="#1e40af">
                <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite"/>
              </rect>
              
              {/* Animated ballot paper falling */}
              <g className="ballot-paper">
                <rect x="35" y="10" width="30" height="45" rx="2" fill="white" stroke="#1d4ed8" strokeWidth="1.5">
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,0; 0,42; 0,42"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="1;1;0" dur="3s" repeatCount="indefinite"/>
                </rect>
                
                {/* Vote checkmark on paper */}
                <path d="M42 25 L47 32 L58 18" fill="none" stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,0; 0,42; 0,42"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                  <animate attributeName="opacity" values="1;1;0" dur="3s" repeatCount="indefinite"/>
                </path>
              </g>
              
              {/* Success indicator - appears after ballot drops */}
              <circle cx="50" cy="75" r="8" fill="#1d4ed8" opacity="0">
                <animate attributeName="opacity" values="0;0;1;1;0" dur="3s" repeatCount="indefinite"/>
              </circle>
              <path d="M45 75 L48 78 L55 70" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0">
                <animate attributeName="opacity" values="0;0;1;1;0" dur="3s" repeatCount="indefinite"/>
              </path>
              
              {/* Particles effect when ballot enters */}
              <circle cx="30" cy="58" r="2" fill="#1d4ed8" opacity="0">
                <animate attributeName="opacity" values="0;0;0.8;0" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="cx" values="30;25" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="cy" values="58;53" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="70" cy="58" r="2" fill="#1d4ed8" opacity="0">
                <animate attributeName="opacity" values="0;0;0.8;0" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="cx" values="70;75" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="cy" values="58;53" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="50" cy="56" r="2" fill="#1d4ed8" opacity="0">
                <animate attributeName="opacity" values="0;0;0.8;0" dur="3s" repeatCount="indefinite"/>
                <animate attributeName="cy" values="56;50" dur="3s" repeatCount="indefinite"/>
              </circle>
            </svg>
            
            {/* Pulsing ring around icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-2 border-blue-700 opacity-20 animate-ping" style={{animationDuration: '3s'}}></div>
            </div>
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-blue-950 mb-3 sm:mb-4 tracking-tight leading-tight px-4">
          Election Commission Nepal
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-700 mb-6 sm:mb-8 px-4">
          निर्वाचन आयोग नेपाल
        </p>
        
        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 px-4">
          <div className="h-px sm:h-0.5 w-12 sm:w-20 bg-gradient-to-r from-transparent to-blue-700"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-700 rotate-45"></div>
          <div className="h-px sm:h-0.5 w-12 sm:w-20 bg-gradient-to-l from-transparent to-blue-700"></div>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-blue-800 mb-8 sm:mb-12 px-4">
          National Digital Voting Platform
        </p>

        {/* Description with badges */}
        <div className="mb-10 sm:mb-16 px-4">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-md border border-blue-200">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700">Secure Voting</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-md border border-blue-200">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700">100% Transparent</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-md border border-blue-200">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs sm:text-sm md:text-base font-medium text-gray-700">Verified Citizens</span>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 mb-12 sm:mb-16">
          <a
            href="/login"
            className="group bg-blue-700 hover:bg-blue-800 text-white font-bold text-base sm:text-lg md:text-xl px-8 sm:px-12 md:px-16 py-4 sm:py-5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 no-underline"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Voter Login</span>
          </a>

          <a
            href="/register"
            className="group bg-white hover:bg-blue-700 text-blue-700 hover:text-white border-3 border-blue-700 font-bold text-base sm:text-lg md:text-xl px-8 sm:px-12 md:px-16 py-4 sm:py-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center no-underline"
          >
            <span>New Registration</span>
            <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}