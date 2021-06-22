import React from "react";
import { useEffect, useState } from "react";
import reportsApi from "../../apis/reports";
import { isNil, isEmpty, either } from "ramda";
import Table from "../Report/ReportTable/index";
import NavBar from "../NavBar/index";

const Report = () => {
  const [report, setReport] = useState([]);

  const handleReport = async () => {
    try {
      const response = await reportsApi.list();
      setReport(response.data.reports);
    } catch (error) {
      alert(error);
    }
  };

  const downloadReport = () => {
    location.replace("/report/download");
  };

  useEffect(() => {
    handleReport();
  }, []);

  if (!either(isNil, isEmpty)(report)) {
    return (
      <>
        <NavBar />
        <div className="px-4 py-2 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-end mt-5">
              <button
                onClick={downloadReport}
                className="relative  px-5 py-2
                    text-sm font-medium leading-5 text-white transition duration-150
                    ease-in-out bg-bb-purple border border-transparent rounded-full
                    group hover:bg-opacity-90 focus:outline-none"
              >
                {" "}
                Download
              </button>
            </div>
            <h1 className="text-5xl text-gray-700">Report</h1>
            <Table data={report} />
          </div>
        </div>
      </>
    );
  }

  return <h1 className="text-center text-6xl text-gray-700">Data Empty</h1>;
};

export default Report;
