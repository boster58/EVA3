import CourseCard from "./CourseCard";

const CourseList = ({ courses, favorites, onToggleFavorite }) => {
  if (courses.length === 0) {
    return <p className="message">No se encontraron cursos.</p>;
  }

  return (
    <section className="course-list">
      {courses.map((course) => {
        const isFavorite = favorites.some(
          (fav) => fav.id === course.id
        );

        return (
          <CourseCard
            key={course.id}
            course={course}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
        );
      })}
    </section>
  );
};

export default CourseList;