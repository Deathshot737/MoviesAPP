import type { movieInterface } from "../../interfaces/movieInterface";

export interface movieCardProps {
    movie: movieInterface;
    onEdit?: (movie: movieInterface) => void;
    onDelete?: (id: string) => void;
}