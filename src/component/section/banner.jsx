import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="banner-section" style={{background: 'linear-gradient(to bottom, #fffbeb33, #fff, #fff)', position: 'relative', overflow: 'hidden'}}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div style={{paddingTop: '20px', paddingBottom: '20px'}}>
              <div className="tw-inline-flex tw-items-center tw-gap-2 tw-px-4 tw-py-1.5 tw-bg-amber-100 tw-border tw-border-amber-200 tw-rounded-full tw-mb-4">
                <span className="tw-w-2 tw-h-2 tw-bg-amber-500 tw-rounded-full tw-animate-pulse"></span>
                <span className="tw-text-amber-700 tw-text-xs tw-font-semibold tw-tracking-wider tw-uppercase">Nurturing Young Minds</span>
              </div>

              <h2 className="title tw-text-4xl sm:tw-text-5xl lg:tw-text-6xl tw-font-extrabold tw-leading-[1.1] tw-tracking-tight tw-mb-4" style={{color: '#0f172a'}}>
                Spring Field
                <span className="d-block" style={{color: '#f59e0b'}}>Junior High School</span>
              </h2>

              <p className="desc tw-text-slate-500 tw-leading-relaxed tw-mb-6" style={{fontSize: '15px', color: '#64748b'}}>
                Welcome to Spring Field Junior High School, where we nurture young minds to shape a bright future. Located in Haldwani, Uttrakhand — offering a comprehensive experience for Nursery to Class VIII.
              </p>

              <div className="tw-flex tw-flex-wrap tw-gap-3 tw-mb-6">
                <Link to="/about" style={{backgroundColor: '#f59e0b', color: '#fff', padding: '12px 28px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(245,158,11,0.3)'}}>
                  📚 View Book Lists
                </Link>
                <Link to="/blog" style={{backgroundColor: '#fff', color: '#334155', padding: '12px 28px', borderRadius: '12px', fontWeight: 700, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', border: '2px solid #e2e8f0'}}>
                  💰 Fee Structure
                </Link>
              </div>

              {/* Stats */}
              <div className="tw-flex tw-items-center tw-gap-6 sm:tw-gap-10 tw-pt-6 tw-border-t tw-border-slate-100">
                {[
                  { num: "15+", label: "Years of Excellence" },
                  { num: "500+", label: "Students Enrolled" },
                  { num: "VIII", label: "Classes Available" },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="tw-text-xl sm:tw-text-2xl tw-font-extrabold tw-text-slate-900">{s.num}</div>
                    <div className="tw-text-[10px] sm:tw-text-xs tw-text-slate-400 tw-font-medium tw-mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div style={{borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9', marginTop: '10px', marginBottom: '20px'}}>
              <img src="assets/images/banner/02.png" alt="Spring Field Junior High School" style={{width: '100%', height: 'auto', display: 'block'}} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;