import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="banner-section tw-relative tw-overflow-hidden tw-bg-gradient-to-b tw-from-amber-50/50 tw-via-white tw-to-white tw-py-12 sm:tw-py-16 lg:tw-py-20">
      <div className="container">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-gap-8 lg:tw-gap-14">
          {/* Left Content */}
          <div className="tw-flex-1 tw-text-center lg:tw-text-left">
            <div className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-1.5 tw-bg-amber-100 tw-border tw-border-amber-200 tw-rounded-full tw-mb-5">
              <span className="tw-w-2 tw-h-2 tw-bg-amber-500 tw-rounded-full tw-animate-pulse"></span>
              <span className="tw-text-amber-700 tw-text-xs tw-font-semibold tw-tracking-wider tw-uppercase">Nurturing Young Minds</span>
            </div>

            <h1 className="tw-text-4xl sm:tw-text-5xl lg:tw-text-6xl tw-font-extrabold tw-text-slate-900 tw-leading-[1.1] tw-tracking-tight tw-mb-5">
              Spring Field
              <span className="tw-block tw-text-amber-500">Junior High School</span>
            </h1>

            <p className="tw-text-base sm:tw-text-lg tw-text-slate-500 tw-leading-relaxed tw-max-w-xl tw-mx-auto lg:tw-mx-0 tw-mb-8">
              Welcome to Spring Field Junior High School, where we nurture young minds to shape a bright future. Located in Haldwani, Uttrakhand — offering a comprehensive experience for Nursery to Class VIII.
            </p>

            <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3 tw-justify-center lg:tw-justify-start">
              <Link to="/about" className="tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-px-7 tw-py-3.5 tw-bg-amber-500 tw-text-white tw-rounded-xl tw-font-bold tw-text-sm tw-shadow-lg tw-shadow-amber-500/25 hover:tw-bg-amber-600 tw-transition-all hover:-tw-translate-y-0.5">
                📚 View Book Lists
              </Link>
              <Link to="/blog" className="tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-px-7 tw-py-3.5 tw-bg-white tw-border-2 tw-border-slate-200 tw-text-slate-700 tw-rounded-xl tw-font-bold tw-text-sm hover:tw-border-amber-400 hover:tw-text-amber-600 tw-transition-all">
                💰 Fee Structure
              </Link>
            </div>

            {/* Stats */}
            <div className="tw-flex tw-items-center tw-gap-8 sm:tw-gap-12 tw-mt-10 tw-pt-8 tw-border-t tw-border-slate-100 tw-justify-center lg:tw-justify-start">
              {[
                { num: "15+", label: "Years of Excellence" },
                { num: "500+", label: "Students Enrolled" },
                { num: "VIII", label: "Classes Available" },
              ].map((s, i) => (
                <div key={i} className="tw-text-center lg:tw-text-left">
                  <div className="tw-text-2xl sm:tw-text-3xl tw-font-extrabold tw-text-slate-900">{s.num}</div>
                  <div className="tw-text-xs tw-text-slate-400 tw-font-medium tw-mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image — large */}
          <div className="tw-flex-1 tw-w-full">
            <div className="tw-rounded-2xl tw-overflow-hidden tw-shadow-2xl tw-shadow-slate-200/50 tw-border tw-border-slate-100">
              <img src="assets/images/banner/02.png" alt="Spring Field Junior High School" className="tw-w-full tw-h-auto tw-block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;