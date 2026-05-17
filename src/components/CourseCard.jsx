import { sanitizeText } from "../utils/sanitize";

const CourseCard = ({ course, isFavorite, onToggleFavorite }) => {
  const safeTitle = sanitizeText(course.title);
  const safeDescription = sanitizeText(course.description);

  return (
    <article className="course-card">
      <h2>{safeTitle}</h2>
      <p>{safeDescription}</p>
      <small>Docente ID: {course.teacherId}</small>

      <button
        className={isFavorite ? "btn favorite" : "btn"}
        onClick={() => onToggleFavorite(course)}
      >
        {isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      </button>
    </article>
  );
};

export default CourseCard;