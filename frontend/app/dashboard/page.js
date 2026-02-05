
"use client";

import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Dashboard() {

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await api.get("/jobs");
    setJobs(res.data);
  };

  const runJob = async (id) => {
    await api.post(`/run-job/${id}`);
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">Dashboard</h1>

      <table className="border w-full">

        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {jobs.map(job => (

            <tr key={job.id} className="border">

              <td>{job.id}</td>
              <td>{job.taskName}</td>
              <td>{job.status}</td>
              <td>{job.priority}</td>

              <td>
                <button
                  onClick={() => runJob(job.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Run
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}
