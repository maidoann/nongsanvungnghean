import AdminLayout from '../layouts/AdminLayout';
import Error404 from '../pages/Error404';
import PrivateRoutes from '../components/admin/PrivateRoutes';
import Login from '../pages/Login';
import CategoryIndex from '../pages/admin/Category/CategoryIndex';
import ProductIndex from '../pages/admin/Products/ProductIndex';
import UserIndex from '../pages/admin/Users/UserIndex';
import CategoryCreate from '../pages/admin/Category/CategoryCreate';
import ProdcutCreate from '../pages/admin/Products/ProductCreate';

export const routes = [
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "*",
        element: <Error404/>
    },
    {
        path: "/admin",
        element: <AdminLayout/>,
        children:[
            {
                element: <PrivateRoutes/>,
                children:[
                    {
                        path: "products",
                        element: <ProductIndex/>
                    },
                    {
                        path: "users",
                        element: <UserIndex/>
                    },
                    {
                        path: "categories",
                        element: <CategoryIndex/>
                    },
                    {
                        path: "categories/create",
                        element: <CategoryCreate/>
                    },
                    {
                        path: "products/create",
                        element: <ProdcutCreate/>
                    }
                ]
            }
        ]
    },
]



