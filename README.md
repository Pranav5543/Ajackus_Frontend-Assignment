# Staff Canvas - Employee Directory Application

## Setup and Run Instructions

To get the application running locally, follow these steps.

### Prerequisites

Ensure you have Node.js (version 18 or higher) and npm installed on your system.

### Installation

1.  Clone the repository to your local machine.
2.  Navigate to the project's root directory in your terminal.
3.  Install the necessary dependencies by running:

```bash
npm install
```

### Running the Development Server

Once the dependencies are installed, you can start the local development server:

```bash
npm run dev
```

This will start the application in development mode with hot-reloading. Open your browser to the local address provided in the terminal (usually [http://localhost:3000](http://localhost:3000)) to view the running application.

## Overview of Project Structure

The project follows a standard Next.js App Router structure, with a clear separation of concerns.

```
/
├── src/
│   ├── app/       # Core application pages and layouts
│   │   ├── globals.css  # Global styles and theme variables
│   │   ├── layout.tsx   # Root layout component
│   │   └── page.tsx     # Main page for the directory
│   ├── components/  # Reusable React components
│   │   ├── ui/        # ShadCN UI components (Button, Card, etc.)
│   │   └── *.tsx      # Custom application components (e.g., StaffMemberCard)
│   ├── lib/         # Utility functions, types, and static data
│   │   ├── data.ts    # Initial staff data and filter options
│   │   ├── types.ts   # TypeScript type definitions
│   │   └── utils.ts   # Utility functions (e.g., cn for classnames)
│   └── hooks/       # Custom React hooks (e.g., use-toast)
├── .gitignore     # Files to be ignored by Git
├── next.config.ts # Next.js configuration
├── package.json   # Project dependencies and scripts
└── tsconfig.json  # TypeScript configuration
```

### Challenges Faced

1.  **State Management:** Managing the state for multiple filters (search, department, role), the active staff list, and the visibility of various dialogs (add, edit, delete) was a key challenge. It required careful use of React hooks like `useState`, `useCallback`, and `useMemo` to ensure the UI remained responsive and the code was maintainable without causing unnecessary re-renders.

2.  **Component Reusability:** A significant effort went into designing the dialog components for adding and editing staff members to be reusable and robust. This involved creating a flexible form system with `react-hook-form` and `zod` for validation, ensuring that the dialogs could be triggered from different parts of the application while correctly managing their own state.

### Future Improvements

If I had more time, I would focus on the following enhancements:

1.  **Backend Integration:** Replace the local static data with a proper backend service and database. This would allow for persistent data storage, making the application a true full-stack solution where staff data can be managed dynamically.

2.  **AI-Powered Bio Generation:** Integrate a generative AI feature to assist with writing employee bios. For instance, when adding a new employee, the system could suggest a professional bio based on their role and department, saving time and ensuring consistency.

3.  **Enhanced Accessibility (a11y):** Perform a thorough accessibility audit to ensure all components are fully navigable via keyboard and usable for people with disabilities. This would include adding comprehensive ARIA attributes and ensuring all interactive elements are accessible.
