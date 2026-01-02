import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Portfolio() {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const [username, setUsername] = useState("");
  const [portfolioData, setPortfolioData] = useState({
    lifeInsurance: [],
    healthInsurance: [],
    loans: [],
    mutualFunds: [],
    stocks: [],
    bonds: [],
    fixedDeposits: [],
    loading: true,
  });

  useEffect(() => {
    if (!isLoggedIn || !userEmail) {
      navigate("/login");
    } else {
      fetchUsername();
    }
  }, [isLoggedIn, userEmail, navigate]);

  const fetchUsername = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users?email=${userEmail}`);
      const data = await res.json();
      if (data.length > 0) setUsername(data[0].username);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  const friendlyNames = {
    lifeInsurance: "Life Insurance",
    healthInsurance: "Health Insurance",
    loans: "Loans",
    mutualFunds: "Mutual Funds",
    stocks: "Stocks",
    bonds: "Bonds",
    fixedDeposits: "Fixed Deposits",
  };

  const fetchPortfolio = async () => {
    try {
      const endpoints = [
        "lifeinsurance",
        "healthInsurance",
        "loans",
        "mutualfunds",
        "stocks",
        "bonds",
        "fixedDeposits",
      ];

      const fetches = endpoints.map((endpoint) =>
        fetch(`http://localhost:5000/${endpoint}?emailId=${userEmail}`).then((res) =>
          res.json()
        )
      );

      const [
        lifeInsurance,
        healthInsurance,
        loans,
        mutualFunds,
        stocks,
        bonds,
        fixedDeposits,
      ] = await Promise.all(fetches);

      setPortfolioData({
        lifeInsurance,
        healthInsurance,
        loans,
        mutualFunds,
        stocks,
        bonds,
        fixedDeposits,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
      Swal.fire("Error", "Failed to load portfolio data.", "error");
      setPortfolioData((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    if (userEmail) fetchPortfolio();
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");

    Swal.fire({
      title: "Logged Out",
      text: "You have been logged out successfully.",
      icon: "success",
      confirmButtonColor: "#1e3a8a",
    }).then(() => {
      navigate("/login");
    });
  };

  const flattenObject = (obj) => {
    const result = {};
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val === "object" && val !== null) {
        for (const [subKey, subVal] of Object.entries(val)) {
          result[`${key}_${subKey}`] = subVal;
        }
      } else {
        result[key] = val;
      }
    }
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-7xl relative">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition text-sm"
        >
          Logout
        </button>

        <h1 className="text-3xl font-bold mb-6 text-blue-950 text-center">
          Your Portfolio
        </h1>

        <p className="text-gray-700 mb-6 text-center">
          Hello, <span className="font-semibold text-blue-700">{username || userEmail}</span> 👋
          <br />
          Welcome to your portfolio! Track and manage all your investments here.
        </p>

        {portfolioData.loading ? (
          <p className="text-center text-gray-500">Loading portfolio data...</p>
        ) : (
          <div className="space-y-8">
            {Object.entries(portfolioData)
              .filter(([key]) => key !== "loading")
              .map(([key, items]) => (
                <div key={key}>
                  <h2 className="text-2xl font-semibold mb-4 text-blue-900">
                    {friendlyNames[key] || key}
                  </h2>

                  {items.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table
                        className={`w-full border-collapse border text-sm min-w-max ${
                          key === "lifeInsurance" ? "border-blue-500" : "border-gray-300"
                        }`}
                      >
                        <thead
                          className={`${
                            key === "lifeInsurance" ? "bg-blue-200" : "bg-blue-100"
                          }`}
                        >
                          <tr>
                            {Object.keys(flattenObject(items[0])).map((col) => (
                              <th
                                key={col}
                                className={`border p-2 text-left whitespace-nowrap ${
                                  key === "lifeInsurance" ? "text-blue-900" : ""
                                }`}
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, idx) => {
                            const flatItem = flattenObject(item);
                            return (
                              <tr
                                key={idx}
                                className={
                                  key === "lifeInsurance"
                                    ? idx % 2 === 0
                                      ? "bg-blue-50"
                                      : "bg-blue-100"
                                    : idx % 2 === 0
                                    ? "bg-white"
                                    : "bg-blue-50"
                                }
                              >
                                {Object.values(flatItem).map((val, i) => (
                                  <td
                                    key={i}
                                    className="border p-2 break-words max-w-xs"
                                  >
                                    {val !== null && val !== undefined ? val : "-"}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">You are yet to start.</p>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
