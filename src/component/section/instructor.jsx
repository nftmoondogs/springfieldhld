const contactList = [
  {
    icon: "📍",
    title: "Address",
    desc: "Behind Ara Machine, Kidwai Nagar, Haldwani (Nainital) Uttrakhand",
  },
  {
    icon: "📞",
    title: "Phone",
    desc: "+91 8881177767",
  },
  {
    icon: "✉️",
    title: "Email",
    desc: "springfieldhld@gmail.com",
  },
  {
    icon: "🌐",
    title: "Website",
    desc: "www.springfieldhld.com",
  },
];

const Instructor = () => {
  return (
    <section className="tw-relative tw-py-16 sm:tw-py-24 tw-bg-gradient-to-br tw-from-slate-900 tw-via-slate-800 tw-to-slate-900 tw-overflow-hidden">
      {/* Background pattern */}
      <div className="tw-absolute tw-inset-0 tw-opacity-5" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '32px 32px'}}></div>
      
      <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8 tw-relative tw-z-10">
        {/* Section Header */}
        <div className="tw-text-center tw-max-w-2xl tw-mx-auto tw-mb-12">
          <div className="tw-inline-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-bg-white/5 tw-border tw-border-white/10 tw-rounded-full tw-mb-4">
            <span className="tw-w-1.5 tw-h-1.5 tw-bg-amber-400 tw-rounded-full"></span>
            <span className="tw-text-xs tw-font-semibold tw-text-slate-400 tw-uppercase tw-tracking-wider">Get In Touch</span>
          </div>
          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-extrabold tw-text-white tw-tracking-tight">
            Contact Us
          </h2>
          <p className="tw-text-slate-400 tw-mt-3 tw-text-sm sm:tw-text-base">
            We'd love to hear from you. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-8 tw-items-stretch">
          {/* Map / Image */}
          <div className="tw-flex-1">
            <div className="tw-rounded-2xl tw-overflow-hidden tw-border tw-border-white/10 tw-shadow-xl tw-h-full tw-min-h-[300px]">
              <img src="assets/images/choose/01.png" alt="School Location" className="tw-w-full tw-h-full tw-object-cover" />
            </div>
          </div>

          {/* Contact Cards */}
          <div className="tw-flex-shrink-0 tw-w-full lg:tw-w-auto lg:tw-min-w-[360px]">
            <div className="tw-space-y-3">
              {contactList.map((item, i) => (
                <div
                  key={i}
                  className="tw-flex tw-items-start tw-gap-4 tw-p-4 sm:tw-p-5 tw-bg-white/5 tw-backdrop-blur-sm tw-border tw-border-white/10 tw-rounded-xl hover:tw-bg-white/10 tw-transition-colors tw-duration-200"
                >
                  <div className="tw-w-11 tw-h-11 tw-bg-amber-500/10 tw-border tw-border-amber-500/20 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-text-lg tw-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase tw-tracking-wider tw-mb-1">{item.title}</h4>
                    <p className="tw-text-white tw-text-sm tw-font-medium tw-leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instructor;