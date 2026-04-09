import { Fragment, useState, useEffect } from "react";
import Footer from "../component/layout/footer";
import Header from "../component/layout/header";
import PageHeader from "../component/layout/pageheader";
import { getFeeData, getFeeYears, migrateFeeData } from "../data/feeData";

const BlogPage = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [feeData, setFeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await migrateFeeData();
      const available = await getFeeYears();
      setYears(available);
      if (available.length > 0) setSelectedYear(available[0]);
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!selectedYear) return;
    const fetch = async () => {
      setLoading(true);
      const data = await getFeeData(selectedYear);
      setFeeData(data);
      setLoading(false);
    };
    fetch();
  }, [selectedYear]);

  return (
    <Fragment>
      <Header />
      <PageHeader title={"Fee Structure"} curPage={"Fee Structure"} />

      <div className="tw-bg-gradient-to-br tw-from-slate-50 tw-to-slate-100 tw-py-8 sm:tw-py-12 tw-px-3 sm:tw-px-6 lg:tw-px-8">
        <div className="tw-max-w-7xl tw-mx-auto">
          {loading && years.length === 0 ? (
            <div className="tw-flex tw-items-center tw-justify-center tw-py-20">
              <div className="tw-w-12 tw-h-12 tw-border-4 tw-border-slate-200 tw-border-t-amber-500 tw-rounded-full tw-animate-spin"></div>
            </div>
          ) : years.length === 0 ? (
            <div className="tw-text-center tw-py-20">
              <p className="tw-text-slate-400 tw-text-lg">Fee structure not available yet.</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="tw-text-center tw-mb-6 sm:tw-mb-8">
                <h2 className="tw-text-2xl sm:tw-text-3xl md:tw-text-4xl tw-font-extrabold tw-text-slate-800 tw-tracking-tight">
                  {feeData?.schoolName || "SPRING FIELD SCHOOL"}
                </h2>

                {/* Year Tabs */}
                <div className="tw-mt-4 sm:tw-mt-5 tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-2">
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`tw-px-4 sm:tw-px-5 tw-py-2 tw-rounded-full tw-font-bold tw-text-xs sm:tw-text-sm tw-transition-all tw-duration-200 tw-border-2 ${
                        selectedYear === year
                          ? "tw-bg-amber-500 tw-text-white tw-border-amber-500 tw-shadow-lg tw-shadow-amber-500/25"
                          : "tw-bg-white tw-text-slate-600 tw-border-slate-200 hover:tw-border-amber-400 hover:tw-text-amber-600"
                      }`}
                    >
                      💰 {year}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="tw-flex tw-items-center tw-justify-center tw-py-20">
                  <div className="tw-w-10 tw-h-10 tw-border-4 tw-border-slate-200 tw-border-t-amber-500 tw-rounded-full tw-animate-spin"></div>
                </div>
              ) : !feeData ? (
                <div className="tw-text-center tw-py-20">
                  <p className="tw-text-slate-400 tw-text-lg">No data for {selectedYear}</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="tw-hidden md:tw-block tw-bg-white tw-rounded-2xl tw-shadow-lg tw-shadow-slate-200/50 tw-border tw-border-slate-200/60 tw-overflow-hidden">
                    <div className="tw-overflow-x-auto">
                      <table className="tw-w-full tw-text-sm">
                        <thead>
                          <tr className="tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900">
                            <th className="tw-px-5 tw-py-4 tw-text-left tw-text-xs tw-font-bold tw-text-amber-400 tw-uppercase tw-tracking-widest tw-border-r tw-border-white/10 tw-min-w-[180px] tw-sticky tw-left-0 tw-bg-slate-800 tw-z-10">
                              Fee Category
                            </th>
                            {feeData.classes.map((cls, i) => (
                              <th key={i} className="tw-px-4 tw-py-4 tw-text-center tw-text-xs tw-font-bold tw-text-white tw-uppercase tw-tracking-wider tw-border-r tw-border-white/10 last:tw-border-r-0 tw-min-w-[90px]">
                                {cls}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="tw-divide-y tw-divide-slate-100">
                          {feeData.feeCategories.map((cat, rowIdx) => (
                            <tr key={cat.id} className={`${rowIdx % 2 === 0 ? "tw-bg-white" : "tw-bg-slate-50/60"} hover:tw-bg-amber-50/40 tw-transition-colors`}>
                              <td className="tw-px-5 tw-py-4 tw-font-semibold tw-text-slate-700 tw-text-sm tw-border-r tw-border-slate-100 tw-sticky tw-left-0 tw-bg-inherit tw-z-10">
                                {cat.name}
                              </td>
                              {feeData.classes.map((cls, colIdx) => (
                                <td key={colIdx} className="tw-px-4 tw-py-4 tw-text-center tw-font-bold tw-text-slate-800 tw-text-sm tw-border-r tw-border-slate-100 last:tw-border-r-0">
                                  {cat.fees[cls] ? <span>₹{parseFloat(cat.fees[cls]).toLocaleString("en-IN")}</span> : <span className="tw-text-slate-300">—</span>}
                                </td>
                              ))}
                            </tr>
                          ))}
                          <tr className="tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900">
                            <td className="tw-px-5 tw-py-4 tw-font-extrabold tw-text-white tw-text-sm tw-uppercase tw-tracking-[2px] tw-sticky tw-left-0 tw-bg-slate-800 tw-z-10">Total</td>
                            {feeData.classes.map((cls, i) => {
                              const total = feeData.feeCategories.reduce((s, c) => s + (parseFloat(c.fees[cls]) || 0), 0);
                              return <td key={i} className="tw-px-4 tw-py-4 tw-text-center tw-font-extrabold tw-text-amber-400 tw-text-base">{total > 0 ? `₹${total.toLocaleString("en-IN")}` : "—"}</td>;
                            })}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:tw-hidden tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4">
                    {feeData.classes.map((cls, i) => {
                      const total = feeData.feeCategories.reduce((s, c) => s + (parseFloat(c.fees[cls]) || 0), 0);
                      if (total === 0) return null;
                      return (
                        <div key={i} className="tw-bg-white tw-rounded-xl tw-shadow-md tw-border tw-border-slate-200/60 tw-overflow-hidden">
                          <div className="tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900 tw-px-4 tw-py-3 tw-text-center">
                            <h3 className="tw-text-amber-400 tw-text-lg tw-font-extrabold tw-tracking-widest">{cls}</h3>
                          </div>
                          <div className="tw-p-4">
                            {feeData.feeCategories.map((cat) =>
                              cat.fees[cls] ? (
                                <div key={cat.id} className="tw-flex tw-items-center tw-justify-between tw-py-2 tw-border-b tw-border-slate-100 last:tw-border-b-0">
                                  <span className="tw-text-xs tw-text-slate-500 tw-font-medium">{cat.name}</span>
                                  <span className="tw-font-bold tw-text-slate-800 tw-text-sm">₹{parseFloat(cat.fees[cls]).toLocaleString("en-IN")}</span>
                                </div>
                              ) : null
                            )}
                            <div className="tw-flex tw-items-center tw-justify-between tw-pt-3 tw-mt-2 tw-border-t-2 tw-border-slate-200">
                              <span className="tw-text-xs tw-font-extrabold tw-text-slate-700 tw-uppercase tw-tracking-wider">Total</span>
                              <span className="tw-font-extrabold tw-text-amber-500 tw-text-lg">₹{total.toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {feeData.notes && (
                    <div className="tw-mt-6 tw-bg-amber-50 tw-border tw-border-amber-200 tw-rounded-xl tw-p-4 sm:tw-p-6">
                      <h4 className="tw-font-bold tw-text-amber-800 tw-text-sm tw-mb-2">📋 Notes</h4>
                      <p className="tw-text-amber-700 tw-text-sm tw-whitespace-pre-line">{feeData.notes}</p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default BlogPage;