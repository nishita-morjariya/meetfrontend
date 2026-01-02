import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddLoan() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    emailId: "",
    loanType: "",
    amount: "",
    interestRate: "",
    tenure: "",
    bankName: "",
    startDate: "",
    loanAccountNumber: "",
    paymentMode: "",
  });

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Email Validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔹 Submit with Preview + Duplicate Check
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email format check
    if (!isValidEmail(formData.emailId)) {
      Swal.fire("Invalid Email", "Please enter a valid email address", "warning");
      return;
    }

    // Duplicate Loan Account Number check
    const existingRes = await fetch(
      `http://localhost:5000/loans?loanAccountNumber=${formData.loanAccountNumber}`
    );
    const existingData = await existingRes.json();

    if (existingData.length > 0) {
      Swal.fire(
        "Duplicate Entry",
        "This loan account number already exists!",
        "error"
      );
      return;
    }

    // 🔹 Preview Modal
    const preview = await Swal.fire({
      title: "Confirm Loan Details",
      html: `
        <div style="text-align:left">
          <p><b>Name:</b> ${formData.userName}</p>
          <p><b>Email:</b> ${formData.emailId}</p>
          <p><b>Loan Type:</b> ${formData.loanType}</p>
          <p><b>Amount:</b> ₹${formData.amount}</p>
          <p><b>Interest Rate:</b> ${formData.interestRate}%</p>
          <p><b>Tenure:</b> ${formData.tenure} months</p>
          <p><b>Bank:</b> ${formData.bankName}</p>
          <p><b>Start Date:</b> ${formData.startDate}</p>
          <p><b>Account No:</b> ${formData.loanAccountNumber}</p>
          <p><b>Payment Mode:</b> ${formData.paymentMode}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save Loan",
      cancelButtonText: "Edit",
    });

    if (!preview.isConfirmed) return;

    // 🔹 Save Data
    try {
      const response = await fetch("http://localhost:5000/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error();

      Swal.fire({
        icon: "success",
        title: "Loan Added Successfully!",
        timer: 1800,
        showConfirmButton: false,
      });

      // Reset form
      setFormData({
        userName: "",
        emailId: "",
        loanType: "",
        amount: "",
        interestRate: "",
        tenure: "",
        bankName: "",
        startDate: "",
        loanAccountNumber: "",
        paymentMode: "",
      });
    } catch {
      Swal.fire("Error", "Could not save loan data", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl w-full">

        <button
          onClick={() => navigate("/admin")}
          className="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          ⬅ Back to Admin Panel
        </button>

        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Add Loan Details
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Input label="User Name" name="userName" value={formData.userName} onChange={handleChange} required />
          <Input label="Email ID" type="email" name="emailId" value={formData.emailId} onChange={handleChange} required />
          <Input label="Loan Type" name="loanType" value={formData.loanType} onChange={handleChange} />
          <Input label="Loan Amount (₹)" type="number" name="amount" value={formData.amount} onChange={handleChange} />
          <Input label="Interest Rate (%)" type="number" step="0.01" name="interestRate" value={formData.interestRate} onChange={handleChange} />
          <Input label="Tenure (Months)" type="number" name="tenure" value={formData.tenure} onChange={handleChange} />
          <Input label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
          <Input label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          <Input label="Loan Account Number" name="loanAccountNumber" value={formData.loanAccountNumber} onChange={handleChange} required />

          <div className="md:col-span-2">
            <label className="font-semibold">Mode of Payment</label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
              required
            >
              <option value="">-- Select Payment Mode --</option>
              <option value="ECS">ECS</option>
              <option value="Cheque">Cheque</option>
              <option value="Online">Online Transfer</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 font-semibold">
              Add Loan
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

// 🔹 Reusable Input
function Input({ label, name, value, onChange, type = "text", required = false, step }) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        step={step}
        onChange={onChange}
        required={required}
        className="w-full border p-2 rounded-md mt-1"
      />
    </div>
  );
}
