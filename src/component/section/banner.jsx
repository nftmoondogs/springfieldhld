import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="tw-relative tw-overflow-hidden tw-bg-gradient-to-br tw-from-slate-900 tw-via-slate-800 tw-to-slate-900 tw-min-h-[85vh] tw-flex tw-items-center">
      {/* Background Pattern */}
      <div className="tw-absolute tw-inset-0 tw-opacity-5">
        <div className="tw-absolute tw-top-20 tw-right-20 tw-w-96 tw-h-96 tw-bg-amber-400 tw-rounded-full tw-blur-3xl"></div>
        <div className="tw-absolute tw-bottom-20 tw-left-20 tw-w-72 tw-h-72 tw-bg-blue-400 tw-rounded-full tw-blur-3xl"></div>
      </div>
      
      {/* Subtle grid */}
      <div className="tw-absolute tw-inset-0" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>

      <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-relative tw-z-10">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-gap-10 lg:tw-gap-16">
          {/* Left Content */}
          <div className="tw-flex-1 tw-text-center lg:tw-text-left tw-py-12 lg:tw-py-0">
            <div className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-1.5 tw-bg-amber-500/10 tw-border tw-border-amber-500/20 tw-rounded-full tw-mb-6">
              <span className="tw-w-2 tw-h-2 tw-bg-amber-400 tw-rounded-full tw-animate-pulse"></span>
              <span className="tw-text-amber-400 tw-text-xs tw-font-semibold tw-tracking-wider tw-uppercase">Nurturing Young Minds</span>
            </div>

            <h1 className="tw-text-4xl sm:tw-text-5xl lg:tw-text-6xl xl:tw-text-7xl tw-font-extrabold tw-text-white tw-leading-[1.1] tw-tracking-tight tw-mb-6">
              Spring Field
              <span className="tw-block tw-bg-gradient-to-r tw-from-amber-400 tw-to-orange-400 tw-bg-clip-text tw-text-transparent">
                Junior High School
              </span>
            </h1>

            <p className="tw-text-base sm:tw-text-lg tw-text-slate-400 tw-leading-relaxed tw-max-w-xl tw-mx-auto lg:tw-mx-0 tw-mb-8">
              Welcome to Spring Field Junior High School, where we nurture young minds to shape a bright future. Located in the beautiful city of Haldwani, Uttrakhand — offering a comprehensive educational experience for students from Nursery to Class VIII.
            </p>

            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3 tw-justify-center lg:tw-justify-start">
              <Link to="/about" className="tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-px-7 tw-py-3.5 tw-bg-amber-500 tw-text-white tw-rounded-xl tw-font-bold tw-text-sm tw-shadow-lg tw-shadow-amber-500/25 hover:tw-bg-amber-400 tw-transition-all tw-duration-200 hover:tw-shadow-xl hover:tw-shadow-amber-500/30 hover:-tw-translate-y-0.5">
                📚 View Book Lists
                <svg className="tw-w-4 tw-h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link to="/blog" className="tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-px-7 tw-py-3.5 tw-bg-white/5 tw-border tw-border-white/10 tw-text-white tw-rounded-xl tw-font-bold tw-text-sm hover:tw-bg-white/10 tw-transition-all tw-duration-200 tw-backdrop-blur-sm">
                💰 Fee Structure
              </Link>
            </div>

            {/* Stats */}
            <div className="tw-flex tw-items-center tw-gap-6 sm:tw-gap-10 tw-mt-10 tw-pt-10 tw-border-t tw-border-white/10 tw-justify-center lg:tw-justify-start">
              {[
                { num: "15+", label: "Years of Excellence" },
                { num: "500+", label: "Students Enrolled" },
                { num: "VIII", label: "Classes Available" },
              ].map((stat, i) => (
                <div key={i} className="tw-text-center lg:tw-text-left">
                  <div className="tw-text-2xl sm:tw-text-3xl tw-font-extrabold tw-text-white">{stat.num}</div>
                  <div className="tw-text-xs tw-text-slate-500 tw-font-medium tw-mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="tw-flex-1 tw-hidden lg:tw-block">
            <div className="tw-relative">
              <div className="tw-absolute tw-inset-0 tw-bg-gradient-to-tr tw-from-amber-500/20 tw-to-blue-500/20 tw-rounded-3xl tw-blur-2xl tw-scale-95"></div>
              <div className="tw-relative tw-rounded-3xl tw-overflow-hidden tw-border tw-border-white/10 tw-shadow-2xl">
                <img src="assets/images/banner/02.png" alt="Spring Field Junior High School" className="tw-w-full tw-h-auto tw-object-cover" />
              </div>
              {/* Floating card */}
              <div className="tw-absolute -tw-bottom-4 -tw-left-4 tw-bg-white/10 tw-backdrop-blur-xl tw-border tw-border-white/20 tw-rounded-2xl tw-p-4 tw-shadow-xl">
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-w-10 tw-h-10 tw-bg-amber-500 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-text-lg">🏫</div>
                  <div>
                    <div className="tw-text-white tw-font-bold tw-text-sm">Haldwani, Uttrakhand</div>
                    <div className="tw-text-slate-400 tw-text-xs">Since 2010</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;