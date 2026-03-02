import { Link } from "react-router-dom";
import { Level, Language } from "@/data/curriculum";
import { Lock, Check } from "lucide-react";

const categoryStyles: Record<Level["category"], string> = {
  foundation: "level-indicator level-indicator--foundation",
  core: "level-indicator level-indicator--core",
  intermediate: "level-indicator level-indicator--intermediate",
  advanced: "level-indicator level-indicator--advanced",
};

const categoryLabels: Record<Level["category"], string> = {
  foundation: "Foundation",
  core: "Core",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function LevelCard({ level, language }: { level: Level; language: Language }) {
  const isLocked = level.locked;
  const isCompleted = level.completed;

  const content = (
    <div
      className={`border rounded-lg p-5 transition-colors ${
        isLocked
          ? "opacity-50 cursor-not-allowed bg-muted"
          : isCompleted
          ? "bg-card border-success/30"
          : "bg-card hover:border-accent cursor-pointer"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-muted-foreground">
            {String(level.id).padStart(2, "0")}
          </span>
          <span className={categoryStyles[level.category]}>
            {categoryLabels[level.category]}
          </span>
        </div>
        {isLocked && <Lock size={14} className="text-muted-foreground" />}
        {isCompleted && <Check size={14} className="text-success" />}
      </div>
      <h3 className="font-serif text-lg font-semibold text-foreground mb-1.5">
        {level.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        {level.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {level.topics.slice(0, 4).map((topic) => (
          <span key={topic} className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded">
            {topic}
          </span>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">
        {level.exerciseCount} exercises
      </div>
    </div>
  );

  if (isLocked) return content;

  return (
    <Link to={`/lesson/${language}/${level.id}`}>
      {content}
    </Link>
  );
}
