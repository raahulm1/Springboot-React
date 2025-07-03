import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitUser = async () => {
  if (editingUser) {
    await axios.put(`http://localhost:8080/api/users/${editingUser.id}`, form);
    setEditingUser(null);
  } else {
    await axios.post("http://localhost:8080/api/users", form);
  }
  setForm({ name: "", email: "", age: "" });
  fetchUsers();
};


  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8080/api/users");
    setUsers(res.data);
  };

  const handleEdit = (user) => {
  setForm(user);
  setEditingUser(user);
};

const handleDelete = async (id) => {
  await axios.delete(`http://localhost:8080/api/users/${id}`);
  fetchUsers();
};

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>User Registration</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="age" placeholder="Age" type="number" value={form.age} onChange={handleChange} />
      <button onClick={submitUser}>{editingUser ? "Update" : "Submit"}</button>

      <h3>Registered Users:</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <span>{u.name} ({u.email}, {u.age})</span>
            <button onClick={() => handleEdit(u)}>Edit</button>
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
