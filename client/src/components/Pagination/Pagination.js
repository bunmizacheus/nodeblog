/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from "lodash";

import "./Pagination.styles.css";

function Pagination({ pageData }) {
  const pagesCount = Math.ceil(pageData.count / pageData.pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <div className="pagination">
      {pageData.currentPage < 2 ? (
        <span className="disabled">&laquo;</span>
      ) : (
        <a onClick={() => pageData.onPageChange(pageData.currentPage - 1)}>
          &laquo;
        </a>
      )}
      {pages.map((page) => (
        <a
          key={page}
          className={page === pageData.currentPage ? "active" : ""}
          onClick={() => pageData.onPageChange(page)}
        >
          {page}
        </a>
      ))}
      {pageData.currentPage === pages.length ? (
        <span className="disabled">&raquo;</span>
      ) : (
        <a onClick={() => pageData.onPageChange(pageData.currentPage + 1)}>
          &raquo;
        </a>
      )}
    </div>
  );
}

export default Pagination;
