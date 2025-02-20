import React from "react";
import AppRutas from "./src/componentes/rutas/AppRutas";
import { LogBox, StyleSheet } from "react-native";
import { Color } from "./src/estilos/colores";
import { ToastProvider } from "./src/providers/toast-provider/ToastProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Auth0Provider } from '@auth0/auth0-react'

const App = () => {
  LogBox.ignoreAllLogs()

  return (
    <Auth0Provider
        domain="dev-1pljdi65rakmf8sh.us.auth0.com"
        clientId="j7mIyfGfVHXKG54YKyg15dEjKnits9DA"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
    >
      <SafeAreaProvider>
        <ToastProvider>
          <AppRutas />
        </ToastProvider>
      </SafeAreaProvider>
    </Auth0Provider>
  );
};

export default App;
