import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

function Dashboard() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValues, setEditValues] = useState({
    name: "",
    quantity: "",
    price: "",
    category: "",
  });

  const itemsCollection = collection(db, "shoppingList");

  // Fetch items
  const fetchItems = async () => {
    const q = query(itemsCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add item
  const addItem = async () => {
    if (!item.trim() || !quantity || !price) return;
    await addDoc(itemsCollection, {
      name: item,
      quantity,
      price,
      category,
      createdAt: serverTimestamp(),
    });
    setItem("");
    setQuantity("");
    setPrice("");
    setCategory("");
    fetchItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "shoppingList", id));
    fetchItems();
  };

  // Start editing
  const startEdit = (i) => {
    setEditId(i.id);
    setEditValues({
      name: i.name,
      quantity: i.quantity,
      price: i.price,
      category: i.category,
    });
  };

  // Save edit
  const saveEdit = async (id) => {
    const itemRef = doc(db, "shoppingList", id);
    await updateDoc(itemRef, { ...editValues });
    setEditId(null);
    setEditValues({ name: "", quantity: "", price: "", category: "" });
    fetchItems();
  };

  const submit = (e) => {
    e.preventDefault();
    addItem();
  };

  // Calculate total cost
  const totalCost = items.reduce(
    (sum, i) =>
      sum + (parseFloat(i.price) || 0) * (parseFloat(i.quantity) || 0),
    0
  );

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #f7f5ef 0%, #e9e5da 35%, #f7f5ef 100%)",
        minHeight: "100vh", 
        paddingBottom: "40px", 
      }}
    >
      <div className="container w-75 pt-5">
        <div className="text-center mb-4"   >
          <h2 className="fw-bold text-theme-dark">Shopping List Dashboard</h2>
          <p className="mb-0 text-muted">
            Add items with details, manage them, and keep track of costs.
          </p>
        </div>

        {/* Input form */}
        <div className="card shadow-sm border-0 mb-4" >
          <div
            className="card-header bg-theme-primary fw-bold"
            style={{ backgroundColor: "#7d7664",color: "#38342b" }}
          >
            ➕ Add a New Item
          </div>
          <div className="card-body">
            <form onSubmit={submit} className="row g-3">
              <div className="col-md-3">
                <label className="form-label fw-semibold">Item Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., Milk"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-semibold">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g., 2"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <label className="form-label fw-semibold">Price (Rs)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g., 150"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-semibold">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option>Groceries</option>
                  <option>Household</option>
                  <option>Electronics</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button type="submit" className="btn w-100" style={{ backgroundColor: "#7d7664" }}>
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Table */}
        <div className="card shadow-sm border-0" style={{
        background:"linear-gradient(135deg, #f7f5ef 0%, #e9e5da 35%, #f7f5ef 100%)",
      }}
        >
          <div className="card-header  text-white fw-bold" style={{ backgroundColor: "#7d7664" }}>
            📋 Your Items
          </div>
          <div className="table-responsive" >
            <table className="table table-striped table-bordered mb-0 align-middle">
              <thead className="text-black" style={{
        background:"linear-gradient(135deg, #f7f5ef 0%, #e9e5da 35%, #f7f5ef 100%)",
      }}>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Price (Rs)</th>
                  <th>Category</th>
                  <th style={{ width: "220px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((i) => (
                  <tr key={i.id}>
                    <td>
                      {editId === i.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editValues.name}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              name: e.target.value,
                            })
                          }
                        />
                      ) : (
                        i.name
                      )}
                    </td>
                    <td>
                      {editId === i.id ? (
                        <input
                          type="number"
                          className="form-control"
                          value={editValues.quantity}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              quantity: e.target.value,
                            })
                          }
                        />
                      ) : (
                        i.quantity
                      )}
                    </td>
                    <td>
                      {editId === i.id ? (
                        <input
                          type="number"
                          className="form-control"
                          value={editValues.price}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              price: e.target.value,
                            })
                          }
                        />
                      ) : (
                        i.price
                      )}
                    </td>
                    <td>
                      {editId === i.id ? (
                        <select
                          className="form-select"
                          value={editValues.category}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              category: e.target.value,
                            })
                          }
                        >
                          <option>Groceries</option>
                          <option>Household</option>
                          <option>Electronics</option>
                          <option>Other</option>
                        </select>
                      ) : (
                        i.category
                      )}
                    </td>
                    <td>
                      {editId === i.id ? (
                        <>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => saveEdit(i.id)}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditId(null)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-sm me-2 "  style={{ backgroundColor: "#7d7664" }}
                            onClick={() => startEdit(i)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteItem(i.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              {items.length > 0 && (
                <tfoot>
                  <tr className="fw-bold">
                    <td colSpan="2" className="text-end">
                      Total:
                    </td>
                    <td colSpan="3">Rs {totalCost}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
          {items.length === 0 && (
            <div className="text-center text-muted p-3">
              No items yet — add your first one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
