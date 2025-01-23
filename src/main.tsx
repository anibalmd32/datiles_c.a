import ReactDOM from "react-dom/client";
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { AppLayout } from "./layouts/AppLayout";
import { PublicLayout } from "./layouts/PublicLayout";
import { IndexPublic } from "./modules/public/views";
import { Sales } from "./views/Sales/Sales";
import { Products } from "./views/Products/Products";
import { Settings } from "./views/Settings/Settings";
import { AddProduct } from "./views/Products/AddProduct";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/">
          <Route index element={<IndexPublic />} />
        </Route>
      </Route>
      {/* <Route element={<AppLayout />}>
        <Route path="/" element={<Sales />} />

        <Route path="/products">
          <Route index element={<Products />} />
          <Route path="add" element={<AddProduct />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
      </Route> */}
    </Routes>
  </BrowserRouter>  
);
