import { useState } from "react";

function AddItemForm({ onAdd }) {
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd({ name: trimmed });
    setName("");
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, margin: "16px 0" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add an item (e.g., Milk)"
        style={{ flex: 1, padding: 8 }}
      />
      <button type="submit">Add</button>
    </form>
  );
}
export default AddItemForm;
