
"use client";

import { useState } from "react";
import api from "../services/api";

export default function Home() {

  const [taskName, setTaskName] = useState("");
  const [payload, setPayload] = useState("");
  const [priority, setPriority] = useState("Low");

  const submitJob = async () => {

    await api.post("/jobs", {
      taskName,
      payload: JSON.parse(payload),
      priority
    });

    alert("Job Created");
  };

  return (

    <div className="p-10 max-w-lg mx-auto">

      <h1 className="text-3xl font-bold mb-5">Create Job</h1>

      <input
        placeholder="Task Name"
        className="border p-2 w-full mb-3"
        onChange={(e) => setTaskName(e.target.value)}
      />

      <textarea
        placeholder='{"email":"test@gmail.com"}'
        className="border p-2 w-full mb-3"
        onChange={(e) => setPayload(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-3"
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button
        onClick={submitJob}
        className="bg-blue-600 text-white px-5 py-2 rounded"
      >
        Create Job
      </button>

    </div>

  );
}
