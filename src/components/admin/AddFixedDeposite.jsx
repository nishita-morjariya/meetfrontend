import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddFixedDeposite() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    emailId: "",
    amount: "",
    term: "",
    bankName: "",
    interestRate: "",
    startDate: "",
    maturityDate: "",
    paymentMode: "",
  });

  // 🔹 Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields
    if (!formData.userName || !formData.emailId) {
      Swal.fire("Required Fields", "User Name and Email ID are mandatory", "warning");
      return;
    }

    if (!isValidEmail(formData.emailId)) {
      Swal.fire("Invalid Email", "Please enter a valid email address", "error");
      return;
    }

    // 🔹 CHECK DUPLICATE EMAIL
    const existingRes = await fetch("http://localhost:5000/fixedDeposits");
    const existingData = await existingRes.json();

    const emailExists = existingData.some(
      (fd) => fd.emailId.toLowerCase() === formData.emailId.toLowerCase()
    );

    if (emailExists) {
      Swal.fire(
        "Duplicate Email",
        "This email ID already has a Fixed Deposit record.",
        "error"
      );
      return;
    }

    // 🔹 Preview Summary
    const confirm = await Swal.fire({
      title: "Confirm Fixed Deposit Details",
      html: `
        <div style="text-align:left;font-size:14px">
          <b>User Name:</b> ${formData.userName}<br/>
          <b>Email ID:</b> ${formData.emailId}<br/>
          <b>Amount:</b> ₹${formData.amount || "-"}<br/>
          <b>Term:</b> ${formData.term || "-"} months<br/>
          <b>Bank Name:</b> ${formData.bankName || "-"}<br/>
          <b>Interest Rate:</b> ${formData.interestRate || "-"} %<br/>
          <b>Start Date:</b> ${formData.startDate || "-"}<br/>
          <b>Maturity Date:</b> ${formData.maturityDate || "-"}<br/>
          <b>Payment Mode:</b> ${formData.paymentMode || "-"}<br/>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Edit",
    });

    if (!confirm.isConfirmed) return;

    // 🔹 Loader
    Swal.fire({
      title: "Saving...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch("http://localhost:5000/fixedDeposits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error();

      Swal.fire({
        icon: "success",
        title: "Fixed Deposit Added Successfully!",
        timer: 1800,
        showConfirmButton: false,
      });

      setFormData({
        userName: "",
        emailId: "",
        amount: "",
        term: "",
        bankName: "",
        interestRate: "",
        startDate: "",
        maturityDate: "",
        paymentMode: "",
      });
    } catch {
      Swal.fire("Error", "Something went wrong while saving data.", "error");
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
          Add Fixed Deposit Service
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputBox label="User Name" name="userName" value={formData.userName} onChange={handleChange} required />
          <InputBox label="Email ID" type="email" name="emailId" value={formData.emailId} onChange={handleChange} required />
          <InputBox label="Deposit Amount (₹)" type="number" name="amount" value={formData.amount} onChange={handleChange} />
          <InputBox label="FD Term (Months)" type="number" name="term" value={formData.term} onChange={handleChange} />
          <InputBox label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
          <InputBox label="Interest Rate (%)" type="number" name="interestRate" value={formData.interestRate} onChange={handleChange} />
          <InputBox label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          <InputBox label="Maturity Date" type="date" name="maturityDate" value={formData.maturityDate} onChange={handleChange} />

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
              Add Fixed Deposit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// 🔹 Reusable Input
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
