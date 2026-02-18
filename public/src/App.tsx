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
import { CartProvider } from "./contexts/CartContext"
import { AuthProvider } from "./contexts/AuthContext"
import { FavoritesPage } from "./pages/FavoritesPage"
import { ModalProvider } from "./contexts/ModalContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AddressFormPage } from "./pages/AddressFormPage"
import { AddressProvider } from "./contexts/AddressContext"

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{
        path: "/",
        element: <HomePage />
      },
      {
        path: "/catalogo",
        element: <CatalogPage />
      },
      {
        path: "/sobre",
        element: <AboutPage />
      },
      {
        path: "/contato",
        element: <ContactPage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/cadastro",
        element: <RegisterPage />
      },
      {
        path: "/carrinho",
        element: <ShoppingCartPage />
      },
      {
        path: "/perfil",
        element: <ProfilePage />
      },
      {
        path: "/historico-de-pedidos",
        element: <OrderHistoryPage />
      },
      {
        path: "/favoritos",
        element: <FavoritesPage />
      },
      {
        path: "/novo-endereco",
        element: <AddressFormPage />
      },
      {
        path: "/editar-endereco/:id",
        element: <AddressFormPage />
      },
      ]
    }
  ])

  return (
    <AuthProvider>
      <ThemeProvider>
        <AddressProvider>
          <ModalProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </ModalProvider>
        </AddressProvider>
      </ThemeProvider>
    </AuthProvider>
  )

}

