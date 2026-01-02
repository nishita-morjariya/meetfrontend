import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddBonds() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    emailId: "",
    bondName: "",
    issuer: "",
    faceValue: "",
    interestRate: "",
    purchaseDate: "",
    maturityDate: "",
    quantity: "",
    paymentMode: "",
  });

  // Handle input (no caps)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Email format validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required validation
    if (!formData.userName || !formData.emailId) {
      Swal.fire("Required Fields", "User Name and Email are required", "warning");
      return;
    }

    // Email validation
    if (!isValidEmail(formData.emailId)) {
      Swal.fire("Invalid Email", "Please enter a valid email address", "error");
      return;
    }

    // Preview summary
    const confirm = await Swal.fire({
      title: "Confirm Bond Details",
      html: `
        <div style="text-align:left;font-size:14px">
          <b>User Name:</b> ${formData.userName}<br/>
          <b>Email:</b> ${formData.emailId}<br/>
          <b>Bond Name:</b> ${formData.bondName || "-"}<br/>
          <b>Issuer:</b> ${formData.issuer || "-"}<br/>
          <b>Face Value:</b> ${formData.faceValue || "-"}<br/>
          <b>Interest Rate:</b> ${formData.interestRate || "-"} %<br/>
          <b>Purchase Date:</b> ${formData.purchaseDate || "-"}<br/>
          <b>Maturity Date:</b> ${formData.maturityDate || "-"}<br/>
          <b>Quantity:</b> ${formData.quantity || "-"}<br/>
          <b>Payment Mode:</b> ${formData.paymentMode || "-"}<br/>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Edit",
    });

    if (!confirm.isConfirmed) return;

    // Saving loader
    Swal.fire({
      title: "Saving...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch("http://localhost:5000/bonds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, createdAt: new Date().toISOString() }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Bond Added Successfully!",
          timer: 1800,
          showConfirmButton: false,
        });

        setFormData({
          userName: "",
          emailId: "",
          bondName: "",
          issuer: "",
          faceValue: "",
          interestRate: "",
          purchaseDate: "",
          maturityDate: "",
          quantity: "",
          paymentMode: "",
        });
      } else {
        throw new Error();
      }
    } catch {
      Swal.fire("Error", "Failed to save bond details", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full">

        <button
          onClick={() => navigate("/admin")}
          className="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          ⬅ Back to Admin Panel
        </button>

        <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Add Bond Investment
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputBox label="User Name" name="userName" value={formData.userName} onChange={handleChange} required />
          <InputBox label="Email ID" type="email" name="emailId" value={formData.emailId} onChange={handleChange} required />

          <InputBox label="Bond Name" name="bondName" value={formData.bondName} onChange={handleChange} />
          <InputBox label="Bond Issuer" name="issuer" value={formData.issuer} onChange={handleChange} />

          <InputBox label="Face Value (₹)" type="number" name="faceValue" value={formData.faceValue} onChange={handleChange} />
          <InputBox label="Interest Rate (%)" type="number" name="interestRate" value={formData.interestRate} onChange={handleChange} />

          <InputBox label="Purchase Date" type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} />
          <InputBox label="Maturity Date" type="date" name="maturityDate" value={formData.maturityDate} onChange={handleChange} />

          <InputBox label="Quantity" type="number" name="quantity" value={formData.quantity} onChange={handleChange} />

          <div className="md:col-span-2">
            <label className="font-semibold">Payment Mode</label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            >
              <option value="">-- Select Payment Mode --</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 font-semibold"
            >
              Add Bond
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

// Reusable Input Component
function InputBox({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="font-semibold">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border p-2 rounded-md mt-1"
      />
    </div>
  );
}
