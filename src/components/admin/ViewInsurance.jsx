import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ViewInsurance() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // 🔹 Load data
  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:5000/lifeinsurance");
      const result = await res.json();
      setData(result);
    } catch {
      Swal.fire("Error", "Unable to fetch records", "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔹 Delete
  const deleteInsurance = (id) => {
    Swal.fire({
      title: "Delete Insurance?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:5000/lifeinsurance/${id}`, {
          method: "DELETE",
        });
        Swal.fire("Deleted!", "Insurance removed.", "success");
        loadData();
      }
    });
  };

  const filtered = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      <button
        onClick={() => navigate("/admin")}
        className="mb-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        ⬅ Back to Admin
      </button>

      <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
        Life Insurance Records
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by user, email, company..."
          className="w-1/2 p-3 border rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-xl">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Company</th>
              <th className="p-3">Policy</th>
              <th className="p-3">Sum Insured</th>
              <th className="p-3">Premium</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <tr key={item.id} className="border-b text-center hover:bg-gray-100">
                  <td className="p-3">{item.userName}</td>
                  <td className="p-3">{item.emailId}</td>
                  <td className="p-3">{item.companyName}</td>
                  <td className="p-3">{item.policyName}</td>
                  <td className="p-3">₹{item.sumInsurance}</td>
                  <td className="p-3">₹{item.premiumAmount}</td>
                  <td className="p-3">{item.startDate}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/editinsurance/${item.id}`)
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteInsurance(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center p-4 text-gray-500">
                  No Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
