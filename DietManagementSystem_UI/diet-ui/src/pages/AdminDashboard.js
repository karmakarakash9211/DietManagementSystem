import React, { useEffect, useState } from "react";
import { Paper, Typography, Grid } from "@mui/material";
import { Line } from "react-chartjs-2";
import API from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchLogs();
  }, []);

  const fetchStats = async () => {
    const res = await API.get("/admin/stats");
    setStats(res.data);
  };

  const fetchLogs = async () => {
    const res = await API.get("/admin/weight-trend");
    setLogs(res.data);
  };

  const chartData = {
    labels: logs.map(l => new Date(l.date).toLocaleDateString()),
    datasets: [
      {
        label: "Avg Weight Trend",
        data: logs.map(l => l.weight || 0),
        borderWidth: 2
      }
    ]
  };

  return (
    <div>

      {/* 📊 STATS */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Total Users</Typography>
            <Typography variant="h5">{stats.totalUsers}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Total Logs</Typography>
            <Typography variant="h5">{stats.totalLogs}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography>Avg Weight</Typography>
            <Typography variant="h5">{stats.avgWeight}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 📈 CHART */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5">Weight Trend</Typography>
        <Line data={chartData} />
      </Paper>

    </div>
  );
}

export default AdminDashboard;