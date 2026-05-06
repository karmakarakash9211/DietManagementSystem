import React, { useEffect, useState } from "react";
import {
  Paper, Typography, Table, TableHead,
  TableRow, TableCell, TableBody, Select, MenuItem
} from "@mui/material";
import API from "../services/api";

function BatchLeaderboard() {

  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    const res = await API.get("/admin/batches");
    setBatches(res.data);
  };

  const fetchLeaderboard = async (batchId) => {
    const res = await API.get(`/batch/${batchId}/leaderboard`);
    setLeaderboard(res.data);
  };

  const handleBatchChange = (e) => {
    const batchId = e.target.value;
    setSelectedBatch(batchId);
    fetchLeaderboard(batchId);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">🏆 Batch Leaderboard</Typography>

      {/* 📦 SELECT BATCH */}
      <Select fullWidth sx={{ mt: 2 }}
        value={selectedBatch}
        onChange={handleBatchChange}>

        {batches.map(b => (
          <MenuItem key={b.id} value={b.id}>
            {b.name}
          </MenuItem>
        ))}
      </Select>

      {/* 🏆 TABLE */}
      <Table sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Weight</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {leaderboard.map((u, index) => (
            <TableRow key={index}>
              <TableCell>
                {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
              </TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.weight || "--"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </Paper>
  );
}

export default BatchLeaderboard;