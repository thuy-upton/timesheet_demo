import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  // Retrieve data passed from TimesheetForm
  const formData = location.state || {
    startDate: "",
    endDate: "",
    week1Hours: "",
    week2Hours: "",
    travelHours: "",
    client: "",
    state: "",
  };

  const handleSubmit = () => {
    navigate("/confirmation");
  };

  const handleGoBack = () => {
    navigate("/timesheet", {
      state: {
        startDate: formData.startDate,
        endDate: formData.endDate,
        week1Hours: formData.week1Hours,
        week2Hours: formData.week2Hours,
        travelHours: formData.travelHours,
        client: formData.client,
        state: formData.state,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start p-4">
      <h1
        className="text-2xl font-bold mb-4 text-center"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Review
      </h1>
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-2xl">
        <div className="space-y-6">
          {/* Current Pay Period */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Current Pay Period (2 Weeks):
            </label>
            <div className="border border-gray-300 p-2">
              <p
                style={{ fontFamily: "Montserrat, sans-serif" }}
                className="italic"
              >
                From:{" "}
                <span className="italic">
                  {formData.startDate || "Not selected"}
                </span>{" "}
                | To:{" "}
                <span className="italic">
                  {formData.endDate || "Not selected"}
                </span>
              </p>
            </div>
          </div>
          {/* Week 1 Hours Worked */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Week 1 Hours Worked:
            </label>
            <div className="border border-gray-300 p-2">
              <p
                style={{ fontFamily: "Montserrat, sans-serif" }}
                className="italic"
              >
                {formData.week1Hours || "Not entered"}
              </p>
            </div>
          </div>
          {/* Week 2 Hours Worked */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Week 2 Hours Worked:
            </label>
            <div className="border border-gray-300 p-2">
              <p
                style={{ fontFamily: "Montserrat, sans-serif" }}
                className="italic"
              >
                {formData.week2Hours || "Not entered"}
              </p>
            </div>
          </div>
          {/* Client */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Client:
            </label>
            <div className="border border-gray-300 p-2">
              <p
                style={{ fontFamily: "Montserrat, sans-serif" }}
                className="italic"
              >
                {formData.client || "Not selected"}
              </p>
            </div>
          </div>
          {/* State */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              State:
            </label>
            <div className="border border-gray-300 p-2">
              <p
                style={{ fontFamily: "Montserrat, sans-serif" }}
                className="italic"
              >
                {formData.state || "Not selected"}
              </p>
            </div>
          </div>
          {/* Travel Hours */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Travel Hours:
            </label>
            <div className="border border-gray-300 p-2">
              <p
                style={{ fontFamily: "Montserrat, sans-serif" }}
                className="italic"
              >
                {formData.travelHours || "Not entered"}
              </p>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleSubmit}
              className="w-1/2 bg-blue-600 text-white p-2 rounded-2xl hover:bg-blue-700 transition-colors md:w-auto"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Submit
            </button>
            <button
              onClick={handleGoBack}
              className="w-1/2 bg-gray-500 text-white p-2 rounded-2xl hover:bg-gray-600 transition-colors md:w-auto"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
