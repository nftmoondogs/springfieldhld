const contactList = [
  { icon: "📍", title: "Address", desc: "Behind Ara Machine, Kidwai Nagar, Haldwani (Nainital) Uttrakhand" },
  { icon: "📞", title: "Phone", desc: "+91 8881177767" },
  { icon: "✉️", title: "Email", desc: "springfieldhld@gmail.com" },
  { icon: "🌐", title: "Website", desc: "www.springfieldhld.com" },
];

const Instructor = () => {
  return (
    <section className="tw-py-14 sm:tw-py-20 tw-bg-slate-50">
      <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
        {/* Header */}
        <div className="tw-text-center tw-mb-10">
          <span className="tw-text-xs tw-font-bold tw-text-amber-500 tw-uppercase tw-tracking-widest tw-mb-2 tw-block">Get In Touch</span>
          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-extrabold tw-text-slate-900 tw-tracking-tight">Contact Us</h2>
          <p className="tw-text-slate-500 tw-mt-2 tw-text-sm sm:tw-text-base">Reach out through any of the channels below.</p>
        </div>

        <div className="tw-flex tw-flex-col lg:tw-flex-row tw-gap-8 tw-items-stretch">
          {/* Map / Image — large */}
          <div className="tw-flex-1">
            <div className="tw-rounded-2xl tw-overflow-hidden tw-shadow-xl tw-shadow-slate-200/50 tw-border tw-border-slate-100 tw-h-full tw-min-h-[300px]">
              <img src="assets/images/choose/01.png" alt="School Location" className="tw-w-full tw-h-full tw-object-cover" />
            </div>
          </div>

          {/* Contact Cards */}
          <div className="tw-flex-shrink-0 tw-w-full lg:tw-w-auto lg:tw-min-w-[360px]">
            <div className="tw-space-y-3">
              {contactList.map((item, i) => (
                <div
                  key={i}
                  className="tw-flex tw-items-start tw-gap-4 tw-p-5 tw-bg-white tw-border tw-border-slate-200/60 tw-rounded-xl tw-shadow-sm hover:tw-shadow-md hover:tw-border-amber-200 tw-transition-all tw-duration-200"
                >
                  <div className="tw-w-11 tw-h-11 tw-bg-amber-50 tw-border tw-border-amber-200/50 tw-rounded-xl tw-flex tw-items-center tw-justify-center tw-text-lg tw-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="tw-text-xs tw-font-bold tw-text-slate-400 tw-uppercase tw-tracking-wider tw-mb-0.5">{item.title}</h4>
                    <p className="tw-text-slate-800 tw-text-sm tw-font-medium tw-leading-relaxed">{item.desc}</p>
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