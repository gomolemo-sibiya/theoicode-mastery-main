import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";
import DesktopEnforcer from "@/components/DesktopEnforcer";
import CodeEditor from "@/components/CodeEditor";
import { LEVELS, Language } from "@/data/curriculum";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface TestQuestion {
  id: number;
  type: "code" | "output";
  question: string;
  starterCode?: string;
  expectedOutput: string;
  options?: string[];
}

const SAMPLE_TEST: TestQuestion[] = [
  {
    id: 1,
    type: "output",
    question: "What will the following code output?",
    starterCode: 'x = 5\ny = 3\nprint(x + y)',
    expectedOutput: "8",
    options: ["8", "53", "Error", "None"],
  },
  {
    id: 2,
    type: "code",
    question: "Write code that creates a variable `total` equal to 15 + 27, then prints the result.",
    starterCode: "# Write your code here\n",
    expectedOutput: "42",
  },
  {
    id: 3,
    type: "output",
    question: "What will this code output?",
    starterCode: 'name = "Code"\nprint("Hello, " + name)',
    expectedOutput: "Hello, Code",
    options: ["Hello, Code", "Hello, name", "Error", "Hello, + name"],
  },
];

export default function Assessment() {
  const { language, levelId } = useParams<{ language: string; levelId: string }>();
  const lang = (language || "python") as Language;
  const level = LEVELS.find((l) => l.id === Number(levelId));
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const question = SAMPLE_TEST[currentQ];

  const handleSelectOption = (option: string) => {
    setAnswers({ ...answers, [question.id]: option });
  };

  const handleSubmit = () => {
    let correct = 0;
    SAMPLE_TEST.forEach((q) => {
      if (q.type === "output" && answers[q.id] === q.expectedOutput) {
        correct++;
      } else if (q.type === "code" && answers[q.id]) {
        // Simplified check
        if (answers[q.id]?.includes("print")) correct++;
      }
    });
    setScore(correct);
    setSubmitted(true);
  };

  if (!level) {
    return (
      <Layout>
        <div className="container px-4 py-12 text-center">
          <p className="text-muted-foreground">Assessment not found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <DesktopEnforcer>
        <div className="container px-4 py-8 max-w-3xl">
          <Link
            to={`/curriculum/${lang}`}
            className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block"
          >
            ← Back to Curriculum
          </Link>

          <div className="mb-8">
            <h1 className="font-serif text-2xl font-semibold text-foreground mb-1">
              Level {String(level.id).padStart(2, "0")} Assessment
            </h1>
            <p className="text-sm text-muted-foreground">
              {SAMPLE_TEST.length} questions · Pass/Fail · No partial credit
            </p>
          </div>

          {!submitted ? (
            <>
              {/* Progress */}
              <div className="flex gap-1 mb-8">
                {SAMPLE_TEST.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      i === currentQ
                        ? "bg-accent"
                        : answers[SAMPLE_TEST[i].id]
                        ? "bg-primary/40"
                        : "bg-border"
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <div className="mb-6">
                <p className="text-xs font-mono text-muted-foreground mb-3">
                  Question {currentQ + 1} of {SAMPLE_TEST.length}
                </p>
                <h2 className="font-serif text-lg font-semibold text-foreground mb-4">
                  {question.question}
                </h2>

                {question.starterCode && question.type === "output" && (
                  <pre className="p-4 rounded-lg mb-6 text-sm code-editor">
                    <code>{question.starterCode}</code>
                  </pre>
                )}

                {question.type === "output" && question.options && (
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleSelectOption(option)}
                        className={`w-full text-left px-4 py-3 border rounded-lg text-sm transition-colors ${
                          answers[question.id] === option
                            ? "border-accent bg-accent/10 text-foreground"
                            : "border-border bg-card text-foreground hover:border-muted-foreground"
                        }`}
                      >
                        <span className="font-mono">{option}</span>
                      </button>
                    ))}
                  </div>
                )}

                {question.type === "code" && (
                  <CodeEditor
                    initialCode={question.starterCode || ""}
                    onRun={(code) => setAnswers({ ...answers, [question.id]: code })}
                    output={answers[question.id] ? "Code saved." : undefined}
                  />
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentQ === 0}
                  onClick={() => setCurrentQ(currentQ - 1)}
                >
                  Previous
                </Button>

                {currentQ < SAMPLE_TEST.length - 1 ? (
                  <Button
                    size="sm"
                    onClick={() => setCurrentQ(currentQ + 1)}
                    className="bg-primary text-primary-foreground"
                  >
                    Next
                    <ChevronRight size={14} className="ml-1" />
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleSubmit}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Submit Assessment
                  </Button>
                )}
              </div>
            </>
          ) : (
            /* Results */
            <div className="text-center py-12">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 text-2xl font-serif font-bold ${
                  score === SAMPLE_TEST.length
                    ? "bg-success/10 text-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {score}/{SAMPLE_TEST.length}
              </div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                {score === SAMPLE_TEST.length ? "Pass" : "Fail"}
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                {score === SAMPLE_TEST.length
                  ? "You've demonstrated understanding of this level's concepts."
                  : "Review the material and try again. Understanding requires practice."}
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button asChild variant="outline">
                  <Link to={`/lesson/${lang}/${level.id}`}>Review Lesson</Link>
                </Button>
                <Button asChild className="bg-primary text-primary-foreground">
                  <Link to={`/curriculum/${lang}`}>Back to Curriculum</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DesktopEnforcer>
    </Layout>
  );
}
