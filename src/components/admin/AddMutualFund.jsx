import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddMutualFund() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    emailId: "",
    fundType: "",
    fundName: "",
    sipAmount: "",
    sipDate: "",
    startDate: "",
    endDate: "",
    sipFrequency: "",
    nomineeName: "",
    nomineeRelation: "",
    nomineePan: "",
    nomineedob: "",
  });

  // 🔹 Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Email format validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mandatory check (ONLY username & email)
    if (!formData.userName || !formData.emailId) {
      Swal.fire("Required", "User Name and Email ID are mandatory", "warning");
      return;
    }

    if (!isValidEmail(formData.emailId)) {
      Swal.fire("Invalid Email", "Please enter a valid email address", "error");
      return;
    }

    // Date validation only if both provided
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      Swal.fire("Invalid Date", "End Date cannot be before Start Date", "error");
      return;
    }

    // 🔹 Preview Summary
    const confirm = await Swal.fire({
      title: "Confirm Mutual Fund Details",
      html: `
        <div style="text-align:left;font-size:14px">
          <p><b>User:</b> ${formData.userName}</p>
          <p><b>Email:</b> ${formData.emailId}</p>
          <p><b>Fund Type:</b> ${formData.fundType || "-"}</p>
          <p><b>Fund Name:</b> ${formData.fundName || "-"}</p>
          <p><b>SIP Amount:</b> ${formData.sipAmount || "-"}</p>
          <p><b>SIP Date:</b> ${formData.sipDate || "-"}</p>
          <p><b>SIP Frequency:</b> ${formData.sipFrequency || "-"}</p>
          <p><b>Start Date:</b> ${formData.startDate || "-"}</p>
          <p><b>End Date:</b> ${formData.endDate || "-"}</p>
          <p><b>Nominee:</b> ${formData.nomineeName || "-"} (${formData.nomineeRelation || "-"})</p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Edit",
    });

    if (!confirm.isConfirmed) return;

    // 🔹 Save to JSON Server
    try {
      const res = await fetch("http://localhost:5000/mutualfunds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error();

      Swal.fire({
        icon: "success",
        title: "Mutual Fund Added Successfully!",
        timer: 1800,
        showConfirmButton: false,
      });

      setFormData({
        userName: "",
        emailId: "",
        fundType: "",
        fundName: "",
        sipAmount: "",
        sipDate: "",
        startDate: "",
        endDate: "",
        sipFrequency: "",
        nomineeName: "",
        nomineeRelation: "",
        nomineePan: "",
        nomineedob: "",
      });
    } catch {
      Swal.fire("Error", "Could not save mutual fund data", "error");
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
          Add Mutual Fund Service
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            name="userName"
            placeholder="User Name *"
            value={formData.userName}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            name="emailId"
            placeholder="Email ID *"
            value={formData.emailId}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select name="fundType" value={formData.fundType} onChange={handleChange} className="border p-2 rounded">
            <option value="">Select Fund Type</option>
            <option>Equity Fund</option>
            <option>Debt Fund</option>
            <option>Hybrid Fund</option>
            <option>Commodity</option>
            <option>Tax Saving ELSS</option>
          </select>

          <input name="fundName" placeholder="Fund Name" value={formData.fundName} onChange={handleChange} className="border p-2 rounded" />
          <input name="sipAmount" placeholder="SIP Amount" value={formData.sipAmount} onChange={handleChange} className="border p-2 rounded" />
          <input type="date" name="sipDate" value={formData.sipDate} onChange={handleChange} className="border p-2 rounded" />

          <select name="sipFrequency" value={formData.sipFrequency} onChange={handleChange} className="border p-2 rounded">
            <option value="">Select Frequency</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Half-Yearly</option>
          </select>

          <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="border p-2 rounded" />
          <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="border p-2 rounded" />

          <input name="nomineeName" placeholder="Nominee Name" value={formData.nomineeName} onChange={handleChange} className="border p-2 rounded" />
          <input name="nomineeRelation" placeholder="Nominee Relation" value={formData.nomineeRelation} onChange={handleChange} className="border p-2 rounded" />
          <input name="nomineePan" placeholder="Nominee PAN" value={formData.nomineePan} onChange={handleChange} className="border p-2 rounded" />
          <input type="date" name="nomineedob" value={formData.nomineedob} onChange={handleChange} className="border p-2 rounded" />

          <button className="md:col-span-2 bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800">
            Add Mutual Fund
          </button>
        </form>
      </div>
    </div>
  );
}
