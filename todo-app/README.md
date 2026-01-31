# Todo List App - React

A modern, beautiful todo list management application built with React and Vite.

## Features

- ✅ Add new todos
- ✅ Mark todos as complete/incomplete
- ✅ Edit todos by double-clicking or clicking the edit button
- ✅ Delete todos
- ✅ Filter todos (All, Active, Completed)
- ✅ Clear all completed todos
- ✅ Persistent storage using localStorage
- ✅ Beautiful, modern UI with smooth animations
- ✅ Fully responsive design
- ✅ Real-time statistics

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the todo-app directory:
```bash
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm run dev
```

The app will open automatically in your browser at `http://localhost:3000`

### Building for Production

Build the app for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Usage

1. **Add a Todo**: Type your task in the input field and click "Add" or press Enter
2. **Complete a Todo**: Click the checkbox next to a todo
3. **Edit a Todo**: Double-click on the todo text or click the edit button (✏️)
4. **Delete a Todo**: Click the delete button (🗑️)
5. **Filter Todos**: Use the filter buttons to view All, Active, or Completed todos
6. **Clear Completed**: Click "Clear Completed" to remove all completed todos

## Project Structure

```
todo-app/
├── public/          # Static assets
├── src/
│   ├── App.jsx      # Main app component
│   ├── TodoApp.jsx  # Todo list container component
│   ├── TodoItem.jsx # Individual todo item component
│   ├── main.jsx     # React entry point
│   └── index.css    # Global styles
├── index.html       # HTML template
├── package.json     # Dependencies and scripts
├── vite.config.js   # Vite configuration
└── README.md        # This file
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features
- **localStorage** - Data persistence

## Features in Detail

### State Management
- Uses React hooks (useState, useEffect) for state management
- Todos are automatically saved to localStorage
- Todos persist across page refreshes

### User Experience
- Smooth animations and transitions
- Keyboard shortcuts (Enter to add, Escape to cancel edit)
- Visual feedback for all interactions
- Responsive design for mobile and desktop

### Data Persistence
- All todos are saved to browser localStorage
- Data persists across browser sessions
- No backend required

## Customization

You can easily customize:
- Colors: Modify the gradient colors in `index.css`
- Styling: Update CSS classes in `index.css`
- Features: Add new functionality in `TodoApp.jsx` and `TodoItem.jsx`

## License

This project is open source and available for personal and commercial use.
