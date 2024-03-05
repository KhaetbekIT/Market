import { Fragment } from "react";
import "./App.css"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Product from "./pages/Product"

const App = () => {
  return (
    <Fragment>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="*" element={<h2 className="title-2">404</h2>} />
        </Routes>
      </main>
    </Fragment>
  )
}

export default App;