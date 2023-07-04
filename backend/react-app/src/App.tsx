import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import PostForm from "./backend/components/PostForm";

interface Post {
  _id: number;
  title: string;
  content: string;
}

interface sendPost {
  title: string;
  content: string;
}

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const createPost = (data: sendPost) => {
    const controller = new AbortController();
    setLoading(true);
    axios
      .post<Post[]>("http://127.0.0.1:8000/posts", data, {
        signal: controller.signal,
      })
      .then((res) => {
        setLoading(false);
        setPosts([...posts, res.data[0]]);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    return () => controller.abort();
  };

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    axios
      .get<Post[]>("http://127.0.0.1:8000/posts", { signal: controller.signal })
      .then((res) => {
        setLoading(false);
        setPosts(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
    // .finally(() => {
    //   setLoading(false);    doesn't work with strict mode
    // });

    return () => controller.abort();
  }, []);

  return (
    <>
      <div className="mb-3">
        <PostForm onSubmit={createPost}></PostForm>
      </div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {post.title}
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </>
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
