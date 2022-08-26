import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
// import PrivacyPage from "./components/others/PrivacyPage"
// import CategoriesPage from "./components/categories/CategoriesPage";
// import SubCategoriesPage from "./components/categories/SubCategoriesPage";
// import ProductListingPage from "./components/categories/ProductListingPage";
// import ProductPage from "./components/Under development/ProductPage";
// import CartPage from "./components/Under development/CartPage";
import Aboutus from "./components/Aboutus";
import { useEffect } from "react";
import tokenHandler from "./tokenHandler";
import { loggedIn } from "./actions";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenHandler.getRefreshToken()) {
      dispatch(loggedIn());
    }
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<Aboutus />} />
          {/* <Route path="/privacy" element={<PrivacyPage />} /> */}
          {/* <Route
            path="/categories/:make/:model/:year"
            element={<CategoriesPage />}
          />
          <Route
            path="/subcategories/:make/:model/:year/:category"
            element={<SubCategoriesPage />}
          />
          <Route
            path="/productListing/:make/:model/:year/:category/:subCategory"
            element={<ProductListingPage />}
          />
          <Route path="/product/:sku" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
