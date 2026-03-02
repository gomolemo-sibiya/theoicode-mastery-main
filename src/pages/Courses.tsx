import Layout from "@/components/Layout";
import CourseCard from "@/components/CourseCard";
import { COURSES } from "@/data/curriculum";

export default function Courses() {
  return (
    <Layout>
      <div className="container px-4 py-12 max-w-4xl">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">
            Choose Your Language
          </h1>
          <p className="text-muted-foreground">
            Each track follows the same proven curriculum structure. Pick the language that fits your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-12 p-6 bg-secondary rounded-lg">
          <h2 className="font-serif text-lg font-semibold text-foreground mb-2">
            Not sure which to pick?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong>Python</strong> is recommended for beginners — its clean syntax lets you focus on programming concepts 
            without getting bogged down in language-specific details. JavaScript is ideal if you're interested in web development. 
            Java is best for those heading into enterprise or Android development.
          </p>
        </div>
      </div>
    </Layout>
  );
}
