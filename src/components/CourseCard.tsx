import { Link } from "react-router-dom";
import { Course } from "@/data/curriculum";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      to={`/curriculum/${course.id}`}
      className="group block border rounded-lg bg-card p-6 hover:border-accent transition-colors"
    >
      <div className="text-4xl mb-4">{course.icon}</div>
      <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
        {course.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {course.description}
      </p>
      <div className="mt-4 text-xs font-medium text-accent">
        Start learning →
      </div>
    </Link>
  );
}
