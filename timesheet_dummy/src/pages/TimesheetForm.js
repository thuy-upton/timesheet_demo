import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TimesheetForm() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [week1Hours, setWeek1Hours] = useState("");
  const [week2Hours, setWeek2Hours] = useState("");
  const [travelHours, setTravelHours] = useState("");
  const [client, setClient] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");

  // Utility to validate decimal up to 2 places
  const validateTwoDecimals = (value) => {
    return value === "" || /^\d*\.?\d{0,2}$/.test(value);
  };

  // Handle start date selection
  const handleStartDateChange = (e) => {
    const selected = new Date(e.target.value);
    setStartDate(e.target.value);
    if (selected.getDay() === 0) {
      const end = new Date(selected);
      end.setDate(end.getDate() + 13); // 2 weeks, ending Saturday
      setEndDate(end.toISOString().split("T")[0]);
    } else {
      setEndDate("");
    }
  };

  const handleEndDateChange = (e) => setEndDate(e.target.value);

  const handleWeek1HoursChange = (e) => {
    if (validateTwoDecimals(e.target.value)) setWeek1Hours(e.target.value);
  };

  const handleWeek2HoursChange = (e) => {
    if (validateTwoDecimals(e.target.value)) setWeek2Hours(e.target.value);
  };

  const handleTravelHoursChange = (e) => {
    const value = e.target.value;
    if (validateTwoDecimals(value)) {
      if (value === "" || parseFloat(value) <= 100) {
        setTravelHours(value);
      }
    }
  };

  const handleClientChange = (e) => setClient(e.target.value);
  const handleStateChange = (e) => setState(e.target.value);

  const handleReviewBeforeSubmit = () => {
    const week1 = parseFloat(week1Hours) || 0;
    const week2 = parseFloat(week2Hours) || 0;

    if (week1 >= 168 || week2 >= 168) {
      setError(
        "Please review your weekly hours entry. Values entered appear to exceed allowable limits."
      );
      return;
    }

    setError(""); // clear error
    navigate("/review", {
      state: {
        startDate,
        endDate,
        week1Hours,
        week2Hours,
        travelHours,
        client,
        state,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1
        className="text-2xl font-bold mb-4 text-center"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Timesheet Form
      </h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <div className="space-y-6">
          {/* Pay Period */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Current Pay Period (2 Weeks)
            </label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <label className="block text-xs mb-1">From:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1">To:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
            {startDate && !endDate && (
              <p className="text-xs text-red-500 mt-1">
                Please select a Sunday as the start date.
              </p>
            )}
          </div>

          {/* Week 1 Hours Worked */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Week 1 Hours Worked
            </label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="Enter hours"
              value={week1Hours}
              onChange={handleWeek1HoursChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Week 2 Hours Worked */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Week 2 Hours Worked
            </label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="Enter hours"
              value={week2Hours}
              onChange={handleWeek2HoursChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Client */}
          <div>
            <label className="block text-sm font-medium mb-2">Client</label>
            <select
              value={client}
              onChange={handleClientChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
            >
              <option value="" disabled>
                Select Client
              </option>
              <option value="client1">Client 1</option>
              <option value="client2">Client 2</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium mb-2">State</label>
            <select
              value={state}
              onChange={handleStateChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
            >
              <option value="" disabled>
                Select State
              </option>
              <option value="CA">California</option>
              <option value="TX">Texas</option>
            </select>
          </div>

          {/* Travel Hours */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Travel Hours
            </label>
            <input
              type="text"
              inputMode="decimal"
              placeholder="e.g., 10.50"
              value={travelHours}
              onChange={handleTravelHoursChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
            />
            <p className="text-xs text-gray-500 mt-1"></p>
          </div>

          {/* Validation Error */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit */}
          <button
            onClick={handleReviewBeforeSubmit}
            className="w-5/6 bg-blue-600 text-white p-1 rounded-2xl hover:bg-blue-700 transition-colors mx-auto block"
          >
            Review Before Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimesheetForm;
