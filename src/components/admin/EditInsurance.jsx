import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export default function EditInsurance() {
  const { id } = useParams();
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
    lastPremiumDate: "",
    endDate: "",
    nomineeName: "",
    nomineeRelation: "",
    paymentMode: "",
    documents: {
      panCard: "",
      aadharCard: "",
      chequeCopy: "",
    },
  });

  // 🔹 Load existing insurance
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/lifeinsurance/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch {
        Swal.fire("Error", "Unable to fetch insurance details", "error");
      }
    };
    loadData();
  }, [id]);

  // 🔹 Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Handle file upload
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          documents: { ...formData.documents, [name]: reader.result },
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // 🔹 Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Updating...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch(
        `http://localhost:5000/lifeinsurance/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error();

      Swal.fire({
        icon: "success",
        title: "Insurance Updated Successfully!",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/admin/viewinsurance");
    } catch {
      Swal.fire("Error", "Failed to update insurance", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl w-full">

        <button
          onClick={() => navigate("/admin/viewinsurance")}
          className="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          ⬅ Back
        </button>

        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Edit Life Insurance
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="User Name" name="userName" value={formData.userName} onChange={handleChange} />
          <InputField label="Email ID" name="emailId" value={formData.emailId} onChange={handleChange} />
          <InputField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} />
          <InputField label="Policy Name" name="policyName" value={formData.policyName} onChange={handleChange} />
          <InputField label="Policy Number" name="policyNumber" value={formData.policyNumber} onChange={handleChange} />
          <InputField label="Sum Insurance (₹)" type="number" name="sumInsurance" value={formData.sumInsurance} onChange={handleChange} />
          <InputField label="Premium Amount (₹)" type="number" name="premiumAmount" value={formData.premiumAmount} onChange={handleChange} />
          <InputField label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          <InputField label="Last Premium Date" type="date" name="lastPremiumDate" value={formData.lastPremiumDate} onChange={handleChange} />
          <InputField label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
          <InputField label="Nominee Name" name="nomineeName" value={formData.nomineeName} onChange={handleChange} />
          <InputField label="Nominee Relation" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} />

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
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <FileUpload label="PAN Card" name="panCard" onChange={handleFileChange} />
          <FileUpload label="Aadhar Card" name="aadharCard" onChange={handleFileChange} />
          <FileUpload label="Cheque Copy" name="chequeCopy" onChange={handleFileChange} />

          <div className="md:col-span-2 flex justify-center mt-4">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 font-semibold">
              Update Insurance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Reusable */
function InputField({ label, name, value, onChange, type = "text" }) {
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

function FileUpload({ label, name, onChange }) {
  return (
    <div className="md:col-span-2">
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
