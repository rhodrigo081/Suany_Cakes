import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import { Home } from "./pages/Home"
import { Catalog } from "./pages/Catalog"
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { ShoppingCart } from "./pages/ShoppingCart"
import { ProfileEdit } from "./pages/ProfileEdit"
import { OrderHistory } from "./pages/OrderHistory"
import { Layout } from "./components/Layout/Layout"

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [{
        path: "/",
        element: <Home/>
      },
      {
        path: "/catalogo",
        element: <Catalog/>
      },
      {
        path: "/sobre",
        element: <About/>
      },
      {
        path: "/contato",
        element: <Contact/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/cadastro",
        element: <Register/>
      },
      {
        path: "/carrinho",
        element: <ShoppingCart/>
      },
      {
        path: "/perfil",
        element: <ProfileEdit/>
      },
      {
        path: "/historico-de-pedidos",
        element: <OrderHistory/>
      },
    ]
    }
  ])
  
  return(
    <>
     <RouterProvider router={router}/>
    </>
  )

}

