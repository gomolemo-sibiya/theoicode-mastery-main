export type Language = "python" | "javascript" | "java";

export interface Course {
  id: Language;
  name: string;
  description: string;
  icon: string;
}

export interface Level {
  id: number;
  title: string;
  category: "foundation" | "core" | "intermediate" | "advanced";
  description: string;
  topics: string[];
  exerciseCount: number;
  completed?: boolean;
  locked?: boolean;
}

export interface Lesson {
  id: string;
  levelId: number;
  title: string;
  content: string;
  codeExample?: string;
}

export interface Exercise {
  id: string;
  levelId: number;
  title: string;
  description: string;
  starterCode: string;
  expectedOutput: string;
  hints: string[];
  testCases: { input: string; expectedOutput: string }[];
}

export const COURSES: Course[] = [
  {
    id: "python",
    name: "Python",
    description: "Begin your programming journey with Python — clean syntax, powerful capabilities, and the most beginner-friendly language available.",
    icon: "🐍",
  },
  {
    id: "javascript",
    name: "JavaScript",
    description: "Learn the language of the web. Build interactive experiences and understand how modern applications work.",
    icon: "⚡",
  },
  {
    id: "java",
    name: "Java",
    description: "Master enterprise-grade programming with Java's structured, object-oriented approach to software development.",
    icon: "☕",
  },
];

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Problem Decomposition",
    category: "foundation",
    description: "Learn to break complex problems into smaller, manageable steps before writing any code.",
    topics: ["Breaking down problems", "Pseudocode", "Algorithmic thinking", "Step-by-step planning"],
    exerciseCount: 35,
  },
  {
    id: 2,
    title: "Variables & Data Types",
    category: "core",
    description: "Understand how programs store and manipulate data using variables and different data types.",
    topics: ["Variable declaration", "Integers & floats", "Strings", "Type conversion", "Naming conventions"],
    exerciseCount: 40,
  },
  {
    id: 3,
    title: "Operators & Expressions",
    category: "core",
    description: "Master arithmetic, comparison, and logical operators to build meaningful expressions.",
    topics: ["Arithmetic operators", "Comparison operators", "Logical operators", "Operator precedence"],
    exerciseCount: 38,
  },
  {
    id: 4,
    title: "Conditionals",
    category: "core",
    description: "Make your programs make decisions using if-else statements and conditional logic.",
    topics: ["if statements", "if-else", "elif/else-if chains", "Nested conditions", "Boolean logic"],
    exerciseCount: 42,
  },
  {
    id: 5,
    title: "Loops",
    category: "core",
    description: "Automate repetitive tasks with for loops and while loops.",
    topics: ["for loops", "while loops", "Loop control", "Nested loops", "Iteration patterns"],
    exerciseCount: 45,
  },
  {
    id: 6,
    title: "Functions",
    category: "core",
    description: "Organize code into reusable blocks with functions, parameters, and return values.",
    topics: ["Defining functions", "Parameters", "Return values", "Scope", "Built-in functions"],
    exerciseCount: 40,
  },
  {
    id: 7,
    title: "Lists & Arrays",
    category: "intermediate",
    description: "Work with collections of data using lists and array operations.",
    topics: ["Creating lists", "Indexing & slicing", "List methods", "Iteration", "List comprehensions"],
    exerciseCount: 42,
  },
  {
    id: 8,
    title: "Dictionaries & Maps",
    category: "intermediate",
    description: "Store key-value pairs and build structured data representations.",
    topics: ["Creating dictionaries", "Accessing values", "Iteration", "Nested structures"],
    exerciseCount: 38,
  },
  {
    id: 9,
    title: "File I/O",
    category: "intermediate",
    description: "Read from and write to files, enabling persistent data handling.",
    topics: ["Opening files", "Reading data", "Writing data", "File modes", "CSV handling"],
    exerciseCount: 35,
  },
  {
    id: 10,
    title: "Error Handling",
    category: "intermediate",
    description: "Write robust code that gracefully handles errors and unexpected input.",
    topics: ["Try-except blocks", "Exception types", "Raising exceptions", "Debugging strategies"],
    exerciseCount: 35,
  },
  {
    id: 11,
    title: "Code Organization",
    category: "intermediate",
    description: "Structure your code for readability, maintainability, and collaboration.",
    topics: ["Modules", "Code style", "Documentation", "Refactoring", "Testing basics"],
    exerciseCount: 30,
  },
  {
    id: 12,
    title: "Object-Oriented Programming",
    category: "advanced",
    description: "Model real-world concepts with classes, objects, and inheritance.",
    topics: ["Classes & objects", "Attributes & methods", "Inheritance", "Encapsulation", "Polymorphism"],
    exerciseCount: 45,
  },
];

export const SAMPLE_LESSON: Lesson = {
  id: "l2-1",
  levelId: 2,
  title: "Understanding Variables",
  content: `## What is a Variable?

A variable is a named container that stores a value in your program's memory. Think of it as a labeled box — you put something inside, and you can retrieve or change it later using the label.

## Why Variables Matter

Without variables, programs would have no way to remember information. Every calculation, every user input, every piece of data needs to be stored somewhere. Variables give us that storage.

## Creating Variables

In Python, creating a variable is straightforward. You choose a name, use the assignment operator (=), and provide a value:

\`\`\`python
age = 25
name = "Alice"
temperature = 98.6
is_student = True
\`\`\`

Notice that you don't need to declare the type — Python figures it out automatically. This is called **dynamic typing**.

## Naming Rules

Variable names must follow these rules:
- Start with a letter or underscore
- Contain only letters, numbers, and underscores
- Cannot be a Python keyword (like \`if\`, \`for\`, \`while\`)

Good names describe what the variable holds. \`student_count\` is better than \`x\`.

## Reassigning Variables

Variables can change their value at any time:

\`\`\`python
score = 0
score = score + 10
print(score)  # Output: 10
\`\`\`

The old value is simply replaced by the new one.`,
};

export const SAMPLE_EXERCISES: Exercise[] = [
  {
    id: "e2-1",
    levelId: 2,
    title: "Store and Print",
    description: "Create a variable called `greeting` that stores the text \"Hello, World!\" and print it.",
    starterCode: "# Create a variable called greeting\n# Print the variable\n",
    expectedOutput: "Hello, World!",
    hints: [
      "Use the assignment operator (=) to store a value",
      "Use the print() function to display the value",
    ],
    testCases: [
      { input: "", expectedOutput: "Hello, World!" },
    ],
  },
  {
    id: "e2-2",
    levelId: 2,
    title: "Swap Values",
    description: "Given two variables `a = 5` and `b = 10`, swap their values so that `a` becomes 10 and `b` becomes 5. Print both values.",
    starterCode: "a = 5\nb = 10\n\n# Swap the values of a and b\n\nprint(a)\nprint(b)",
    expectedOutput: "10\n5",
    hints: [
      "You'll need a temporary variable to hold one value during the swap",
      "Python also supports tuple unpacking: a, b = b, a",
    ],
    testCases: [
      { input: "", expectedOutput: "10\n5" },
    ],
  },
  {
    id: "e2-3",
    levelId: 2,
    title: "Calculate Area",
    description: "Create variables `width` and `height` with values 8 and 5 respectively. Calculate the area and store it in a variable called `area`. Print the area.",
    starterCode: "# Create width and height variables\n# Calculate the area\n# Print the result\n",
    expectedOutput: "40",
    hints: [
      "Area of a rectangle = width × height",
      "Use the * operator for multiplication",
    ],
    testCases: [
      { input: "", expectedOutput: "40" },
    ],
  },
];
