import {AuthProvider} from "@/hooks/useAuth";
import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ModalProvider} from "@/context/ModalContext";

export default function App({Component, pageProps}: AppProps) {
    return (
        <AuthProvider>
            <ModalProvider>
                <Component {...pageProps} />
            </ModalProvider>
        </AuthProvider>
    );
}
