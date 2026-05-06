import React, { useEffect, useState } from "react";
import {
  Select, MenuItem, Button, TextField, Paper, Typography
} from "@mui/material";
import API from "../services/api";

function AssignBatch() {

  const [users, setUsers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchBatches();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const fetchBatches = async () => {
    const res = await API.get("/admin/batches");
    console.log("BATCHES:", res.data);
    setBatches(res.data);
  };

  const assignBatch = async () => {
    console.log("USER:", selectedUser);
  console.log("BATCH:", selectedBatch);
    await API.post(`/admin/assign?userId=${selectedUser}&batchId=${selectedBatch}`);
    alert("Assigned successfully");
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">Assign User to Batch</Typography>

      {/* 👤 USER DROPDOWN */}
      <Select fullWidth sx={{ mt: 2 }}
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}>

        {users.map(u => (
          <MenuItem key={u.id} value={u.id}>
            {u.name}
          </MenuItem>
        ))}
      </Select>

      {/* 📦 BATCH DROPDOWN */}
      <Select fullWidth sx={{ mt: 2 }}
        value={selectedBatch}
        onChange={(e) => setSelectedBatch(e.target.value)}>

        {batches.map(b => (
          <MenuItem key={b.id} value={b.id}>
            {b.name}
            
          </MenuItem>
        ))}
      </Select>

      <Button variant="contained" sx={{ mt: 2 }} onClick={assignBatch}>
        Assign
      </Button>

    </Paper>
  );
}

export default AssignBatch;