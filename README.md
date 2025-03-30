# TooDoo - Advanced Task Management App

## Overview

TooDoo is a high-performance, responsive task management application built with React and Redux. It features an elegant UI with dark mode support, advanced task filtering, natural language processing, calendar view, and more.

## Features

- **Modern UI with Dark Mode**: Clean, intuitive interface that automatically adapts to system preferences
- **Natural Language Processing**: Add tasks with smart parsing (e.g., "Buy milk #grocery +John in Shopping")
- **Calendar View**: Visualize tasks in a monthly calendar layout
- **Advanced Filtering**: Filter tasks by status, priority, date range, and category
- **Performance Optimized**: Leverages React memo, useCallback, and useMemo for minimal rerenders
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Categorization**: Organize tasks by custom categories
- **Tagging System**: Add tags to tasks for better organization
- **Collaboration**: Assign tasks to partners/collaborators
- **Priority Levels**: Set High, Medium, or Low priority for tasks

## Technical Implementation

- **React**: UI built with React 18 using functional components and hooks
- **Redux**: State management with Redux Toolkit
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Optimized Rerenders**: Components are memoized to minimize unnecessary rerenders
- **Modular Architecture**: Code is organized into reusable, maintainable components

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/SoheylAshena/TooDoo.git
   cd toodoo
   ```

2. Install dependencies:

   ```
   npm install

   ```

3. Start the development server:

   ```
   npm run dev

   ```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── components/       # UI components
│   ├── SideBar/      # Sidebar components
│   ├── AddTaskForm.jsx
│   ├── Calendar.jsx
│   ├── FilterPanel.jsx
│   ├── MainBody.jsx
│   ├── TaskItem.jsx
│   └── ...
├── context/         # Redux store and slices
│   ├── Slices/
│   │   ├── tasksSlice.js
│   │   ├── filtersSlice.js
│   │   └── ...
│   └── store.js
├── hooks/           # Custom React hooks
├── Utilities/       # Helper functions
├── App.jsx          # Main app component
└── main.jsx         # Entry point
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Color utilities from TailwindCSS
