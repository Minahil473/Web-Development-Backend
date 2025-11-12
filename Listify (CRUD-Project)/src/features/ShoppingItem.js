import { useState } from "react";

function ShoppingItem({ item, onRename, onTogglePurchased, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(item.name);

  const save = () => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === item.name) {
      setIsEditing(false);
      return;
    }
    onRename(item.id, trimmed);
    setIsEditing(false);
  };

  return (
    <li style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0" }}>
      <input
        type="checkbox"
        checked={!!item.purchased}
        onChange={() => onTogglePurchased(item.id, !item.purchased)}
        title="Mark as purchased"
      />
      {isEditing ? (
        <>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            style={{ flex: 1, padding: 6 }}
          />
          <button onClick={save}>Save</button>
          <button onClick={() => { setDraft(item.name); setIsEditing(false); }}>Cancel</button>
        </>
      ) : (
        <>
          <span style={{
            flex: 1,
            textDecoration: item.purchased ? "line-through" : "none",
            opacity: item.purchased ? 0.7 : 1
          }}>
            {item.name}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(item.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

export default ShoppingItem;
