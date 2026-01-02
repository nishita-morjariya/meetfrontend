import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ViewLoans() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);
  const [search, setSearch] = useState("");

  const loadLoans = async () => {
    const res = await fetch("http://localhost:5000/loans");
    const data = await res.json();
    setLoans(data);
  };

  useEffect(() => {
    loadLoans();
  }, []);

  const deleteLoan = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This loan will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:5000/loans/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Loan removed", "success");
        loadLoans();
      }
    });
  };

  const filtered = loans.filter((loan) =>
    Object.values(loan)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <button
        onClick={() => navigate("/admin")}
        className="mb-4 bg-gray-600 text-white px-4 py-2 rounded"
      >
        ⬅ Back to Admin
      </button>

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Loan Records
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search loans..."
          className="w-1/2 p-3 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-center">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Loan Type</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Bank</th>
              <th className="p-3">Account No</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length ? (
              filtered.map((loan) => (
                <tr key={loan.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{loan.userName}</td>
                  <td className="p-3">{loan.emailId}</td>
                  <td className="p-3">{loan.loanType}</td>
                  <td className="p-3">₹{loan.amount}</td>
                  <td className="p-3">{loan.bankName}</td>
                  <td className="p-3">{loan.loanAccountNumber}</td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/admin/editloan/${loan.id}`)}
                      className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteLoan(loan.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-gray-500">
                  No Loan Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
