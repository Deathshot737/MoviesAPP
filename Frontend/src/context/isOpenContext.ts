import { createContext } from 'react';

export const isOpenContext = createContext<{
    isOpen: boolean;
    handleClose: () => void;
    handleOpen: () => void;
} | undefined>(undefined);
