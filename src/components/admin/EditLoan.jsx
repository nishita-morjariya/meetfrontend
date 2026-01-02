import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export default function EditLoan() {
  const { id } = useParams();
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

  useEffect(() => {
    fetch(`http://localhost:5000/loans/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() =>
        Swal.fire("Error", "Failed to load loan details", "error")
      );
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.emailId) {
      Swal.fire("Required", "User Name & Email are mandatory", "warning");
      return;
    }

    if (!isValidEmail(formData.emailId)) {
      Swal.fire("Invalid Email", "Enter a valid email", "error");
      return;
    }

    // 🔹 Preview
    const confirm = await Swal.fire({
      title: "Confirm Update",
      html: `
        <div style="text-align:left">
          <p><b>Name:</b> ${formData.userName}</p>
          <p><b>Email:</b> ${formData.emailId}</p>
          <p><b>Loan Type:</b> ${formData.loanType || "-"}</p>
          <p><b>Amount:</b> ₹${formData.amount || "-"}</p>
          <p><b>Bank:</b> ${formData.bankName || "-"}</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
    });

    if (!confirm.isConfirmed) return;

    try {
      await fetch(`http://localhost:5000/loans/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      Swal.fire("Updated!", "Loan updated successfully", "success");
      navigate("/admin/viewloans");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-600 text-white px-4 py-2 rounded"
        >
          ⬅ Back
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Edit Loan
        </h2>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="User Name *" name="userName" value={formData.userName} onChange={handleChange} />
          <Input label="Email *" name="emailId" value={formData.emailId} onChange={handleChange} />
          <Input label="Loan Type" name="loanType" value={formData.loanType} onChange={handleChange} />
          <Input label="Amount" name="amount" value={formData.amount} onChange={handleChange} />
          <Input label="Interest Rate" name="interestRate" value={formData.interestRate} onChange={handleChange} />
          <Input label="Tenure" name="tenure" value={formData.tenure} onChange={handleChange} />
          <Input label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
          <Input label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          <Input label="Account Number" name="loanAccountNumber" value={formData.loanAccountNumber} onChange={handleChange} />

          <div className="md:col-span-2">
            <label className="font-semibold">Payment Mode</label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="">-- Select --</option>
              <option value="ECS">ECS</option>
              <option value="Cheque">Cheque</option>
              <option value="Online">Online</option>
            </select>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg">
              Update Loan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border p-2 rounded mt-1"
      />
    </div>
  );
}
