import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddHealthInsurance() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    emailId: "",
    companyName: "",
    policyName: "",
    policyNumber: "",
    sumInsurance: "",
    premiumAmount: "",
    startDate: "",
    tenuar: "",
    renewalDate: "",
    familyMember1: "",
    familyMemberRelation1: "",
    familyMember2: "",
    familyMemberRelation2: "",
    familyMember3: "",
    familyMemberRelation3: "",
    familyMember4: "",
    familyMemberRelation4: "",
    familyMember5: "",
    familyMemberRelation5: "",
    paymentMode: "",
    panCard: null,
    aadharCard: null,
    chequeCopy: null,
  });

  // 🔹 Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  // 🔹 Email validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔹 Convert file → base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      if (!file) resolve(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mandatory
    if (!formData.userName || !formData.emailId) {
      Swal.fire(
        "Required Fields",
        "User Name and Email ID are mandatory",
        "warning"
      );
      return;
    }

    if (!isValidEmail(formData.emailId)) {
      Swal.fire("Invalid Email", "Enter a valid email address", "error");
      return;
    }

    // 🔹 Preview Summary
    const confirm = await Swal.fire({
      title: "Confirm Health Insurance Details",
      html: `
        <div style="text-align:left;font-size:14px">
          <b>User Name:</b> ${formData.userName}<br/>
          <b>Email:</b> ${formData.emailId}<br/>
          <b>Company:</b> ${formData.companyName || "-"}<br/>
          <b>Policy Name:</b> ${formData.policyName || "-"}<br/>
          <b>Policy No:</b> ${formData.policyNumber || "-"}<br/>
          <b>Sum Insured:</b> ₹${formData.sumInsurance || "-"}<br/>
          <b>Premium:</b> ₹${formData.premiumAmount || "-"}<br/>
          <b>Start Date:</b> ${formData.startDate || "-"}<br/>
          <b>Renewal Date:</b> ${formData.renewalDate || "-"}<br/>
          <b>Payment Mode:</b> ${formData.paymentMode || "-"}<br/>
          <hr/>
          <b>Documents:</b><br/>
          PAN Card: ${formData.panCard ? "Uploaded" : "Not Uploaded"}<br/>
          Aadhaar Card: ${formData.aadharCard ? "Uploaded" : "Not Uploaded"}<br/>
          Cheque Copy: ${formData.chequeCopy ? "Uploaded" : "Not Uploaded"}<br/>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Edit",
    });

    if (!confirm.isConfirmed) return;

    Swal.fire({
      title: "Saving...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const dataToSend = {
        ...formData,
        documents: {
          panCard: await convertToBase64(formData.panCard),
          aadharCard: await convertToBase64(formData.aadharCard),
          chequeCopy: await convertToBase64(formData.chequeCopy),
        },
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:5000/healthInsurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) throw new Error();

      Swal.fire({
        icon: "success",
        title: "Health Insurance Added Successfully!",
        timer: 1800,
        showConfirmButton: false,
      });

      setFormData({
        userName: "",
        emailId: "",
        companyName: "",
        policyName: "",
        policyNumber: "",
        sumInsurance: "",
        premiumAmount: "",
        startDate: "",
        tenuar: "",
        renewalDate: "",
        familyMember1: "",
        familyMemberRelation1: "",
        familyMember2: "",
        familyMemberRelation2: "",
        familyMember3: "",
        familyMemberRelation3: "",
        familyMember4: "",
        familyMemberRelation4: "",
        familyMember5: "",
        familyMemberRelation5: "",
        paymentMode: "",
        panCard: null,
        aadharCard: null,
        chequeCopy: null,
      });
    } catch {
      Swal.fire("Error", "Failed to save health insurance", "error");
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

        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Add Health Insurance Service
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <InputBox label="User Name *" name="userName" value={formData.userName} onChange={handleChange} />
          <InputBox label="Email ID *" name="emailId" type="email" value={formData.emailId} onChange={handleChange} />

          <InputBox label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
          <InputBox label="Policy Name" name="policyName" value={formData.policyName} onChange={handleChange} />
          <InputBox label="Policy Number" name="policyNumber" value={formData.policyNumber} onChange={handleChange} />
          <InputBox label="Sum Insurance (₹)" type="number" name="sumInsurance" value={formData.sumInsurance} onChange={handleChange} />
          <InputBox label="Premium Amount (₹)" type="number" name="premiumAmount" value={formData.premiumAmount} onChange={handleChange} />

          <InputBox label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          <InputBox label="Tenuar (in years)" type="number" name="tenuar" value={formData.tenuar} onChange={handleChange} />
          <InputBox label="Renewal Date" type="date" name="renewalDate" value={formData.renewalDate} onChange={handleChange} />
          <InputBox label="Family Member 1" name="familyMember1" value={formData.familyMember1} onChange={handleChange} />
          <InputBox label="Relation" name="familyMemberRelation1" value={formData.familyMemberRelation1} onChange={handleChange} />
          <InputBox label="Family Member 2" name="familyMember2" value={formData.familyMember2} onChange={handleChange} />
          <InputBox label="Relation" name="familyMemberRelation2" value={formData.familyMemberRelation2} onChange={handleChange} />
          <InputBox label="Family Member 3" name="familyMember3" value={formData.familyMember3} onChange={handleChange} />
          <InputBox label="Relation" name="familyMemberRelation3" value={formData.familyMemberRelation3} onChange={handleChange} />
          <InputBox label="Family Member 4" name="familyMember4" value={formData.familyMember4} onChange={handleChange} />
          <InputBox label="Relation" name="familyMemberRelation4" value={formData.familyMemberRelation4} onChange={handleChange} />
          <InputBox label="Family Member 5" name="familyMember5" value={formData.familyMember5} onChange={handleChange} />
          <InputBox label="Relation" name="familyMemberRelation5" value={formData.familyMemberRelation5} onChange={handleChange} />
          

          <div className="md:col-span-2">
            <label className="font-semibold">Payment Mode</label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="w-full border p-2 rounded-md mt-1"
            >
              <option value="">-- Select --</option>
              <option value="ECS">ECS</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-bold mt-4">Upload Documents</h3>
            <FileBox label="PAN Card" name="panCard" onChange={handleChange} />
            <FileBox label="Aadhaar Card" name="aadharCard" onChange={handleChange} />
            <FileBox label="Cheque Copy" name="chequeCopy" onChange={handleChange} />
          </div>

          <div className="md:col-span-2 flex justify-center mt-6">
            <button className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 font-semibold">
              Add Health Insurance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Reusable */
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

function FileBox({ label, name, onChange }) {
  return (
    <div className="my-2">
      <label className="font-semibold">{label}</label>
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={onChange}
        className="w-full border p-2 rounded-md mt-1"
      />
    </div>
  );
}
