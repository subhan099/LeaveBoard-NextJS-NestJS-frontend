import "../styles/globals.css";
import { useState } from "react";
import { Inter } from "next/font/google";
import Authenticator from "../AuthService/authService";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  return (
    <main className={inter.className}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Authenticator>
            <Component {...pageProps} />
          </Authenticator>
        </PersistGate>
      </Provider>
    </main>
  );
}
