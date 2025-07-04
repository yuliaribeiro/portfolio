# 🌱 Ju's Portfolio - Welcome

Hi there! I'm Ju, and this repository is dedicated to building my personal developer portfolio.

Feel free to explore the code and documentation to better understand my development workflow, problem-solving approach, and coding standards.

If you're evaluating my work, this README will guide you through the most relevant parts of the codebase, the agile methodology applied, and how to navigate the structure efficiently.

This portfolio follows the **mobile-first** design principle and includes **CI pipelines with GitHub Actions** to ensure code quality through automated tests and lint checks on every pull request.

Let’s get started!

## 📌 Agile Methodology & Project Organization
This project follows Agile principles to guide the development process in an iterative and incremental way. All planning and task tracking are managed using [GitHub Projects](https://github.com/users/yuliaribeiro/projects/3) — feel free to explore the board to follow the progress.


### 🧠 Project Board Structure

The board is organized using a **Kanban layout** with the following columns:
- **Backlog**: Ideas or features that might be added in the future.
- **To Do**: Features and tasks that are planned and ready to be worked on.
- **In Progress**: Tasks currently being developed.
- **Done**: Completed tasks.


### 🧩 Feature-Based Breakdown

Each **Feature** represents a key part of the portfolio and is tracked as a separate Issue. Within each feature, I break down the work into **small, actionable tasks**. This helps demonstrate my ability to decompose larger problems into manageable units.

This approach not only improves productivity and focus but also makes the development process more transparent and easier to follow.

## 🛠️ Tech Stack

This project uses a modern and efficient front-end stack designed for performance, scalability, and code quality.

### ⚙️ Core Stack
- **[Vite](https://vitejs.dev/)** – Lightning-fast build tool and development server.
- **[React](https://reactjs.org/)** – UI library for building interactive user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)** – Superset of JavaScript that adds static typing and improves developer experience.

### 🎨 Styling
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework for fast and responsive UI development.
- **[Lucide](https://lucide.dev/)** - Open-source icon library.

### 🧹 Code Quality
- **[ESLint](https://eslint.org/)** – Linter to enforce consistent code style and catch common bugs.
- **[Prettier](https://prettier.io/)** – Code formatter to ensure consistent styling across the project.

### ✅ Testing
- **[Vitest](https://vitest.dev/)** – Blazing-fast unit testing framework built for Vite, with a Jest-compatible API.

All of these tools work together to ensure the codebase is clean, well-structured, and easy to maintain.

## 🚀 Getting Started

If you'd like to clone and run this project locally, please make sure you have the following installed:

- **Node.js v22+** (tested with Node.js **v22.13.0**)
- **npm v10+** (tested with npm **v10.9.2**)

### 📦 Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yuliaribeiro/portfolio.git

2. Install dependecies:
   ```bash
   cd packages
   npm install
3. Start the development server:
   ```bash
   npm run dev


### 🧠 How This Project Works
This project is organized to reflect a professional and collaborative development workflow, where tasks are clearly tracked, documented, and linked to their corresponding branches and implementations.

### 📌 Task & Branch Structure
Each task in the [Project Board](https://github.com/users/yuliaribeiro/projects/3) is:

* Linked to a dedicated GitHub branch, which contains the implementation of that specific task or feature.
* Fully documented — developers and reviewers can find relevant information and decisions directly in the task issue or linked documentation file.

This ensures traceability, allowing anyone to understand why and how a piece of code was written.


### 🌿 Branching Strategy
The project follows a simple and clean Git branching model:

**main:**
This is the production branch. It always reflects the latest stable version of the project.

**development:**
This is the integration branch. All task branches are merged here once their work is completed and reviewed.
It serves as a staging area before deployment to main.

**task branches:**
Every task has its own branch, created from **development.** The naming follows this pattern:
<br />
`[feature]-[short-description]`

### 🔁 Merge Workflow
1. A task is created and assigned a number.
2. A branch is created from development, following the task number in its name.
3. After the work is done, a pull request is opened to merge the branch into development.
4. Once development is stable and ready for production, it is merged into main.
