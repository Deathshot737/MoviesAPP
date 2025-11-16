// formalario modal para agregar peliculas y editar peliculas
import { useContext, useState } from 'react'
import { isOpenContext } from '../../context/isOpenContext';
import type { movieInterface } from '../../interfaces/movieInterface';
import { createMovie } from '../../services/servicesMovies';

export const MovieModal = ({ onCreated }: { onCreated?: () => void }) => {
    const isOpencontext = useContext(isOpenContext);
    if (!isOpencontext) throw new Error('ToggleButton debe estar dentro de IsOpenProvider');

    const { handleClose } = isOpencontext;
    const [submitting, setSubmitting] = useState(false);

    // convertir el archivo de imagen en base64
    const convertFileToBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }
    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        try {
            const form = ev.currentTarget;
            const data = new FormData(form);
            const posterFile = data.get('poster');
            const movie: movieInterface = {
                Title: String(data.get('title') || ''),
                Year: String(data.get('year') || ''),
                Type: String(data.get('type') || ''),
                Poster: ''
            };
            if (posterFile instanceof File && posterFile.size > 0) {
                movie.Poster = await convertFileToBase64(posterFile) as string;
            }
            await createMovie(movie);
            onCreated?.();
            handleClose();
        } catch (err) {
            console.error('Error creating movie', err);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <>
            <div className="modal-panel">
                <div className="modal-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ margin: 0 }}>Agregar película</h2>
                        <button className="btn" onClick={() => handleClose()} aria-label="Cerrar">✕</button>
                    </div>
                    <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
                        <label htmlFor="title">Título</label>
                        <input type="text" id='title' name='title' required />

                        <label htmlFor="year">Año</label>
                        <input type="number" id='year' name='year' defaultValue="2023" required />

                        <label htmlFor="type">Tipo</label>
                        <select name="type" id="type" required>
                            <option value="Accion">accion</option>
                            <option value="Romantica">Romantica </option>
                            <option value="Miedo">Miedo</option>
                        </select>

                        <label htmlFor="poster">Poster</label>
                        <input type="file" name="poster" id="poster" accept="image/*" required />

                        <button type="submit" className="btn btn--primary btn--save" disabled={submitting}>
                            {submitting ? 'Guardando…' : 'Guardar'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}