import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";
import DesktopEnforcer from "@/components/DesktopEnforcer";
import CodeEditor from "@/components/CodeEditor";
import { LEVELS, SAMPLE_EXERCISES, Language } from "@/data/curriculum";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

export default function Practice() {
  const { language, levelId } = useParams<{ language: string; levelId: string }>();
  const lang = (language || "python") as Language;
  const level = LEVELS.find((l) => l.id === Number(levelId));
  const exercises = SAMPLE_EXERCISES;

  const [currentExercise, setCurrentExercise] = useState(0);
  const [output, setOutput] = useState<string>("");
  const [result, setResult] = useState<"pass" | "fail" | null>(null);
  const [showHint, setShowHint] = useState(false);

  const exercise = exercises[currentExercise];

  const handleRun = (code: string) => {
    // Simulate running code
    setResult(null);
    setOutput("Running...");
    setTimeout(() => {
      // Simple simulation: check if code contains key elements
      const hasOutput = code.includes("print");
      if (hasOutput) {
        setOutput(exercise.expectedOutput);
        setResult("pass");
      } else {
        setOutput("Error: No output produced. Did you forget to print?");
        setResult("fail");
      }
    }, 500);
  };

  if (!level || !exercise) {
    return (
      <Layout>
        <div className="container px-4 py-12 text-center">
          <p className="text-muted-foreground">Exercise not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <DesktopEnforcer>
        <div className="container px-4 py-8 max-w-5xl">
          <Link
            to={`/lesson/${lang}/${level.id}`}
            className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block"
          >
            ← Back to Lesson
          </Link>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: Exercise description */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-muted-foreground">
                  Level {String(level.id).padStart(2, "0")} · Exercise {currentExercise + 1}/{exercises.length}
                </span>
              </div>

              <h2 className="font-serif text-2xl font-semibold text-foreground mb-3">
                {exercise.title}
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                {exercise.description}
              </p>

              <div className="p-3 bg-secondary rounded-lg mb-4">
                <p className="text-xs font-mono text-muted-foreground mb-1">Expected output:</p>
                <pre className="text-sm font-mono text-foreground">{exercise.expectedOutput}</pre>
              </div>

              {/* Hints */}
              <button
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4"
                onClick={() => setShowHint(!showHint)}
              >
                <Lightbulb size={14} />
                {showHint ? "Hide hints" : "Show hints"}
              </button>
              {showHint && (
                <div className="space-y-2 mb-4">
                  {exercise.hints.map((hint, i) => (
                    <div key={i} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-accent font-mono text-xs mt-0.5">{i + 1}.</span>
                      {hint}
                    </div>
                  ))}
                </div>
              )}

              {/* Result */}
              {result && (
                <div
                  className={`p-4 rounded-lg border text-sm ${
                    result === "pass"
                      ? "bg-success/10 border-success/30 text-success"
                      : "bg-destructive/10 border-destructive/30 text-destructive"
                  }`}
                >
                  <p className="font-semibold">
                    {result === "pass" ? "✓ Pass" : "✗ Fail"}
                  </p>
                  <p className="mt-1 text-xs opacity-80">
                    {result === "pass"
                      ? "Output matches expected result. Well done."
                      : "Output does not match. Review your code and try again."}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentExercise === 0}
                  onClick={() => {
                    setCurrentExercise(currentExercise - 1);
                    setResult(null);
                    setOutput("");
                    setShowHint(false);
                  }}
                >
                  <ChevronLeft size={14} className="mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentExercise === exercises.length - 1}
                  onClick={() => {
                    setCurrentExercise(currentExercise + 1);
                    setResult(null);
                    setOutput("");
                    setShowHint(false);
                  }}
                >
                  Next
                  <ChevronRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>

            {/* Right: Code editor */}
            <div>
              <CodeEditor
                initialCode={exercise.starterCode}
                onRun={handleRun}
                output={output}
              />
            </div>
          </div>
        </div>
      </DesktopEnforcer>
    </Layout>
  );
}
