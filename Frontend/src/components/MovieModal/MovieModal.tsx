// formalario modal para agregar peliculas y editar peliculas
import { useContext } from 'react'
import { isOpenContext } from '../../context/isOpenContext';
import type { movieInterface } from '../../interfaces/movieInterface';

export const MovieModal = () => {
    const isOpencontext = useContext(isOpenContext);
    if (!isOpencontext) throw new Error('ToggleButton debe estar dentro de IsOpenProvider');

    const { handleClose } = isOpencontext;

    // convertir el archivo de imagen en base64
    const convertFileToBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }
    const handleSubmit = async (e: FormData) => {
        const movie: movieInterface = {
            Title: e.get('title') as string,
            Year: e.get('year') as string,
            Type: e.get('type') as string,
            Poster: ''
        }
        movie.Poster = await convertFileToBase64(e.get('poster') as File) as string;
        console.log(movie);
    }
    return (
        <>
            <span onClick={() => handleClose()} >x</span>
            <form action={(e: FormData) => handleSubmit(e)}>
                <label htmlFor="title"></label>
                <input type="text" id='title' name='title' required />
                <label htmlFor="year"></label>
                <input type="number" id='year' name='year' defaultValue="2023" required />
                <label htmlFor="type"></label>
                <select name="type" id="type" required>
                    <option value="Action">Accion</option>
                </select>
                <label htmlFor="poster"></label>
                <input type="file" name="poster" id="poster" required />
                <button type="submit">Guardar</button>
            </form>
        </>
    )
}