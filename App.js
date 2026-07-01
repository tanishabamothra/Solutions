import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  const [type, setType] = useState("Event");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://4.224.186.213/evaluation-service/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data.notifications || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const addNotification = () => {
    if (message.trim() === "") {
      alert("Please enter a notification!");
      return;
    }

    const newNotification = {
      ID: Date.now().toString(),
      Type: type,
      Message: message,
      Timestamp: new Date().toLocaleString(),
    };

    setNotifications([newNotification, ...notifications]);

    setType("Event");
    setMessage("");
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((item) => item.Type === filter);

  return (
    <div className="container">

      <h1>Campus Notification Application</h1>

      {/* Add Notification */}

      <div className="add-box">

        <h2>Add Notification</h2>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Event">Event</option>
          <option value="Result">Result</option>
          <option value="Placement">Placement</option>
        </select>

        <textarea
          placeholder="Enter Notification Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={addNotification}>
          Add Notification
        </button>

      </div>

      {/* Filter Buttons */}

      <div className="buttons">
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Event")}>Event</button>
        <button onClick={() => setFilter("Result")}>Result</button>
        <button onClick={() => setFilter("Placement")}>Placement</button>
      </div>

      {/* Notification List */}

      {filteredNotifications.length === 0 ? (
        <h3>No Notifications Available</h3>
      ) : (
        filteredNotifications.map((item) => (
          <div className="card" key={item.ID}>
            <h3>{item.Type}</h3>

            <p>
              <strong>Message:</strong> {item.Message}
            </p>

            <p>
              <strong>Time:</strong> {item.Timestamp}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default App;