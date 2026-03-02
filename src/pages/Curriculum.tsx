import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import LevelCard from "@/components/LevelCard";
import { LEVELS, COURSES, Language } from "@/data/curriculum";

export default function Curriculum() {
  const { language } = useParams<{ language: string }>();
  const lang = (language || "python") as Language;
  const course = COURSES.find((c) => c.id === lang);

  if (!course) {
    return (
      <Layout>
        <div className="container px-4 py-12 text-center">
          <p className="text-muted-foreground">Course not found.</p>
          <Link to="/courses" className="text-accent text-sm mt-2 inline-block">
            ← Back to courses
          </Link>
        </div>
      </Layout>
    );
  }

  // Simulate progress: first 2 levels completed, rest unlocked except last 2
  const levelsWithProgress = LEVELS.map((level, i) => ({
    ...level,
    completed: i < 2,
    locked: i > 8,
  }));

  const categories = ["foundation", "core", "intermediate", "advanced"] as const;
  const categoryLabels = {
    foundation: "Foundation",
    core: "Core Fundamentals",
    intermediate: "Data Structures & Practical Skills",
    advanced: "Advanced Concepts",
  };

  return (
    <Layout>
      <div className="container px-4 py-12 max-w-4xl">
        <div className="mb-10">
          <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block">
            ← All Courses
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{course.icon}</span>
            <h1 className="font-serif text-3xl font-semibold text-foreground">
              {course.name} Curriculum
            </h1>
          </div>
          <p className="text-muted-foreground">
            12 levels from problem decomposition to object-oriented programming.
          </p>
        </div>

        {categories.map((cat) => {
          const catLevels = levelsWithProgress.filter((l) => l.category === cat);
          if (catLevels.length === 0) return null;
          return (
            <div key={cat} className="mb-10">
              <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
                {categoryLabels[cat]}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {catLevels.map((level) => (
                  <LevelCard key={level.id} level={level} language={lang} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
