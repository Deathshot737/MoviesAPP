import { useState } from "react";
import { isOpenContext } from "../context/isOpenContext";

export const IsOpenProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    return (
        <isOpenContext.Provider value={{ isOpen, handleClose, handleOpen }}>
            {children}
        </isOpenContext.Provider>
    );
};