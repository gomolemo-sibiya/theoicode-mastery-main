import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { LEVELS, SAMPLE_LESSON, SAMPLE_EXERCISES, Language } from "@/data/curriculum";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Lesson() {
  const { language, levelId } = useParams<{ language: string; levelId: string }>();
  const lang = (language || "python") as Language;
  const level = LEVELS.find((l) => l.id === Number(levelId));

  if (!level) {
    return (
      <Layout>
        <div className="container px-4 py-12 text-center">
          <p className="text-muted-foreground">Lesson not found.</p>
        </div>
      </Layout>
    );
  }

  // Use sample lesson content for demo
  const lesson = { ...SAMPLE_LESSON, title: `${level.title} — Introduction` };

  return (
    <Layout>
      <div className="container px-4 py-12 max-w-2xl">
        <Link
          to={`/curriculum/${lang}`}
          className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block"
        >
          ← Back to Curriculum
        </Link>

        <div className="mb-8">
          <span className="text-xs font-mono text-muted-foreground">
            Level {String(level.id).padStart(2, "0")}
          </span>
          <h1 className="font-serif text-3xl font-semibold text-foreground mt-1 mb-2">
            {lesson.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Read carefully. Understanding comes before practice.
          </p>
        </div>

        {/* Lesson Content */}
        <article className="prose-lesson">
          {lesson.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return <h2 key={i}>{block.replace("## ", "")}</h2>;
            }
            if (block.startsWith("```")) {
              const codeContent = block.replace(/```\w*\n?/, "").replace(/```$/, "");
              return (
                <pre key={i}>
                  <code>{codeContent}</code>
                </pre>
              );
            }
            if (block.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc list-inside mb-4 space-y-1">
                  {block.split("\n").map((li, j) => (
                    <li key={j} className="text-foreground/85 text-sm">
                      {li.replace("- ", "")}
                    </li>
                  ))}
                </ul>
              );
            }
            // Handle inline code
            const parts = block.split(/(`[^`]+`)/);
            return (
              <p key={i}>
                {parts.map((part, j) =>
                  part.startsWith("`") && part.endsWith("`") ? (
                    <code key={j}>{part.slice(1, -1)}</code>
                  ) : (
                    <span key={j} dangerouslySetInnerHTML={{
                      __html: part.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
                    }} />
                  )
                )}
              </p>
            );
          })}
        </article>

        {/* Continue to Practice */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-semibold text-foreground">Ready to practice?</h3>
              <p className="text-sm text-muted-foreground">
                {SAMPLE_EXERCISES.length} exercises available for this level.
              </p>
            </div>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to={`/practice/${lang}/${level.id}`}>
                Start Practice
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
