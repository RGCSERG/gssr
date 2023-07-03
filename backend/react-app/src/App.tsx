import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  _id: number;
  title: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>("http://127.0.0.1:8000/posts")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user._id}>{user.title}</li>
      ))}
    </ul>
  );
};

// import { useEffect, useState } from "react";
// import ProductList from "./backend/components/ProductList";s

// const connect = () => console.log("connecting");
// const disconnect = () => console.log("disconnecting");

// const App = () => {
//   const [category, setCategory] = useState("");

//   useEffect(() => {
//     connect();

//     return () => disconnect();
//   });

//   useEffect(() => {
//     document.title = "WHAT THE HEEEEEEEl";
//   });

//   return (
//     <div>
//       <div>
//         <select
//           className="form-select"
//           onChange={(event) => setCategory(event.target.value)}
//         >
//           <option value=""></option>
//           <option value="Clothing">Clothing</option>
//           <option value="Household">Household</option>
//         </select>
//       </div>
//       <ProductList category={category} />
//     </div>
//   );
// };

// import { useState } from "react";
// import ExpenseList from "./expense-tracker/components/ExpenseList";
// import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
// import ExpenseForm from "./expense-tracker/components/ExpenseForm";

// function App() {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [expenses, setExpenses] = useState([
//     { id: 1, description: "aaa", amount: 10, category: "Utilities" },
//     { id: 2, description: "bbb", amount: 10, category: "Utilities" },
//     { id: 3, description: "ccc", amount: 10, category: "Utilities" },
//     { id: 4, description: "ddd", amount: 10, category: "Utilities" },
//   ]);

//   const visibleExpenses = selectedCategory
//     ? expenses.filter((e) => e.category === selectedCategory)
//     : expenses;

//   return (
//     <div>
//       <div className="mb-5">
//         <ExpenseForm
//           onSubmit={(expense) =>
//             setExpenses([...expenses, { ...expense, id: expenses.length + 1 }])
//           }
//         />
//       </div>
//       <div className="mb-3">
//         <ExpenseFilter
//           onSelectCategory={(category) => setSelectedCategory(category)}
//         />
//       </div>
//       <ExpenseList
//         expenses={visibleExpenses}
//         onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))}
//       />
//     </div>
//   );
// }

// import Alert from "./components/Alert";
// import Button from "./components/Button";
// import ListGroup from "./components/ListGroup";
// import Form from "./components/Form";

// function App() {
//   const [alertVisible, setAlertVisibility] = useState(false);
//   let items = ["1", "2", "3", "4", "5"];
//   return (
//     <div>
//       {alertVisible && (
//         <Alert onClose={() => setAlertVisibility(false)}>
//           <strong>Hold up</strong> WHat the HEEEEEEELL
//         </Alert>
//       )}
//       <Button color="secondary" onClick={() => setAlertVisibility(true)}>
//         Button
//       </Button>
//       <ListGroup
//         heading="head"
//         items={items}
//         onSelectItem={(item: string) => console.log(item)}
//       ></ListGroup>
//       <ListGroup
//         heading="head"
//         items={items}
//         onSelectItem={(item: string) => console.log(item)}
//       ></ListGroup>
//       <Form></Form>
//     </div>
//   );
// }

export default App;
