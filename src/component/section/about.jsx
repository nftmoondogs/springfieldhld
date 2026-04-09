const About = () => {
  return (
    <section className="tw-py-14 sm:tw-py-20 tw-bg-white">
      <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-gap-10 lg:tw-gap-16">
          {/* Left Image — large */}
          <div className="tw-flex-1 tw-w-full">
            <div className="tw-rounded-2xl tw-overflow-hidden tw-shadow-xl tw-shadow-slate-200/50 tw-border tw-border-slate-100">
              <img src="assets/images/about/01.png" alt="Principal" className="tw-w-full tw-h-auto tw-block" />
            </div>
          </div>

          {/* Right Content */}
          <div className="tw-flex-1">
            <span className="tw-text-xs tw-font-bold tw-text-amber-500 tw-uppercase tw-tracking-widest tw-mb-2 tw-block">From the Principal's Desk</span>

            <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-extrabold tw-text-slate-900 tw-tracking-tight tw-mb-6">
              Principal's Message
            </h2>

            <div className="tw-space-y-4 tw-text-slate-600 tw-leading-relaxed tw-text-sm sm:tw-text-base">
              <p>
                Welcome to Spring Field Junior High School, an institution committed to academic excellence and student empowerment. Our dedicated faculty and staff strive to provide a comprehensive education tailored to individual needs, fostering both intellectual growth and personal development.
              </p>
              <p>
                We pride ourselves on nurturing a diverse and vibrant learning community, equipped with great facilities and a dynamic curriculum. I encourage you to explore our website and learn about the enriching opportunities Spring Field Junior High School offers.
              </p>
            </div>

            <div className="tw-mt-8 tw-pt-6 tw-border-t tw-border-slate-100">
              <p className="tw-text-slate-400 tw-text-sm tw-italic">Sincerely,</p>
              <p className="tw-font-bold tw-text-slate-800 tw-text-base tw-mt-1">Nighat Parveen</p>
              <p className="tw-text-amber-600 tw-text-sm tw-font-medium">Principal, Spring Field Junior High School</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;