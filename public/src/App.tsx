import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import { HomePage } from "./pages/customer/HomePage"
import { CatalogPage } from "./pages/customer/CatalogPage"
import { AboutPage } from "./pages/customer/AboutPage"
import { ContactPage } from "./pages/customer/ContactPage"
import { LoginPage } from "./pages/customer/LoginPage"
import { RegisterPage } from "./pages/customer/RegisterPage"
import { ShoppingCartPage } from "./pages/customer/ShoppingCartPage"
import { ProfilePage } from "./pages/customer/ProfilePage"
import { OrderHistoryPage } from "./pages/customer/OrderHistoryPage"
import { Layout } from "./components/Layout/Layout"
import { CartProvider } from "./contexts/CartContext/CartProvider"
import { FavoritesPage } from "./pages/customer/FavoritesPage"
import { ModalProvider } from "./contexts/ModalContext/ModalProvider"
import { ThemeProvider } from "./contexts/ThemeContext/ThemeProvider"
import { AddressFormPage } from "./pages/customer/AddressFormPage"
import { AddressProvider } from "./contexts/AddressContext/AddressProvider"
import { EditProfilePage } from "./pages/customer/EditProfilePage"
import { LoginSuccess } from "./pages/customer/LoginSuccess"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { CategoryProvider } from "./contexts/CategoryContext/CategoryProvider"
import { OrderProvider } from "./contexts/OrderContext/OrderProvider"
import { AdminPage } from "./pages/admin/AdminPage"

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/catalogo", element: <CatalogPage /> },
        { path: "/sobre", element: <AboutPage /> },
        { path: "/contato", element: <ContactPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/cadastro", element: <RegisterPage /> },
        { path: "/carrinho", element: <ShoppingCartPage /> },
        { path: "/login-success", element: <LoginSuccess /> },
        { path: "/dashboard", element: <AdminPage /> },

        {
          element: <ProtectedRoute />,
          children: [
            { path: "/perfil", element: <ProfilePage /> },
            { path: "/historico-de-pedidos", element: <OrderHistoryPage /> },
            { path: "/favoritos", element: <FavoritesPage /> },
            { path: "/novo-endereco", element: <AddressFormPage /> },
            { path: "/editar-endereco/:id", element: <AddressFormPage /> },
            { path: "/editar-perfil", element: <EditProfilePage /> },
          ]
        }
      ]
    }
  ])

  return (
    <ThemeProvider>
      <AddressProvider>
        <OrderProvider>
          <ModalProvider>
            <CartProvider>
              <CategoryProvider>
                <RouterProvider router={router} />
              </CategoryProvider>
            </CartProvider>
          </ModalProvider>
        </OrderProvider>
      </AddressProvider>
    </ThemeProvider>
  )
}
