import { useState } from "react";
import { getBookData, getClassTotal } from "../../data/bookData";
import "../../assets/css/bookList.css";

const BookList = () => {
  const [bookData] = useState(() => getBookData());
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <div className="book-list-section padding-tb">
      <div className="container">
        <div className="book-list-header">
          <h3 className="book-list-school-name">{bookData.schoolName}</h3>
          <p className="book-list-year">BOOK LIST {bookData.year}</p>
        </div>

        <div className="book-list-grid">
          {bookData.classes.map((cls) => (
            <div className="book-class-card" key={cls.id}>
              <div className="book-class-header">
                <h4>{bookData.schoolName}</h4>
                <p>BOOK LIST {bookData.year}</p>
                <h5>{cls.name}</h5>
              </div>

              <table className="book-table">
                <thead>
                  <tr>
                    <th className="col-num">#</th>
                    <th className="col-img">Front</th>
                    <th className="col-img">Back</th>
                    <th className="col-name">Book Name</th>
                    <th className="col-price">Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {cls.books.map((book, idx) => (
                    <tr key={book.id}>
                      <td className="col-num">{idx + 1}</td>
                      <td className="col-img">
                        {book.frontImage ? (
                          <img
                            src={book.frontImage}
                            alt={`${book.name} front`}
                            className="book-thumb"
                            onClick={() => setPreviewImage(book.frontImage)}
                          />
                        ) : (
                          <div className="book-thumb-placeholder">
                            <i className="icofont-image"></i>
                          </div>
                        )}
                      </td>
                      <td className="col-img">
                        {book.backImage ? (
                          <img
                            src={book.backImage}
                            alt={`${book.name} back`}
                            className="book-thumb"
                            onClick={() => setPreviewImage(book.backImage)}
                          />
                        ) : (
                          <div className="book-thumb-placeholder">
                            <i className="icofont-image"></i>
                          </div>
                        )}
                      </td>
                      <td className="col-name">{book.name}</td>
                      <td className="col-price">{book.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="total-row">
                    <td colSpan="4" className="total-label">TOTAL</td>
                    <td className="total-value">
                      {getClassTotal(cls.books).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="image-preview-overlay" onClick={() => setPreviewImage(null)}>
          <div className="image-preview-container">
            <button className="image-preview-close" onClick={() => setPreviewImage(null)}>
              ✕
            </button>
            <img src={previewImage} alt="Book preview" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
