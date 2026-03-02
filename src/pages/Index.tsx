import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Code, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container px-4 max-w-3xl text-center">
          <p className="text-sm font-mono text-accent mb-4 tracking-wider uppercase">
            Learn to code. Properly.
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
            Coding a day keeps<br />a fail away
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            Theoicode is a structured, no-nonsense programming course built on proven learning science. 
            Theory, daily practice, rigorous testing — no gamification, no shortcuts.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/courses">
                Start Learning
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/curriculum/python">
                View Curriculum
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="py-16 border-t bg-card">
        <div className="container px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-semibold text-foreground text-center mb-2">
            The Method
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-12">
            Based on Marty Lobdell's "Study Less, Study Smart" principles
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4">
                <BookOpen size={22} className="text-foreground" />
              </div>
              <h3 className="font-serif font-semibold text-foreground mb-2">
                1. Theory
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Short, focused sessions. Understand the concept before you touch any code. 
                Active engagement over passive reading.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4">
                <Code size={22} className="text-foreground" />
              </div>
              <h3 className="font-serif font-semibold text-foreground mb-2">
                2. Daily Practice
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Write code every day. Short 5–20 line scripts that reinforce what you learned. 
                Spaced repetition builds lasting knowledge.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-4">
                <ClipboardCheck size={22} className="text-foreground" />
              </div>
              <h3 className="font-serif font-semibold text-foreground mb-2">
                3. Rigorous Testing
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Auto-graded assessments with immediate pass/fail feedback. 
                No partial credit — you either understand it or you don't.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-16 border-t">
        <div className="container px-4 max-w-4xl">
          <h2 className="font-serif text-2xl font-semibold text-foreground text-center mb-2">
            Three Tracks
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-10">
            Choose your language. Same rigorous method.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "🐍", name: "Python", id: "python" },
              { icon: "⚡", name: "JavaScript", id: "javascript" },
              { icon: "☕", name: "Java", id: "java" },
            ].map((lang) => (
              <Link
                key={lang.id}
                to={`/curriculum/${lang.id}`}
                className="flex items-center gap-3 p-4 border rounded-lg bg-card hover:border-accent transition-colors group"
              >
                <span className="text-2xl">{lang.icon}</span>
                <div>
                  <span className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {lang.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">12 levels · 450+ exercises</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 border-t bg-card">
        <div className="container px-4 max-w-2xl">
          <h2 className="font-serif text-2xl font-semibold text-foreground text-center mb-8">
            Our Principles
          </h2>
          <div className="space-y-4">
            {[
              "No gamification. Learning is the reward.",
              "Short focused sessions beat marathon study.",
              "Understanding over memorization.",
              "Write code every single day.",
              "Immediate feedback. No ambiguity.",
              "Works offline. No excuses.",
            ].map((principle) => (
              <div key={principle} className="flex items-start gap-3 text-sm">
                <span className="text-accent mt-0.5 font-mono text-xs">—</span>
                <span className="text-foreground/80">{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
