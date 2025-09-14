import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function TimesheetForm() {
  const navigate = useNavigate();
  const location = useLocation();

  // Set default start date to the most recent Sunday and end date to 13 days later (Saturday)
  const getDefaultDates = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceSunday = dayOfWeek;
    const start = new Date(today);
    start.setDate(today.getDate() - daysSinceSunday);
    const end = new Date(start);
    end.setDate(start.getDate() + 13);
    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    };
  };

  // Initialize form fields with location.state if available, else use defaults
  const { start, end } = getDefaultDates();
  const initialState = location.state || {};
  const [startDate, setStartDate] = useState(initialState.startDate || start);
  const [endDate, setEndDate] = useState(initialState.endDate || end);
  const [week1Hours, setWeek1Hours] = useState(initialState.week1Hours || "");
  const [week2Hours, setWeek2Hours] = useState(initialState.week2Hours || "");
  const [travelHours, setTravelHours] = useState(
    initialState.travelHours || ""
  );
  const [client, setClient] = useState(initialState.client || "");
  const [state, setState] = useState(initialState.state || "");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [week1Error, setWeek1Error] = useState("");
  const [week2Error, setWeek2Error] = useState("");
  const [travelError, setTravelError] = useState("");
  const [clientError, setClientError] = useState("");
  const [stateError, setStateError] = useState("");
  const [totalError, setTotalError] = useState("");

  // Set initial dates on component mount if no state is passed
  useEffect(() => {
    if (!location.state) {
      const { start, end } = getDefaultDates();
      setStartDate(start);
      setEndDate(end);
    }
  }, [location.state]);

  // Utility to validate decimal up to 2 places
  const validateTwoDecimals = (value) => {
    return value === "" || /^\d*\.?\d{0,2}$/.test(value);
  };

  // Handle input changes without restricting typing
  const handleWeek1HoursChange = (e) => {
    setWeek1Hours(e.target.value);
    setWeek1Error(""); // Clear error on input change
  };

  const handleWeek2HoursChange = (e) => {
    setWeek2Hours(e.target.value);
    setWeek2Error(""); // Clear error on input change
  };

  const handleTravelHoursChange = (e) => {
    setTravelHours(e.target.value);
    setTravelError(""); // Clear error on input change
  };

  const handleClientChange = (e) => {
    setClient(e.target.value);
    setClientError(""); // Clear error on input change
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    setStateError(""); // Clear error on input change
  };

  // Handle start date selection
  const handleStartDateChange = (e) => {
    const selected = new Date(e.target.value);
    setStartDate(e.target.value);
    setStartDateError(""); // Clear error on input change
    if (selected.getDay() === 0) {
      const end = new Date(selected);
      end.setDate(end.getDate() + 13);
      setEndDate(end.toISOString().split("T")[0]);
      setEndDateError("");
    } else {
      setEndDate("");
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setEndDateError(""); // Clear error on input change
  };

  const handleReviewBeforeSubmit = () => {
    // Reset errors
    setStartDateError("");
    setEndDateError("");
    setWeek1Error("");
    setWeek2Error("");
    setTravelError("");
    setClientError("");
    setStateError("");
    setTotalError("");

    // Validate required fields
    let hasError = false;

    if (!startDate) {
      setStartDateError("Please select a start date.");
      hasError = true;
    }
    if (!endDate) {
      setEndDateError("Please select an end date.");
      hasError = true;
    }
    if (!week1Hours) {
      setWeek1Error("Please enter Week 1 hours.");
      hasError = true;
    }
    if (!week2Hours) {
      setWeek2Error("Please enter Week 2 hours.");
      hasError = true;
    }
    if (!travelHours) {
      setTravelError("Please enter travel hours.");
      hasError = true;
    }
    if (!client) {
      setClientError("Please select a client.");
      hasError = true;
    }
    if (!state) {
      setStateError("Please select a state.");
      hasError = true;
    }

    // Validate decimal places and max hours
    const week1 = parseFloat(week1Hours) || 0;
    const week2 = parseFloat(week2Hours) || 0;
    const travel = parseFloat(travelHours) || 0;
    const totalHours = week1 + week2;

    if (week1Hours && !validateTwoDecimals(week1Hours)) {
      setWeek1Error("Please enter a valid number with up to 2 decimal places.");
      hasError = true;
    }
    if (week2Hours && !validateTwoDecimals(week2Hours)) {
      setWeek2Error("Please enter a valid number with up to 2 decimal places.");
      hasError = true;
    }
    if (travelHours && !validateTwoDecimals(travelHours)) {
      setTravelError(
        "Please enter a valid number with up to 2 decimal places."
      );
      hasError = true;
    }
    if (week1 > 100) {
      setWeek1Error("Week 1 Hours cannot exceed 100 hours.");
      hasError = true;
    }
    if (week2 > 100) {
      setWeek2Error("Week 2 Hours cannot exceed 100 hours.");
      hasError = true;
    }
    if (travel > 100) {
      setTravelError("Travel Hours cannot exceed 100 hours.");
      hasError = true;
    }
    if (totalHours > 168) {
      setTotalError("Pay Period hours entered exceeded the allowable amount.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

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
    <div className="min-h-screen bg-white flex flex-col items-center justify-start p-4">
      <h1
        className="text-2xl font-bold mb-4 text-center"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        Timesheet Form
      </h1>
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-2xl">
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
                {startDateError && (
                  <p className="text-sm text-red-500 mt-1">{startDateError}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-xs mb-1">To:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-600"
                />
                {endDateError && (
                  <p className="text-sm text-red-500 mt-1">{endDateError}</p>
                )}
              </div>
            </div>
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
            {week1Error && (
              <p className="text-sm text-red-500 mt-1">{week1Error}</p>
            )}
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
            {week2Error && (
              <p className="text-sm text-red-500 mt-1">{week2Error}</p>
            )}
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
            {clientError && (
              <p className="text-sm text-red-500 mt-1">{clientError}</p>
            )}
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
            {stateError && (
              <p className="text-sm text-red-500 mt-1">{stateError}</p>
            )}
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
            {travelError && (
              <p className="text-sm text-red-500 mt-1">{travelError}</p>
            )}
          </div>

          {/* Total Hours Error */}
          {totalError && <p className="text-sm text-red-500">{totalError}</p>}

          {/* Submit */}
          <button
            onClick={handleReviewBeforeSubmit}
            className="w-5/6 bg-blue-600 text-white p-1 rounded-2xl hover:bg-blue-700 transition-colors mx-auto block"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Review Before Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimesheetForm;
