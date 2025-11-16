// formalario modal para agregar peliculas y editar peliculas
import { useContext, useState } from 'react'
import { isOpenContext } from '../../context/isOpenContext';
import type { movieInterface } from '../../interfaces/movieInterface';
import { createMovie, updateMovie } from '../../services/servicesMovies';

export const MovieModal = ({ onCreated, editingMovie, onClose }: { onCreated?: () => void, editingMovie?: movieInterface, onClose?: () => void }) => {
    const isOpencontext = useContext(isOpenContext);
    if (!isOpencontext) throw new Error('ToggleButton debe estar dentro de IsOpenProvider');

    const { handleClose } = isOpencontext;
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        try {
            const form = ev.currentTarget;
            const data = new FormData(form);
            let poster = String(data.get('poster') || '');
            if (editingMovie && !poster) poster = editingMovie.Poster;
            const payload: movieInterface = {
                Title: String(data.get('title') || ''),
                Year: String(data.get('year') || ''),
                Type: String(data.get('type') || ''),
                Poster: poster
            };

            if (editingMovie?._id) {
                await updateMovie(editingMovie._id, payload);
            } else {
                await createMovie(payload);
            }
            onCreated?.();
            handleClose();
            onClose?.();
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
                        <h2 style={{ margin: 0 }}>{editingMovie ? 'Editar película' : 'Agregar película'}</h2>
                        <button className="btn" onClick={() => { handleClose(); onClose?.(); }} aria-label="Cerrar">✕</button>
                    </div>
                    <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
                        <label htmlFor="title">Título</label>
                        <input type="text" id='title' name='title' defaultValue={editingMovie?.Title} required />

                        <label htmlFor="year">Año</label>
                        <input type="number" id='year' name='year' defaultValue={editingMovie?.Year ?? "2023"} required />

                        <label htmlFor="type">Tipo</label>
                        <select name="type" id="type" defaultValue={editingMovie?.Type ?? 'Accion'} required>
                            <option value="Accion">Accion</option>
                            <option value="Romantica">Romantica </option>
                            <option value="Miedo">Miedo</option>
                        </select>

                        <label htmlFor="poster">Poster {editingMovie ? '(dejar vacío para mantener)' : ''}</label>
                        <input
                            type="url"
                            name="poster"
                            id="poster"
                            defaultValue={editingMovie?.Poster}
                            required={!editingMovie}
                        />

                        <button type="submit" className="btn btn--primary btn--save" disabled={submitting}>
                            {submitting ? 'Guardando…' : 'Guardar'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}