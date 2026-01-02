import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ViewBonds() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // 🔹 Fetch bonds
  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:5000/bonds");
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Unable to fetch Bond records.", "error");
    }
  };

  // 🔹 Delete bond
  const deleteBond = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:5000/bonds/${id}`, {
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

  // 🔹 Search filter (case-insensitive, no data mutation)
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
        Bond Records
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by user, bond name, issuer..."
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
              <th className="p-3">Bond Name</th>
              <th className="p-3">Issuer</th>
              <th className="p-3">Face Value</th>
              <th className="p-3">Interest Rate</th>
              <th className="p-3">Purchase Date</th>
              <th className="p-3">Maturity Date</th>
              <th className="p-3">Quantity</th>
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
                  <td className="p-3">{item.bondName}</td>
                  <td className="p-3">{item.issuer}</td>
                  <td className="p-3">₹{item.faceValue}</td>
                  <td className="p-3">{item.interestRate}%</td>
                  <td className="p-3">{item.purchaseDate}</td>
                  <td className="p-3">{item.maturityDate}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{item.paymentMode}</td>

                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/admin/editbonds/${item.id}`)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteBond(item.id)}
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
                  No Bond Records Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
