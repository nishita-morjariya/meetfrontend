import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBond() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  // 🔹 Load existing bond
  useEffect(() => {
    fetch(`http://localhost:5000/bonds/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() =>
        Swal.fire("Error", "Failed to load bond data", "error")
      );
  }, [id]);

  // 🔹 Handle input (NO CAPS)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔹 Update bond
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields
    if (!formData.userName || !formData.emailId) {
      Swal.fire(
        "Required Fields",
        "User Name and Email ID are required",
        "warning"
      );
      return;
    }

    // Email format check
    if (!isValidEmail(formData.emailId)) {
      Swal.fire("Invalid Email", "Please enter a valid email address", "error");
      return;
    }

    // 🔹 Preview summary
    const confirm = await Swal.fire({
      title: "Confirm Updated Details",
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
      confirmButtonText: "Update",
      cancelButtonText: "Edit",
    });

    if (!confirm.isConfirmed) return;

    // 🔹 Loader
    Swal.fire({
      title: "Updating...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(`http://localhost:5000/bonds/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Bond Updated Successfully!",
          timer: 1800,
          showConfirmButton: false,
        });
        navigate("/admin");
      } else {
        throw new Error();
      }
    } catch {
      Swal.fire("Error", "Failed to update bond details", "error");
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
          Edit Bond Investment
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
              Update Bond
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

// 🔹 Reusable Input Component
function InputBox({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="font-semibold">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        className="w-full border p-2 rounded-md mt-1"
      />
    </div>
  );
}
