import React, { useState } from "react";
import Pagination from "./UI/Pagination";

function HomepagePools() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex flex-col w-3/4 mx-auto mt-20 pb-8 items-center justify-items-center">
      <div className="grid grid-cols-1 gap-4 gap-y-24 md:grid-cols-3">
        {/* Delete the <Pool /> components */}
      </div>
      <Pagination
        currentPage={currentPage}
        recordsPerPage={Number(process.env.REACT_APP_RECORDS_PER_PAGE)}
        setCurrentPage={setCurrentPage}
        totalRecords={131}
        pagesPernav={Number(process.env.REACT_APP_PAGES_PER_NAV)}
      />
    </div>
  );
}
export default HomepagePools;
