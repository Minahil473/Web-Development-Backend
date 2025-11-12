import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import AddItemForm from "./AddItemForm";
import ShoppingItem from "./ShoppingItem";

function ShoppingList({ user }) {
  const [items, setItems] = useState([]);

  // Collection reference for this user's items
  const colRef = collection(db, `users/${user.uid}/shoppingList`);

  useEffect(() => {
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setItems(data);
    });
    return () => unsub();
  }, [user.uid]); // eslint-disable-line react-hooks/exhaustive-deps

  const addItem = async ({ name }) => {
    await addDoc(colRef, {
      name,
      purchased: false,
      createdAt: serverTimestamp(),
    });
  };

  const renameItem = async (id, newName) => {
    await updateDoc(doc(db, `users/${user.uid}/shoppingList`, id), { name: newName });
  };

  const togglePurchased = async (id, nextVal) => {
    await updateDoc(doc(db, `users/${user.uid}/shoppingList`, id), { purchased: nextVal });
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, `users/${user.uid}/shoppingList`, id));
  };

  return (
    <div>
      <AddItemForm onAdd={addItem} />
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <ShoppingItem
            key={item.id}
            item={item}
            onRename={renameItem}
            onTogglePurchased={togglePurchased}
            onDelete={deleteItem}
          />
        ))}
      </ul>
      {items.length === 0 && <p style={{ opacity: 0.7 }}>No items yet—add your first one!</p>}
    </div>
  );
}

export default ShoppingList;
