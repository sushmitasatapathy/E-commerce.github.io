import Navbar from "./Navbar"
import Login from "./pages/Login"
import Home from "./pages/Home"
import About from "./pages/About"
import ProductDetails from "./pages/ProductDetails.js"
import Signup from "./pages/Signup.js"
import { Route, Routes } from "react-router-dom"
import Footer from "./pages/Footer.js"



function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/productdetails" element={<ProductDetails />} />
          <Route path="/signup" element={<Signup />} />
          
          
        </Routes>
        <Footer />
      
      </div>
    </>
  )
}

export default App