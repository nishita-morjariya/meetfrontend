import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMF() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  // 🔹 Fetch existing MF data
  useEffect(() => {
    fetch(`http://localhost:5000/mutualfunds/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch(() =>
        Swal.fire("Error", "Failed to load mutual fund data", "error")
      );
  }, [id]);

  // 🔹 Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Email Validation
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 🔹 Update MF
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mandatory fields check (ONLY these two)
    if (!formData.userName || !formData.emailId) {
      Swal.fire("Required", "User Name and Email ID are mandatory", "warning");
      return;
    }

    if (!isValidEmail(formData.emailId)) {
      Swal.fire("Invalid Email", "Please enter a valid email address", "error");
      return;
    }

    // Date validation (only if both exist)
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      Swal.fire("Invalid Date", "End Date cannot be before Start Date", "error");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/mutualfunds/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error();

      Swal.fire({
        icon: "success",
        title: "Mutual Fund Updated Successfully!",
        timer: 1800,
        showConfirmButton: false,
      });

      navigate("/admin");
    } catch {
      Swal.fire("Error", "Failed to update mutual fund", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl w-full">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          ⬅ Back
        </button>

        <h1 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Edit Mutual Fund
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Input label="User Name *" name="userName" value={formData.userName} onChange={handleChange} />
          <Input label="Email ID *" type="email" name="emailId" value={formData.emailId} onChange={handleChange} />

          <Select
            label="Fund Type"
            name="fundType"
            value={formData.fundType}
            onChange={handleChange}
            options={[
              "Equity Fund",
              "Debt Fund",
              "Hybrid Fund",
              "Index Fund",
              "Tax Saving ELSS",
            ]}
          />

          <Input label="Fund Name" name="fundName" value={formData.fundName} onChange={handleChange} />
          <Input label="SIP Amount (₹)" type="number" name="sipAmount" value={formData.sipAmount} onChange={handleChange} />
          <Input label="SIP Date" type="date" name="sipDate" value={formData.sipDate} onChange={handleChange} />

          <Select
            label="SIP Frequency"
            name="sipFrequency"
            value={formData.sipFrequency}
            onChange={handleChange}
            options={["Daily", "Weekly", "Monthly", "Quarterly", "Half-Yearly"]}
          />

          <Input label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
          <Input label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleChange} />

          <Input label="Nominee Name" name="nomineeName" value={formData.nomineeName} onChange={handleChange} />
          <Input label="Nominee Relation" name="nomineeRelation" value={formData.nomineeRelation} onChange={handleChange} />
          <Input label="Nominee PAN" name="nomineePan" value={formData.nomineePan} onChange={handleChange} />
          <Input label="Nominee DOB" type="date" name="nomineedob" value={formData.nomineedob} onChange={handleChange} />

          <div className="md:col-span-2 flex justify-center mt-4">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 font-semibold">
              Update Mutual Fund
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

// 🔹 Reusable Components
function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border p-2 rounded-md mt-1"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="font-semibold">{label}</label>
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border p-2 rounded-md mt-1"
      >
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
