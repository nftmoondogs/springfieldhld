const Category = () => {
  return (
    <section className="tw-relative tw-py-16 sm:tw-py-24 tw-bg-slate-50 tw-overflow-hidden">
      {/* Background accent */}
      <div className="tw-absolute tw-bottom-0 tw-left-0 tw-w-1/3 tw-h-full tw-bg-gradient-to-r tw-from-amber-50/30 tw-to-transparent"></div>

      <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-relative tw-z-10">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-gap-12 lg:tw-gap-20">
          {/* Left Content */}
          <div className="tw-flex-1 tw-order-2 lg:tw-order-1">
            <div className="tw-inline-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-bg-white tw-border tw-border-slate-200 tw-rounded-full tw-mb-4 tw-shadow-sm">
              <span className="tw-w-1.5 tw-h-1.5 tw-bg-emerald-500 tw-rounded-full"></span>
              <span className="tw-text-xs tw-font-semibold tw-text-slate-500 tw-uppercase tw-tracking-wider">Our Vision</span>
            </div>

            <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-extrabold tw-text-slate-900 tw-tracking-tight tw-mb-6">
              Shaping Tomorrow's
              <span className="tw-block tw-bg-gradient-to-r tw-from-emerald-600 tw-to-teal-500 tw-bg-clip-text tw-text-transparent">
                Leaders & Thinkers
              </span>
            </h2>

            <div className="tw-space-y-4 tw-text-slate-600 tw-leading-relaxed tw-text-sm sm:tw-text-base">
              <p>
                At Spring Field Junior High School, we strive to cultivate a community of lifelong learners, prepared to excel in a constantly evolving global landscape. Our vision encompasses fostering intellectual curiosity, critical thinking, empathy, and resilience in our students.
              </p>
              <p>
                Through our dedicated faculty and staff, we deliver a comprehensive education tailored to individual strengths and interests. By embracing diversity and inclusivity, we aim to prepare our students to thrive in a multicultural world.
              </p>
            </div>

            {/* Values */}
            <div className="tw-grid tw-grid-cols-2 tw-gap-3 tw-mt-8">
              {[
                { icon: "🎯", label: "Critical Thinking" },
                { icon: "🌍", label: "Global Outlook" },
                { icon: "💡", label: "Innovation" },
                { icon: "🤝", label: "Empathy" },
              ].map((item, i) => (
                <div key={i} className="tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-3 tw-bg-white tw-rounded-xl tw-border tw-border-slate-200/60 tw-shadow-sm">
                  <span className="tw-text-lg">{item.icon}</span>
                  <span className="tw-text-xs sm:tw-text-sm tw-font-semibold tw-text-slate-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="tw-flex-1 tw-order-1 lg:tw-order-2 tw-w-full lg:tw-w-auto">
            <div className="tw-relative tw-max-w-md tw-mx-auto lg:tw-mx-0">
              <div className="tw-absolute -tw-inset-4 tw-bg-gradient-to-br tw-from-emerald-100 tw-to-teal-50 tw-rounded-3xl"></div>
              <div className="tw-relative tw-rounded-2xl tw-overflow-hidden tw-shadow-xl tw-border tw-border-slate-200/50">
                <img src="assets/images/banner/01.png" alt="Our Vision" className="tw-w-full tw-h-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;