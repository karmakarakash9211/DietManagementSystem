import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import { Line } from "react-chartjs-2";
import API from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

function ChallengerDashboard() {
  console.log("ChallengerDashboard loaded");
  const [log, setLog] = useState({
  breakfast: "",
  lunch: "",
  dinner: "",
  workout: "",
  weight: ""
  });

  const handleChange = (e) => {
    setLog({
      ...log,
      [e.target.name]: e.target.value
    });
  };

  const [logs, setLogs] = useState([]);

  // 📥 Fetch logs
  const fetchLogs = async () => {
    const res = await API.get("/challenger/logs");
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

 
  const submitLog = async () => {
  try {
    await API.post("/challenger/log", log);

    setLog({
      breakfast: "",
      lunch: "",
      dinner: "",
      workout: "",
      weight: ""
    });

    alert("Log submitted");
    fetchLogs();

  } catch (err) {
    console.error(err);
    alert("Failed to submit log");
  }
};

  
  const chartData = {
    labels: logs.map((l) =>
    new Date(l.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Weight Progress (kg)",
        data: logs.length
  ? logs.map((l) => Number(l.weight) || null)
  : [],
        borderWidth: 2,
        tension: 0.4
      }
    ]
  };

  const [goalWeight, setGoalWeight] = useState("");
  const [height, setHeight] = useState("");

  const sortedLogs = [...logs].sort(
  (a, b) => new Date(a.date) - new Date(b.date)
);

const latestWeight =
  sortedLogs.length > 0
    ? Number(sortedLogs[sortedLogs.length - 1].weight)
    : 0;

// Progress %
const progress =
  goalWeight && latestWeight
    ? (((goalWeight - latestWeight) / goalWeight) * 100).toFixed(1)
    : 0;

// BMI
const bmi =
  height && latestWeight
    ? (latestWeight / (Number(height) * Number(height))).toFixed(1)
    : 0;

    const bmiChartData = {
  labels: logs.map((l) =>
    new Date(l.date).toLocaleDateString()
  ),
  datasets: [
    {
      label: "BMI Trend",
      data: logs.map((l) =>
        l.weight && height
          ? (l.weight / (height * height)).toFixed(1)
          : null
      ),
      borderWidth: 2,
      tension: 0.4
    }
  ]
};

const getBMICategory = () => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
};



  return (
    <div>

      {/* 📊 CHART */}
      <Paper sx={{ padding: 3, mb: 3 }}>
        <Typography variant="h5">Progress Chart</Typography>
        <Line data={chartData} />
      </Paper>

      <Paper sx={{ padding: 3, mb: 3 }}>
  <Typography variant="h6">Your Stats</Typography>

  <Typography>Current Weight: {latestWeight} kg</Typography>
  <Typography>Goal Weight: {goalWeight || "--"} kg</Typography>
  <Typography>Progress: {progress}%</Typography>
  <Typography>
  BMI: {bmi} ({bmi ? getBMICategory() : "--"})
</Typography>
</Paper>

<Paper sx={{ padding: 3, mb: 3 }}>
  <Typography variant="h5">BMI Chart</Typography>
  <Line data={bmiChartData} />
</Paper>

      {/* 📝 ADD LOG */}
      <Paper sx={{ padding: 3, mb: 3 }}>
        <Typography variant="h5">Daily Log</Typography>

        <TextField
  fullWidth
  label="Breakfast"
  name="breakfast"
  value={log.breakfast}
  onChange={handleChange}
  sx={{ mt: 2 }}
/>

<TextField
  fullWidth
  label="Lunch"
  name="lunch"
  value={log.lunch}
  onChange={handleChange}
  sx={{ mt: 2 }}
/>

<TextField
  fullWidth
  label="Dinner"
  name="dinner"
  value={log.dinner}
  onChange={handleChange}
  sx={{ mt: 2 }}
/>

<TextField
  fullWidth
  label="Workout"
  name="workout"
  value={log.workout}
  onChange={handleChange}
  sx={{ mt: 2 }}
/>

<TextField
  fullWidth
  type="number"
  label="Weight"
  name="weight"
  value={log.weight}
  onChange={handleChange}
  sx={{ mt: 2 }}
/>

<TextField
  fullWidth
  label="Goal Weight (kg)"
  type="number"
  value={goalWeight}
  onChange={(e) => setGoalWeight(e.target.value)}
  sx={{ mt: 2 }}
/>

<TextField
  fullWidth
  label="Height (meters)"
  type="number"
  value={height}
  onChange={(e) => setHeight(e.target.value)}
  sx={{ mt: 2 }}
/>

        <Button variant="contained" sx={{ mt: 2 }} onClick={submitLog}>
          Submit
        </Button>
      </Paper>

      {/* 📋 LOG HISTORY */}
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h5">Log History</Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Breakfast</TableCell>
              <TableCell>Lunch</TableCell>
              <TableCell>Dinner</TableCell>
              <TableCell>Workout</TableCell>
              <TableCell>Weight</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {logs.map((l, index) => (
              <TableRow key={index}>
                <TableCell>{l.date}</TableCell>
                <TableCell>{l.breakfast}</TableCell>
                <TableCell>{l.lunch}</TableCell>
                <TableCell>{l.dinner}</TableCell>
                <TableCell>{l.workout}</TableCell>
                <TableCell>{l.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

    </div>
  );
}

export default ChallengerDashboard;