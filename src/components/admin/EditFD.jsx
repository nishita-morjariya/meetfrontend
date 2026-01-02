import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditFD() {
  const { id } = useParams();
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

  useEffect(() => {
    fetch(`http://localhost:5000/fixedDeposits/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.emailId) {
      Swal.fire("Required", "User Name and Email ID are mandatory", "warning");
      return;
    }

    if (!isValidEmail(formData.emailId)) {
      Swal.fire("Invalid Email", "Enter a valid email address", "error");
      return;
    }

    const confirm = await Swal.fire({
      title: "Confirm Update",
      html: `
        <b>User Name:</b> ${formData.userName}<br/>
        <b>Email:</b> ${formData.emailId}<br/>
        <b>Amount:</b> ₹${formData.amount || "-"}<br/>
        <b>Bank:</b> ${formData.bankName || "-"}<br/>
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    Swal.fire({ title: "Updating...", didOpen: () => Swal.showLoading() });

    await fetch(`http://localhost:5000/fixedDeposits/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    Swal.fire({
      icon: "success",
      title: "Fixed Deposit Updated!",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/view-fd");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">Edit Fixed Deposit</h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key}
            className="border p-2 rounded"
          />
        ))}

        <div className="md:col-span-2 text-center">
          <button className="bg-blue-700 text-white px-6 py-2 rounded">
            Update FD
          </button>
        </div>
      </form>
    </div>
  );
}
