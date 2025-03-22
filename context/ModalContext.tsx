import {createContext, useContext, useState, ReactNode, useMemo} from "react";
import {Movie} from "@/typings"; // Assuming you have a Movie type

interface ModalContextType {
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    currentMovie: Movie | null;
    setCurrentMovie: (movie: Movie | null) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({children}: { children: ReactNode }) {
    const [showModal, setShowModal] = useState(false);
    const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

    const memoedValue = useMemo(
        () => ({showModal, setShowModal, currentMovie, setCurrentMovie}),
        [showModal, currentMovie]
    );

    return (
        <ModalContext.Provider value={memoedValue}>{children}</ModalContext.Provider>
    );
}

export function useModal(): ModalContextType {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}
