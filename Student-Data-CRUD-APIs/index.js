import express from "express";
const app = express();
app.use(express.json());

let students = [
  { id: 1, name: "Ali", email: "ali@example.com", age: 20 },
  { id: 2, name: "Sara", email: "sara@example.com", age: 22 },
  { id: 3, name: "John", email: "john@example.com", age: 19 },
];

// validation
function validateStudents(student) {
  if (!student.name || student.name.trim() === "") {
    return "Name should not be empty.";
  }
  if (!student.email || !student.email.includes("@")) {
    return "Email should include '@'.";
  }
  if (!student.age || student.age <= 0) {
    return "Age must be greater than 0.";
  }
  return null;
}

// GET all or filter by name
app.get("/students", (req, res) => {
  const { name } = req.query;
  if (name) {
    const result = students.filter((s) =>
      s.name.toLowerCase().includes(name.toLowerCase())
    );
    return res.json(result);
  }
  res.json(students);
});

// GET by ID
app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

// POST new student
app.post("/students", (req, res) => {
  const error = validateStudents(req.body);
  if (error) return res.status(400).json({ error });

  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT (update student)
app.put("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });

  const error = validateStudents(req.body);
  if (error) return res.status(400).json({ error });

  student.name = req.body.name;
  student.email = req.body.email;
  student.age = req.body.age;

  res.json(student);
});
// (delete student)
app.delete("/students/:id",(req,res)=>{
    const index= students.findIndex((s) => s.id === parseInt(req.params.id));
    if(index===-1) return res.status(404).json({error:"student not found"});
    const deleted = students.splice(index,1);
    res.json({message:"student deleted", student:deleted[0]});
})

// Start server
app.listen(4000, () => {
  console.log("server is running on port 4000");
});


