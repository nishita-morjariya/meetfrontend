import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ViewStocks() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState("");

  // 🔹 Load stocks
  const loadStocks = async () => {
    try {
      const res = await fetch("http://localhost:5000/stocks");
      const data = await res.json();
      setStocks(data);
    } catch {
      Swal.fire("Error", "Failed to fetch stock records.", "error");
    }
  };

  useEffect(() => {
    loadStocks();
  }, []);

  // 🔹 Delete stock
  const deleteStock = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This stock record will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:5000/stocks/${id}`, {
          method: "DELETE",
        });

        Swal.fire("Deleted!", "Stock record deleted.", "success");
        loadStocks();
      }
    });
  };

  // 🔹 Search filter
  const filteredStocks = stocks.filter((item) =>
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
        Stock Investments
      </h1>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by user, email, stock, symbol..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-3 border rounded-lg shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white rounded-xl">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Symbol</th>
              <th className="p-3">Buy Price</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Broker</th>
              <th className="p-3">Purchase Date</th>
              <th className="p-3">Payment Mode</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredStocks.length > 0 ? (
              filteredStocks.map((item) => (
                <tr
                  key={item.id}
                  className="border-b text-center hover:bg-gray-100"
                >
                  <td className="p-3">{item.userName}</td>
                  <td className="p-3">{item.emailId}</td>
                  <td className="p-3">{item.stockName || "-"}</td>
                  <td className="p-3">{item.symbol || "-"}</td>
                  <td className="p-3">₹{item.buyPrice || "-"}</td>
                  <td className="p-3">{item.quantity || "-"}</td>
                  <td className="p-3">{item.brokerName || "-"}</td>
                  <td className="p-3">{item.purchaseDate || "-"}</td>
                  <td className="p-3">{item.paymentMode || "-"}</td>

                  {/* Actions */}
                  <td className="p-3">
                    <button
                      onClick={() =>
                        navigate(`/admin/editstocks/${item.id}`)
                      }
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteStock(item.id)}
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
                  No Stock Records Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
