import { useState, useEffect } from "react";
import { getBookData, getAvailableYears, getClassTotal, migrateOldData } from "../../data/bookData";

const BookList = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchYears = async () => {
      setLoading(true);
      await migrateOldData();
      const availableYears = await getAvailableYears();
      setYears(availableYears);
      if (availableYears.length > 0) {
        setSelectedYear(availableYears[0]);
      }
      setLoading(false);
    };
    fetchYears();
  }, []);

  useEffect(() => {
    if (!selectedYear) return;
    const fetchData = async () => {
      setLoading(true);
      const data = await getBookData(selectedYear);
      setBookData(data);
      setLoading(false);
    };
    fetchData();
  }, [selectedYear]);

  if (loading && years.length === 0) {
    return (
      <div className="tw-min-h-[60vh] tw-flex tw-items-center tw-justify-center tw-bg-gradient-to-br tw-from-slate-50 tw-to-slate-100">
        <div className="tw-text-center">
          <div className="tw-w-12 tw-h-12 tw-border-4 tw-border-slate-200 tw-border-t-amber-500 tw-rounded-full tw-animate-spin tw-mx-auto tw-mb-4"></div>
          <p className="tw-text-slate-500 tw-font-medium tw-text-lg">Loading book list...</p>
        </div>
      </div>
    );
  }

  if (years.length === 0) {
    return (
      <div className="tw-min-h-[40vh] tw-flex tw-items-center tw-justify-center tw-bg-gradient-to-br tw-from-slate-50 tw-to-slate-100">
        <p className="tw-text-slate-400 tw-text-lg tw-font-medium">No book lists available yet.</p>
      </div>
    );
  }

  return (
    <div className="tw-bg-gradient-to-br tw-from-slate-50 tw-to-slate-100 tw-py-8 sm:tw-py-12 tw-px-3 sm:tw-px-6 lg:tw-px-8">
      <div className="tw-max-w-7xl tw-mx-auto">
        {/* Header */}
        <div className="tw-text-center tw-mb-6 sm:tw-mb-8">
          <h2 className="tw-text-2xl sm:tw-text-3xl md:tw-text-4xl tw-font-extrabold tw-text-slate-800 tw-tracking-tight">
            {bookData?.schoolName || "SPRING FIELD SCHOOL"}
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
                📚 {year}
              </button>
            ))}
          </div>
        </div>

        {/* Loading for year switch */}
        {loading ? (
          <div className="tw-flex tw-items-center tw-justify-center tw-py-20">
            <div className="tw-w-10 tw-h-10 tw-border-4 tw-border-slate-200 tw-border-t-amber-500 tw-rounded-full tw-animate-spin"></div>
          </div>
        ) : !bookData ? (
          <div className="tw-text-center tw-py-20">
            <p className="tw-text-slate-400 tw-text-lg">No data found for {selectedYear}</p>
          </div>
        ) : (
          /* Classes Grid */
          <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-5 sm:tw-gap-8">
            {bookData.classes.map((cls) => (
              <div
                key={cls.id}
                className="tw-bg-white tw-rounded-xl sm:tw-rounded-2xl tw-shadow-lg tw-shadow-slate-200/50 tw-border tw-border-slate-200/60 tw-overflow-hidden hover:tw-shadow-xl tw-transition-shadow tw-duration-300"
              >
                {/* Class Header */}
                <div className="tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900 tw-px-4 sm:tw-px-6 tw-py-4 sm:tw-py-5 tw-text-center">
                  <p className="tw-text-slate-400 tw-text-[10px] sm:tw-text-xs tw-font-semibold tw-tracking-widest tw-uppercase tw-mb-0.5">
                    {bookData.schoolName}
                  </p>
                  <p className="tw-text-slate-400 tw-text-[10px] sm:tw-text-xs tw-font-medium tw-mb-1">
                    BOOK LIST {selectedYear}
                  </p>
                  <h3 className="tw-text-amber-400 tw-text-xl sm:tw-text-2xl tw-font-extrabold tw-tracking-widest">
                    {cls.name}
                  </h3>
                </div>

                {/* Mobile Card View */}
                <div className="sm:tw-hidden">
                  {cls.books.map((book, idx) => (
                    <div
                      key={book.id}
                      className="tw-px-4 tw-py-3 tw-border-b tw-border-slate-100 last:tw-border-b-0"
                    >
                      <div className="tw-flex tw-items-start tw-gap-3">
                        {/* Index */}
                        <span className="tw-text-xs tw-font-bold tw-text-slate-400 tw-mt-1 tw-min-w-[16px]">{idx + 1}</span>

                        {/* Images */}
                        <div className="tw-flex tw-gap-2 tw-shrink-0">
                          {book.frontImage ? (
                            <img
                              src={book.frontImage}
                              alt={`${book.name} front`}
                              className="tw-w-12 tw-h-16 tw-object-cover tw-rounded-md tw-border tw-border-slate-200 tw-cursor-pointer"
                              onClick={() => setPreviewImage(book.frontImage)}
                            />
                          ) : (
                            <div className="tw-w-12 tw-h-16 tw-bg-slate-100 tw-rounded-md tw-border tw-border-dashed tw-border-slate-300 tw-flex tw-items-center tw-justify-center">
                              <svg className="tw-w-4 tw-h-4 tw-text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          {book.backImage ? (
                            <img
                              src={book.backImage}
                              alt={`${book.name} back`}
                              className="tw-w-12 tw-h-16 tw-object-cover tw-rounded-md tw-border tw-border-slate-200 tw-cursor-pointer"
                              onClick={() => setPreviewImage(book.backImage)}
                            />
                          ) : (
                            <div className="tw-w-12 tw-h-16 tw-bg-slate-100 tw-rounded-md tw-border tw-border-dashed tw-border-slate-300 tw-flex tw-items-center tw-justify-center">
                              <svg className="tw-w-4 tw-h-4 tw-text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Name + Price */}
                        <div className="tw-flex-1 tw-min-w-0">
                          <p className="tw-font-semibold tw-text-slate-700 tw-uppercase tw-text-xs tw-tracking-wide tw-leading-tight">
                            {book.name}
                          </p>
                          <p className="tw-font-bold tw-text-slate-800 tw-text-sm tw-mt-1">₹{book.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="tw-hidden sm:tw-block tw-overflow-x-auto">
                  <table className="tw-w-full tw-text-sm">
                    <thead>
                      <tr className="tw-bg-slate-50 tw-border-b-2 tw-border-slate-200">
                        <th className="tw-px-4 tw-py-3 tw-text-center tw-text-xs tw-font-bold tw-text-slate-500 tw-uppercase tw-tracking-wider tw-w-12">#</th>
                        <th className="tw-px-3 tw-py-3 tw-text-center tw-text-xs tw-font-bold tw-text-slate-500 tw-uppercase tw-tracking-wider tw-w-24">Front</th>
                        <th className="tw-px-3 tw-py-3 tw-text-center tw-text-xs tw-font-bold tw-text-slate-500 tw-uppercase tw-tracking-wider tw-w-24">Back</th>
                        <th className="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-bold tw-text-slate-500 tw-uppercase tw-tracking-wider">Book Name</th>
                        <th className="tw-px-4 tw-py-3 tw-text-right tw-text-xs tw-font-bold tw-text-slate-500 tw-uppercase tw-tracking-wider tw-w-24">Price (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="tw-divide-y tw-divide-slate-100">
                      {cls.books.map((book, idx) => (
                        <tr key={book.id} className="hover:tw-bg-amber-50/40 tw-transition-colors tw-duration-150">
                          <td className="tw-px-4 tw-py-3 tw-text-center tw-font-bold tw-text-slate-400 tw-text-sm">{idx + 1}</td>
                          <td className="tw-px-3 tw-py-3 tw-text-center">
                            {book.frontImage ? (
                              <img
                                src={book.frontImage}
                                alt={`${book.name} front`}
                                className="tw-w-16 tw-h-20 tw-object-cover tw-rounded-lg tw-border-2 tw-border-slate-200 tw-cursor-pointer hover:tw-scale-110 hover:tw-shadow-lg tw-transition-all tw-duration-200 tw-mx-auto"
                                onClick={() => setPreviewImage(book.frontImage)}
                              />
                            ) : (
                              <div className="tw-w-16 tw-h-20 tw-bg-slate-100 tw-rounded-lg tw-border-2 tw-border-dashed tw-border-slate-300 tw-flex tw-items-center tw-justify-center tw-mx-auto">
                                <svg className="tw-w-5 tw-h-5 tw-text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </td>
                          <td className="tw-px-3 tw-py-3 tw-text-center">
                            {book.backImage ? (
                              <img
                                src={book.backImage}
                                alt={`${book.name} back`}
                                className="tw-w-16 tw-h-20 tw-object-cover tw-rounded-lg tw-border-2 tw-border-slate-200 tw-cursor-pointer hover:tw-scale-110 hover:tw-shadow-lg tw-transition-all tw-duration-200 tw-mx-auto"
                                onClick={() => setPreviewImage(book.backImage)}
                              />
                            ) : (
                              <div className="tw-w-16 tw-h-20 tw-bg-slate-100 tw-rounded-lg tw-border-2 tw-border-dashed tw-border-slate-300 tw-flex tw-items-center tw-justify-center tw-mx-auto">
                                <svg className="tw-w-5 tw-h-5 tw-text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </td>
                          <td className="tw-px-4 tw-py-3 tw-font-semibold tw-text-slate-700 tw-uppercase tw-tracking-wide tw-text-sm">{book.name}</td>
                          <td className="tw-px-4 tw-py-3 tw-text-right tw-font-bold tw-text-slate-800 tw-text-base">{book.price}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900">
                        <td colSpan="4" className="tw-px-6 tw-py-4 tw-text-center tw-font-extrabold tw-text-white tw-text-base tw-uppercase tw-tracking-[3px]">TOTAL</td>
                        <td className="tw-px-4 tw-py-4 tw-text-right tw-font-extrabold tw-text-amber-400 tw-text-lg">₹{getClassTotal(cls.books).toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Mobile Total */}
                <div className="sm:tw-hidden tw-bg-gradient-to-r tw-from-slate-800 tw-to-slate-900 tw-px-4 tw-py-3 tw-flex tw-items-center tw-justify-between">
                  <span className="tw-font-extrabold tw-text-white tw-text-sm tw-uppercase tw-tracking-[3px]">TOTAL</span>
                  <span className="tw-font-extrabold tw-text-amber-400 tw-text-lg">₹{getClassTotal(cls.books).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="tw-fixed tw-inset-0 tw-bg-black/85 tw-z-[10000] tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="tw-relative tw-max-w-[95vw] sm:tw-max-w-[90vw] tw-max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              className="tw-absolute tw--top-3 tw--right-3 tw-w-10 tw-h-10 tw-rounded-full tw-bg-white tw-text-slate-800 tw-text-xl tw-font-bold tw-flex tw-items-center tw-justify-center tw-shadow-xl tw-cursor-pointer tw-z-[10001] hover:tw-bg-red-500 hover:tw-text-white tw-transition-colors"
              onClick={() => setPreviewImage(null)}
            >
              ✕
            </button>
            <img src={previewImage} alt="Book preview" className="tw-max-w-[95vw] sm:tw-max-w-[90vw] tw-max-h-[85vh] tw-object-contain tw-rounded-xl tw-shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
