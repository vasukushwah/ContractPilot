# ContractPilot 🚀

ContractPilot is an innovative web application designed to streamline the creation of legal contracts. Leveraging the power of AI and a user-friendly interface, ContractPilot makes contract generation accessible and efficient for everyone.
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 
## Description

Simplify your contract workflow with ContractPilot. This tool utilizes AI to help draft contracts tailored to specific needs, offers intelligent suggestions for improvements, and allows easy exporting, all within a clean, modern interface.

## Key Features ✨

*   **AI-Powered Contract Generation**: Input your requirements and let AI assist in drafting the initial contract.
* **Rich Text Editor**: Edit and format your contracts using an intuitive WYSIWYG editor powered by Tiptap.
* **AI-Driven Suggestions**: Receive intelligent suggestions powered by AI (`suggestImprovements`) to refine clauses and wording for clarity and completeness.
* **Multiple Download Formats**: Download your finalized contracts as DOCX or PDF files.
* **Copy to Clipboard**: Easily copy the contract text for pasting elsewhere.
* **User-Friendly Interface**: Enjoy a seamless experience built with Shadcn UI and Tailwind CSS.
* **State Management**: Predictable state handling using Redux Toolkit.
* **Type Safety**: Developed with TypeScript for improved code quality and maintainability.

## Technologies Used 💻

* **Framework**: [Next.js](https://nextjs.org/)
* **UI Library**: [React](https://reactjs.org/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
* **Rich Text Editor**: [Tiptap](https://tiptap.dev/)
* **File Generation**: [docx](https://docx.js.org/), [jspdf](https://github.com/parallax/jsPDF)
* **File Saving**: [file-saver](https://github.com/eligrey/FileSaver.js/)
* **Form** : [react-hook-form](https://react-hook-form.com/)

## Installation and Setup ⚙️
 
Follow these steps to get a local copy up and running.

**Prerequisites:**

* Node.js (v18 or later recommended)
* npm or yarn or pnpm

**Steps:**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/vasukushwah/ContractPilot.git
    cd ContractPilot
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    * Create a `.env.local` file in the root directory by copying the example file:
        ```bash
        cp .env.example .env.local
        ```
    * Fill in the required environment variables in `.env.local` (e.g., API keys for AI services).

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) (or your configured port) in your browser to see the application.

## Usage Guide 📖

1.  Navigate to the contract generation page (likely the home page or `/contract-generator`).
2.  Input the initial details required for your contract.
3.  The AI will generate a draft, which will appear in the Tiptap editor.
4.  Use the editor toolbar to format the text (bold, italic, lists).
5.  Click "Get AI Suggestions" to receive improvement ideas based on the current draft.
6.  Review and apply suggestions as needed.
7.  Use the "Copy Text" button to copy the contract content.
8.  Select your desired download format (DOCX or PDF) and click "Download".

## Folder Structure (Example)
```
ContractPilot/
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable UI components (including Shadcn UI)
│   ├── store/            # Redux store setup
│   ├── hooks/            # Custom React hooks (e.g., useToast)
│   ├── ai/               # AI related logic (e.g., flows)
│   ├── lib/              # Utility functions
│   └── ...               # Other directories
├── .env.example          # Example environment variables
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project dependencies and scripts
└── README.md             # This file
```

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

Please ensure your code adheres to the project's coding standards and includes tests where applicable.

## License 📄

Distributed under the MIT License. See `LICENSE` file for more information. (Note: You'll need to add a LICENSE file, typically MIT for open source projects).

## Contact 📧

Vasu Kushwah - vasukushwa01@gmail.com

Project Link: [https://github.com/vasukushwah/ContractPilot](https://github.com/vasukushwah/ContractPilot)

---

