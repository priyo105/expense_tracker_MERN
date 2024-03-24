import "./App.css";
import Auth from "./Auth.js/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import AddExpense from "./Expense/AddExpense";
import Categories from "./Categories/Categories";
import Transactions from "./Transactions/Transactions";
import Analytics from "./Analytics/Analytics";
import AddIncome from "./Income/AddIcome";
import AddCategories from "./Categories/AddCategories";
import SignUp from "./Auth.js/SignUp";

function App() {
  // Change the variable name to todos for consistency

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addexpense" element={<AddExpense />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/analytics" element={<Analytics />}></Route>
        <Route path="/income" element={<AddIncome />}></Route>
        <Route path="/addCategory" element={<AddCategories />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
