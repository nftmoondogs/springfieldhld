const Category = () => {
  return (
    <section className="tw-py-14 sm:tw-py-20 tw-bg-slate-50">
      <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-items-center tw-gap-10 lg:tw-gap-16">
          {/* Left Content */}
          <div className="tw-flex-1 tw-order-2 lg:tw-order-1">
            <span className="tw-text-xs tw-font-bold tw-text-emerald-600 tw-uppercase tw-tracking-widest tw-mb-2 tw-block">Our Vision</span>

            <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-extrabold tw-text-slate-900 tw-tracking-tight tw-mb-6">
              Shaping Tomorrow's Leaders
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

          {/* Right Image — large */}
          <div className="tw-flex-1 tw-order-1 lg:tw-order-2 tw-w-full">
            <div className="tw-rounded-2xl tw-overflow-hidden tw-shadow-xl tw-shadow-slate-200/50 tw-border tw-border-slate-100">
              <img src="assets/images/banner/01.png" alt="Our Vision" className="tw-w-full tw-h-auto tw-block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;