import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export default function EditHealthInsurance() {
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

  // 🔹 Fetch existing record
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/healthInsurance/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        Swal.fire("Error", "Unable to fetch record.", "error");
      }
    };
    loadData();
  }, [id]);

  // 🔹 Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  // 🔹 Convert file → base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      if (!file) resolve(null);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Updating...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const dataToSend = {
        ...formData,
        documents: {
          panCard: formData.panCard instanceof File ? await convertToBase64(formData.panCard) : formData.panCard,
          aadharCard: formData.aadharCard instanceof File ? await convertToBase64(formData.aadharCard) : formData.aadharCard,
          chequeCopy: formData.chequeCopy instanceof File ? await convertToBase64(formData.chequeCopy) : formData.chequeCopy,
        },
      };

      const res = await fetch(`http://localhost:5000/healthInsurance/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) throw new Error();

      Swal.fire({
        icon: "success",
        title: "Updated Successfully!",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/admin/view-health-insurance");
    } catch {
      Swal.fire("Error", "Failed to update record", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full">

        <button
          onClick={() => navigate("/admin/view-health-insurance")}
          className="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          ⬅ Back
        </button>

        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Edit Health Insurance
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Copy all InputBox + FileBox as in AddHealthInsurance */}
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

          {/* Family Members */}
          {[1,2,3,4,5].map(n => (
            <React.Fragment key={n}>
              <InputBox label={`Family Member ${n}`} name={`familyMember${n}`} value={formData[`familyMember${n}`]} onChange={handleChange} />
              <InputBox label="Relation" name={`familyMemberRelation${n}`} value={formData[`familyMemberRelation${n}`]} onChange={handleChange} />
            </React.Fragment>
          ))}

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
              Update Health Insurance
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
      <input type={type} name={name} value={value} onChange={onChange} className="w-full border p-2 rounded-md mt-1" />
    </div>
  );
}

function FileBox({ label, name, onChange }) {
  return (
    <div className="my-2">
      <label className="font-semibold">{label}</label>
      <input type="file" name={name} accept="image/*" onChange={onChange} className="w-full border p-2 rounded-md mt-1" />
    </div>
  );
}
