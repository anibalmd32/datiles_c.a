import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";

// Layouts
import { AppLayout } from "./layouts/AppLayout";
import { PublicLayout } from "./layouts/PublicLayout";

// VIEWS
// Public
import { IndexPublic } from "./modules/public/views";

// Home
import { IndexHome } from "./modules/home/views";

// Sales
import { IndexSales } from "./modules/sales/views";

// Products
import { IndexProducts } from "./modules/products/views";
import { CreateProduct } from "./modules/products/views/create";

// Settings
import { IndexSettings } from "./modules/settings/views";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/">
                    <Route index element={<IndexPublic />} />
                </Route>
            </Route>
            <Route element={<AppLayout />}>
                <Route path="/app">
                    <Route index element={<IndexHome />} />
                    <Route path="sales">
                        <Route index element={<IndexSales />} />
                    </Route>

                    <Route path="products">
                        <Route index element={<IndexProducts />} />
                        <Route path="create" element={<CreateProduct />} />
                    </Route>

                    <Route path="settings">
                        <Route index element={<IndexSettings />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>,
);
