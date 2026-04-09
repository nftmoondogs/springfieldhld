import { Link } from "react-router-dom";

const achieveList = [
  {
    icon: "💰",
    title: "Transparent Fee Structure",
    desc: "Explore our affordable and transparent fee structure, designed to ensure quality education is accessible to all.",
    btnText: "View Fees →",
    link: "/blog",
    gradient: "tw-from-amber-500 tw-to-orange-500",
    bgLight: "tw-bg-amber-50",
    border: "tw-border-amber-200/60",
  },
  {
    icon: "📚",
    title: "Curated Book Lists",
    desc: "Discover the carefully selected list of books for each class, crafted to provide a comprehensive learning experience.",
    btnText: "Browse Books →",
    link: "/about",
    gradient: "tw-from-blue-500 tw-to-indigo-500",
    bgLight: "tw-bg-blue-50",
    border: "tw-border-blue-200/60",
  },
];

const Achievement = () => {
  return (
    <section className="tw-relative tw-py-16 sm:tw-py-24 tw-bg-white tw-overflow-hidden">
      <div className="tw-container tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
        {/* Section Header */}
        <div className="tw-text-center tw-max-w-2xl tw-mx-auto tw-mb-12">
          <div className="tw-inline-flex tw-items-center tw-gap-2 tw-px-3 tw-py-1 tw-bg-slate-100 tw-rounded-full tw-mb-4">
            <span className="tw-w-1.5 tw-h-1.5 tw-bg-violet-500 tw-rounded-full"></span>
            <span className="tw-text-xs tw-font-semibold tw-text-slate-500 tw-uppercase tw-tracking-wider">Quick Access</span>
          </div>
          <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-extrabold tw-text-slate-900 tw-tracking-tight">
            Everything You Need
          </h2>
          <p className="tw-text-slate-500 tw-mt-3 tw-text-sm sm:tw-text-base">
            Access fee details and book lists for all classes in one place.
          </p>
        </div>

        {/* Cards */}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6 tw-max-w-4xl tw-mx-auto">
          {achieveList.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="tw-group tw-relative tw-rounded-2xl tw-border tw-overflow-hidden tw-transition-all tw-duration-300 hover:tw-shadow-xl hover:-tw-translate-y-1"
              style={{ borderColor: 'rgba(0,0,0,0.06)' }}
            >
              {/* Top gradient bar */}
              <div className={`tw-h-1.5 tw-bg-gradient-to-r ${item.gradient}`}></div>
              
              <div className="tw-p-6 sm:tw-p-8">
                <div className={`tw-w-14 tw-h-14 ${item.bgLight} tw-rounded-2xl tw-flex tw-items-center tw-justify-center tw-text-2xl tw-mb-5 tw-border ${item.border}`}>
                  {item.icon}
                </div>

                <h3 className="tw-text-xl tw-font-bold tw-text-slate-900 tw-mb-3 group-hover:tw-text-amber-600 tw-transition-colors">
                  {item.title}
                </h3>

                <p className="tw-text-slate-500 tw-text-sm tw-leading-relaxed tw-mb-6">
                  {item.desc}
                </p>

                <span className={`tw-inline-flex tw-items-center tw-text-sm tw-font-bold tw-bg-gradient-to-r ${item.gradient} tw-bg-clip-text tw-text-transparent group-hover:tw-gap-3 tw-gap-2 tw-transition-all`}>
                  {item.btnText}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievement;