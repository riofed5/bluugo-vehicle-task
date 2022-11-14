import { useEffect, useState } from "react";

const columns = [
  "Year",
  "Make",
  "Model",
  "Rejection %",
  "Rejection reason #1",
  "Rejection reason #2",
  "Rejection reason #3",
];

const Table = ({ data, keyword, handleChangePage, page, totalRows }) => {
  const [fromTo, setFromTo] = useState(null);
  const [nextBtnDisable, setNextBtnDisable] = useState(false);

  useEffect(() => {
    if (keyword === "") {
      if (data.length > 0) {
        let sortedData = [...data].map((singleData) => singleData.id);
        const min = Math.min(...sortedData);
        const max = Math.max(...sortedData);
        setNextBtnDisable(max === totalRows);
        setFromTo({ from: min, to: max });
      }
    }
  }, [data, keyword]);

  if (data.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="data-container">
      <div className="search-container">
        {!keyword && (
          <>
            <p>
              Data index from {fromTo?.from} to {fromTo?.to}
            </p>
            <button
              className="btn-prev-page"
              onClick={() => handleChangePage("prev")}
              disabled={page === 1}
            >
              &laquo; Previous
            </button>
            <button
              onClick={() => handleChangePage("next")}
              disabled={nextBtnDisable}
            >
              Next &raquo;
            </button>
          </>
        )}
      </div>
      <br />
      <div className="table-container">
        <table id="customers">
          <tr>
            {columns.map((column, i) => {
              return <th key={i}>{column}</th>;
            })}
          </tr>
          {data.sort().map((singleData, index) => {
            return (
              <tr key={index}>
                <td>{singleData.model_year}</td>
                <td>{singleData.make}</td>
                <td>{singleData.model}</td>
                <td>{singleData.rejection_percentage}</td>
                <td>{singleData.reason_1}</td>
                <td>{singleData.reason_2}</td>
                <td>{singleData.reason_3}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div className="navigation-container">
        {!keyword && (
          <>
            <button
              className="btn-prev-page"
              onClick={() => handleChangePage("prev")}
              disabled={page === 1}
            >
              &laquo; Previous
            </button>
            <button
              onClick={() => handleChangePage("next")}
              disabled={nextBtnDisable}
            >
              Next &raquo;
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Table;
