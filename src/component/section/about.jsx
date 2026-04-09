const About = () => {
  return (
    <section className="tw-relative tw-py-16 sm:tw-py-24 tw-bg-white tw-overflow-hidden">
      {/* Subtle bg accent */}
      <div className="tw-absolute tw-top-0 tw-right-0 tw-w-1/2 tw-h-full tw-bg-gradient-to-l tw-from-amber-50/50 tw-to-transparent"></div>

      <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-relative tw-z-10">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-gap-12 lg:tw-gap-20">
          {/* Left Image */}
          <div className="tw-flex-1 tw-w-full lg:tw-w-auto">
            <div className="tw-relative tw-max-w-md tw-mx-auto lg:tw-mx-0">
              <div className="tw-absolute -tw-inset-4 tw-bg-gradient-to-tr tw-from-amber-100 tw-to-orange-50 tw-rounded-3xl"></div>
              <div className="tw-relative tw-rounded-2xl tw-overflow-hidden tw-shadow-xl tw-border tw-border-slate-200/50">
                <img src="assets/images/about/01.png" alt="Principal" className="tw-w-full tw-h-auto" />
              </div>
              {/* Quote decoration */}
              <div className="tw-absolute -tw-top-3 -tw-left-3 tw-w-12 tw-h-12 tw-bg-amber-500 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-shadow-amber-500/30 tw-text-2xl tw-text-white">"</div>
            </div>
          </div>

          {/* Right Content */}
          <div className="tw-flex-1">
            <div className="tw-inline-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-bg-slate-100 tw-rounded-full tw-mb-4">
              <span className="tw-w-1.5 tw-h-1.5 tw-bg-amber-500 tw-rounded-full"></span>
              <span className="tw-text-xs tw-font-semibold tw-text-slate-500 tw-uppercase tw-tracking-wider">From the Principal's Desk</span>
            </div>

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
              <p className="tw-text-slate-500 tw-text-sm tw-italic">Sincerely,</p>
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