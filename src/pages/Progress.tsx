import Layout from "@/components/Layout";
import { LEVELS } from "@/data/curriculum";

export default function Progress() {
  const completedLevels = 2;
  const totalExercises = LEVELS.reduce((sum, l) => sum + l.exerciseCount, 0);
  const completedExercises = LEVELS.slice(0, completedLevels).reduce((sum, l) => sum + l.exerciseCount, 0);
  const progressPercent = Math.round((completedLevels / LEVELS.length) * 100);

  return (
    <Layout>
      <div className="container px-4 py-12 max-w-3xl">
        <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
          Your Progress
        </h1>
        <p className="text-muted-foreground mb-10">
          Track your journey through the curriculum.
        </p>

        {/* Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Levels Completed", value: `${completedLevels}/${LEVELS.length}` },
            { label: "Exercises Done", value: `${completedExercises}/${totalExercises}` },
            { label: "Current Streak", value: "5 days" },
            { label: "Assessments Passed", value: `${completedLevels}` },
          ].map((stat) => (
            <div key={stat.label} className="p-4 border rounded-lg bg-card text-center">
              <p className="text-2xl font-serif font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{progressPercent}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Level breakdown */}
        <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
          Level Breakdown
        </h2>
        <div className="space-y-2">
          {LEVELS.map((level, i) => {
            const isCompleted = i < completedLevels;
            const isCurrent = i === completedLevels;
            return (
              <div
                key={level.id}
                className={`flex items-center gap-3 p-3 rounded-lg border text-sm ${
                  isCompleted
                    ? "bg-success/5 border-success/20"
                    : isCurrent
                    ? "bg-accent/5 border-accent/30"
                    : "bg-card border-border opacity-50"
                }`}
              >
                <span className="font-mono text-xs text-muted-foreground w-6">
                  {String(level.id).padStart(2, "0")}
                </span>
                <span className="flex-1 text-foreground">
                  {level.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {isCompleted ? "✓ Complete" : isCurrent ? "In Progress" : "Locked"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
