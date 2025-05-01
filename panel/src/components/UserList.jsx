import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/verifications")
      .then(res => res.json())
      .then(setUsers)
      .catch(() => alert("Failed to load users."));
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-xl overflow-auto max-h-[60vh]">
      <h2 className="text-xl font-bold mb-2">Verified Users</h2>
      <table className="w-full text-sm text-left">
        <thead>
          <tr>
            <th className="pr-2">User</th>
            <th className="pr-2">Email</th>
            <th className="pr-2">IP</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
