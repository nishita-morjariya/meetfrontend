import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ViewFixedDeposite() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // 🔹 Fetch Fixed Deposits
  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:5000/fixedDeposits");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Unable to fetch Fixed Deposit records.", "error");
    }
  };

  // 🔹 Delete FD
  const deleteFD = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Fixed Deposit record will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:5000/fixedDeposits/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "The record has been removed.", "success");
        loadData();
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔹 Search filter
  const filtered = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      {/* Back Button */}
      <button
        onClick={() => navigate("/admin")}
        className="mb-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        ⬅ Back to Admin
      </button>

      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Fixed Deposit Records
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by user, email, bank..."
          className="w-1/2 p-3 border rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-xl">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Term</th>
              <th className="p-3">Bank</th>
              <th className="p-3">Interest</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">Maturity Date</th>
              <th className="p-3">Payment Mode</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b text-center hover:bg-gray-100"
                >
                  <td className="p-3">{item.userName}</td>
                  <td className="p-3">{item.emailId}</td>
                  <td className="p-3">₹{item.amount || "-"}</td>
                  <td className="p-3">{item.term || "-"} months</td>
                  <td className="p-3">{item.bankName || "-"}</td>
                  <td className="p-3">{item.interestRate || "-"}%</td>
                  <td className="p-3">{item.startDate || "-"}</td>
                  <td className="p-3">{item.maturityDate || "-"}</td>
                  <td className="p-3">{item.paymentMode || "-"}</td>

                  <td className="p-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-fd/${item.id}`)
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFD(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center p-4 text-gray-500">
                  No Fixed Deposit Records Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
