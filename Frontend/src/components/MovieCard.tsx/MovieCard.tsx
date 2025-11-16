import type { movieCardProps } from './movieCardInterface';
import './movieCard.css';

export default function MovieCard({ movie }: movieCardProps) {
	return (
		<article className="card">
			<div className="card__image-wrap">
				{movie.Poster ? (
					<img src={movie.Poster} alt={movie.Title} className="card__image" />
				) : (
					<div className="card__placeholder">No Image</div>
				)}
			</div>
			<div className="card__body">
				<h3 className="card__title">{movie.Title}</h3>
				<div className="card__meta">
					<span className="chip">{movie.Type}</span>
					<span className="muted">{movie.Year}</span>
				</div>
			</div>
		</article>
	);
}
