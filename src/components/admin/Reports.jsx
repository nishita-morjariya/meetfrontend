import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Reports() {
  const [reportData, setReportData] = useState({
    totalUsers: 0,
    lifeInsurance: 0,
    healthInsurance: 0,
    fixedDeposits: 0,
    loans: 0,
    mutualFunds: 0,
    stocks: 0,
    bonds: 0,
  });

  const fetchReports = async () => {
    try {
      const [
        users,
        lifeInsurance,
        healthInsurance,
        fixedDeposits,
        loans,
        mutualFunds,
        stocks,
        bonds,
      ] = await Promise.all([
        fetch("http://localhost:5000/users").then(res => res.json()),
        fetch("http://localhost:5000/lifeinsurance").then(res => res.json()),
        fetch("http://localhost:5000/healthInsurance").then(res => res.json()),
        fetch("http://localhost:5000/fixedDeposits").then(res => res.json()),
        fetch("http://localhost:5000/loans").then(res => res.json()),
        fetch("http://localhost:5000/mutualfunds").then(res => res.json()),
        fetch("http://localhost:5000/stocks").then(res => res.json()),
        fetch("http://localhost:5000/bonds").then(res => res.json()),
      ]);

      setReportData({
        totalUsers: users.length,
        lifeInsurance: lifeInsurance.length,
        healthInsurance: healthInsurance.length,
        fixedDeposits: fixedDeposits.length,
        loans: loans.length,
        mutualFunds: mutualFunds.length,
        stocks: stocks.length,
        bonds: bonds.length,
      });
    } catch (error) {
      console.error("Error fetching reports:", error);
      Swal.fire("Error", "Failed to load report data.", "error");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReportCard title="Total Users" count={reportData.totalUsers} />
        <ReportCard title="Life Insurance" count={reportData.lifeInsurance} />
        <ReportCard title="Health Insurance" count={reportData.healthInsurance} />
        <ReportCard title="Fixed Deposits" count={reportData.fixedDeposits} />
        <ReportCard title="Loans" count={reportData.loans} />
        <ReportCard title="Mutual Funds" count={reportData.mutualFunds} />
        <ReportCard title="Stocks" count={reportData.stocks} />
        <ReportCard title="Bonds" count={reportData.bonds} />
      </div>
    </div>
  );
}

function ReportCard({ title, count }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{count}</p>
    </div>
  );
}
