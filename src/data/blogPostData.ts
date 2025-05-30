import type { BlogPost } from "../types/content";

// Hard-coded blog posts to get started
export const blogPosts: BlogPost[] = [
  {
    slug: "getting-started-with-react",
    title: "Getting Started with React",
    date: "2025-05-20",
    content: `
# Getting Started with React

React is a JavaScript library for building user interfaces. Created by Facebook, it's now one of the most popular frontend libraries in the world.

## Why React?

React offers several advantages:

- **Component-Based**: Build encapsulated components that manage their own state, then compose them to make complex UIs.
- **Declarative**: Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
- **Learn Once, Write Anywhere**: Develop new features in React without rewriting existing code.

## Setting Up Your First React App

The easiest way to start with React is by using Create React App:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

This creates a new React application and starts a development server.

## Creating Your First Component

Components are the building blocks of any React application. Here's a simple component:

\`\`\`jsx
import React from "react";

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Greeting;
\`\`\`

You can use this component in another component like this:

\`\`\`jsx
import Greeting from "./Greeting";

function App() {
  return (
    <div>
      <Greeting name="World" />
    </div>
  );
}
\`\`\`

## Using State

State allows React components to change their output over time in response to user actions, network responses, and anything else.

\`\`\`jsx
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
\`\`\`

## Next Steps

From here, you might want to learn about:

- React Router for navigation
- State management with Context API or Redux
- Styling in React with CSS-in-JS libraries
- Server-side rendering with Next.js

React has a thriving ecosystem and community, making it a great choice for modern web development.
    `,
    excerpt:
      "Learn the basics of React and build your first component in this beginner-friendly guide.",
    tags: ["React", "JavaScript", "Frontend"],
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices for 2025",
    date: "2025-05-25",
    content: `
# TypeScript Best Practices for 2025

TypeScript continues to grow in popularity, and for good reasons. It adds static typing to JavaScript, helping you catch errors early and making your code more robust. Here are some best practices to follow in 2025.

## Use Strict Mode

Always enable strict mode in your TypeScript projects:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
    // other options...
  }
}
\`\`\`

This enables a suite of type checking behaviors that catch more errors during compilation.

## Leverage Type Inference

TypeScript has powerful type inference. Use it when the types are obvious:

\`\`\`typescript
// Good - TypeScript infers the correct types
const name = "John";
const age = 30;
const isActive = true;

// Avoid unnecessary annotations when inference works well
const items = [1, 2, 3]; // TypeScript infers number[]
\`\`\`

## Be Explicit When Necessary

While inference is great, sometimes being explicit leads to better documentation and clarity:

\`\`\`typescript
// Explicit function parameter and return types
function calculateTotal(prices: number[]): number {
  return prices.reduce((sum, price) => sum + price, 0);
}

// Explicit for complex objects
interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
  };
}
\`\`\`

## Use Union Types and Type Narrowing

Union types and type narrowing create flexible yet type-safe code:

\`\`\`typescript
type Status = "pending" | "success" | "error";

function handleResponse(status: Status, data: any) {
  // TypeScript knows all the possible values of status
  if (status === "success") {
    // Work with data
  } else if (status === "error") {
    // Handle error
  } else {
    // Must be "pending"
    console.log("Operation in progress...");
  }
}
\`\`\`

## Avoid \`any\` Type

The \`any\` type defeats the purpose of using TypeScript. Instead, use:

- \`unknown\` for values of uncertain type that require narrowing
- Proper type definitions
- Generics for flexible typing

\`\`\`typescript
// Bad
function parseData(data: any) {
  return JSON.parse(data);
}

// Good
function parseData<T>(data: string): T {
  return JSON.parse(data) as T;
}

// Usage
interface UserData {
  name: string;
  email: string;
}

const userData = parseData<UserData>(
  '{"name":"John","email":"john@example.com"}'
);
\`\`\`

## Use Interfaces for Object Shapes

For defining object shapes, interfaces are often more flexible than types:

\`\`\`typescript
// Interface can be extended
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
}

// Types can use unions and intersections
type Status = "active" | "inactive";
type PersonWithStatus = Person & { status: Status };
\`\`\`

## Nullish Handling

Use TypeScript to handle null and undefined values explicitly:

\`\`\`typescript
// Use optional parameters with default values
function greet(name?: string) {
  return \`Hello, \${name ?? "Guest"}!\`;
}

// Optional chaining and nullish coalescing
const userDisplayName = user?.profile?.displayName ?? "Anonymous";
\`\`\`

## Type Guards for Runtime Safety

TypeScript's static typing doesn't help at runtime. Use type guards:

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function processInput(input: unknown) {
  if (isString(input)) {
    // TypeScript knows input is a string here
    return input.toUpperCase();
  }
  throw new Error("Input must be a string");
}
\`\`\`

## Typing Async Code

For async operations, properly type your Promises:

\`\`\`typescript
async function fetchUserData(userId: string): Promise<UserData> {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) {
    throw new Error(\`Failed to fetch user: \${response.statusText}\`);
  }
  return response.json();
}
\`\`\`

## Keep Types DRY

Extract common types to avoid repetition:

\`\`\`typescript
// Shared types in a separate file
export interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

// Usage
import type { ApiResponse } from "./types";

interface UserData {
  id: string;
  name: string;
}

async function fetchUser(): Promise<ApiResponse<UserData>> {
  // Implementation...
}
\`\`\`

By following these practices, you'll write more maintainable and robust TypeScript code in 2025 and beyond.
    `,
    excerpt:
      "Discover the most effective TypeScript patterns and practices to improve your code quality and developer experience.",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];
