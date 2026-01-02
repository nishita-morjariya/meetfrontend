import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStocks() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    userName: "",
    emailId: "",
    stockName: "",
    symbol: "",
    buyPrice: "",
    quantity: "",
    brokerName: "",
    purchaseDate: "",
    paymentMode: "",
  });

  // 🔹 Fetch existing stock data
  useEffect(() => {
    fetch(`http://localhost:5000/stocks/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() =>
        Swal.fire("Error", "Failed to load stock details.", "error")
      );
  }, [id]);

  // 🔹 Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔹 Validate mandatory fields
  const validate = () => {
    if (!formData.userName.trim()) {
      Swal.fire("Required", "User Name is required.", "error");
      return false;
    }

    if (!formData.emailId.trim()) {
      Swal.fire("Required", "Email ID is required.", "error");
      return false;
    }

    if (!isValidEmail(formData.emailId)) {
      Swal.fire("Invalid Email", "Please enter a valid email.", "error");
      return false;
    }

    return true;
  };

  // 🔹 Update stock
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    Swal.fire({
      title: "Updating...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(`http://localhost:5000/stocks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Stock Updated Successfully!",
          timer: 1800,
          showConfirmButton: false,
        });
        navigate("/admin/viewstocks");
      } else {
        throw new Error();
      }
    } catch {
      Swal.fire("Error", "Failed to update stock.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          ⬅ Back
        </button>

        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Edit Stock Investment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <InputBox
            label="User Name *"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />

          <InputBox
            label="Email ID *"
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
          />

          <InputBox
            label="Stock Name"
            name="stockName"
            value={formData.stockName}
            onChange={handleChange}
          />

          <InputBox
            label="Stock Symbol"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
          />

          <InputBox
            label="Buy Price (₹)"
            type="number"
            name="buyPrice"
            value={formData.buyPrice}
            onChange={handleChange}
          />

          <InputBox
            label="Quantity"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

          <InputBox
            label="Broker Name"
            name="brokerName"
            value={formData.brokerName}
            onChange={handleChange}
          />

          <InputBox
            label="Purchase Date"
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
          />

          {/* Payment Mode */}
          <div className="md:col-span-2">
            <label className="font-semibold">Payment Mode</label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            >
              <option value="">-- Select Payment Mode --</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Broker Wallet">Broker Wallet</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 font-semibold"
            >
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputBox({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border p-2 rounded-md mt-1"
      />
    </div>
  );
}
