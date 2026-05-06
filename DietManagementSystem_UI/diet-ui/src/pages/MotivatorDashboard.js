import React, { useEffect, useState } from "react";
import {
  Table, TableHead, TableRow,
  TableCell, TableBody, Paper, Typography
} from "@mui/material";
import API from "../services/api";

function MotivatorDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/motivator/users");
    setUsers(res.data);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">User Insights</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Latest Weight</TableCell>
            <TableCell>Total Logs</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((u, i) => (
            <TableRow key={i}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.latestWeight || "--"}</TableCell>
              <TableCell>{u.totalLogs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default MotivatorDashboard;