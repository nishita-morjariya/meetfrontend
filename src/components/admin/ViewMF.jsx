import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ViewMF() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // 🔹 Fetch data
  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:5000/mutualfunds");
      const result = await res.json();
      setData(result);
    } catch (err) {
      Swal.fire("Error", "Unable to fetch Mutual Fund records.", "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔹 Delete MF
  const deleteMF = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:5000/mutualfunds/${id}`, {
          method: "DELETE",
        });

        Swal.fire("Deleted!", "The record has been removed.", "success");
        loadData();
      }
    });
  };

  // 🔹 Search Filter (safe)
  const filtered = data.filter((item) =>
    Object.values(item || {})
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
        Mutual Fund Records
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by user, fund, email, amount..."
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
              <th className="p-3">Fund Type</th>
              <th className="p-3">Fund Name</th>
              <th className="p-3">SIP Amount</th>
              <th className="p-3">SIP Date</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">End Date</th>
              <th className="p-3">Frequency</th>
              <th className="p-3">Nominee</th>
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
                  <td className="p-3">{item.userName || "-"}</td>
                  <td className="p-3">{item.emailId || "-"}</td>
                  <td className="p-3">{item.fundType || "-"}</td>
                  <td className="p-3">{item.fundName || "-"}</td>
                  <td className="p-3">
                    {item.sipAmount ? `₹${item.sipAmount}` : "-"}
                  </td>
                  <td className="p-3">{item.sipDate || "-"}</td>
                  <td className="p-3">{item.startDate || "-"}</td>
                  <td className="p-3">{item.endDate || "-"}</td>
                  <td className="p-3">{item.sipFrequency || "-"}</td>

                  <td className="p-3">
                    {item.nomineeName || "-"}
                    <br />
                    <span className="text-gray-500 text-sm">
                      {item.nomineeRelation || ""}
                    </span>
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/admin/editmf/${item.id}`)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMF(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="text-center p-4 text-gray-500">
                  No Mutual Fund Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
