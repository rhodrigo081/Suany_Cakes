import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import { HomePage } from "./pages/HomePage"
import { CatalogPage } from "./pages/CatalogPage"
import { AboutPage } from "./pages/AboutPage"
import { ContactPage } from "./pages/ContactPage"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import { ShoppingCartPage } from "./pages/ShoppingCartPage"
import { ProfilePage } from "./pages/ProfilePage"
import { OrderHistoryPage } from "./pages/OrderHistoryPage"
import { Layout } from "./components/Layout/Layout"
import { CartProvider } from "./contexts/CartContext/CartProvider"
import { AuthProvider } from "./contexts/AuthContext/AuthProvider"
import { FavoritesPage } from "./pages/FavoritesPage"
import { ModalProvider } from "./contexts/ModalContext/ModalProvider"
import { ThemeProvider } from "./contexts/ThemeContext/ThemeProvider"
import { AddressFormPage } from "./pages/AddressFormPage"
import { AddressProvider } from "./contexts/AddressContext/AddressProvider"
import { EditProfilePage } from "./pages/EditProfilePage"
import { LoginSuccess } from "./pages/LoginSuccess"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { CategoryProvider } from "./contexts/CategoryContext/CategoryProvider"

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
    <AuthProvider>
      <ThemeProvider>
        <AddressProvider>
          <ModalProvider>
            <CartProvider>
              <CategoryProvider>
                <RouterProvider router={router} />
              </CategoryProvider>
            </CartProvider>
          </ModalProvider>
        </AddressProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
