---
title: Getting Started with React
date: "2025-05-20"
slug: "getting-started-with-react"
excerpt: "Learn the basics of React and build your first component in this beginner-friendly guide."
tags: ["React", "JavaScript", "Frontend"]
coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
---

# Getting Started with React

React is a JavaScript library for building user interfaces. Created by Facebook, it's now one of the most popular frontend libraries in the world.

## Why React?

React offers several advantages:

- **Component-Based**: Build encapsulated components that manage their own state, then compose them to make complex UIs.
- **Declarative**: Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
- **Learn Once, Write Anywhere**: Develop new features in React without rewriting existing code.

## Setting Up Your First React App

The easiest way to start with React is by using Create React App:

```bash
npx create-react-app my-app
cd my-app
npm start
```

This creates a new React application and starts a development server.

## Creating Your First Component

Components are the building blocks of any React application. Here's a simple component:

```jsx
import React from "react";

function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Greeting;
```

You can use this component in another component like this:

```jsx
import Greeting from "./Greeting";

function App() {
  return (
    <div>
      <Greeting name="World" />
    </div>
  );
}
```

## Using State

State allows React components to change their output over time in response to user actions, network responses, and anything else.

```jsx
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
```

## Next Steps

From here, you might want to learn about:

- React Router for navigation
- State management with Context API or Redux
- Styling in React with CSS-in-JS libraries
- Server-side rendering with Next.js

React has a thriving ecosystem and community, making it a great choice for modern web development.
