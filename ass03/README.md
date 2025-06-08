# React Admin Dashboard

A comprehensive and interactive admin dashboard application built with React, Vite, Tailwind CSS, and the Syncfusion component library. This project serves as a perfect starter for building complex and data-rich interfaces.

![App Screenshot](https://i.ibb.co/6XNbtjG/image.png)
*(Replace this with a screenshot of your running application)*

## ✨ Features

- **Customizable Themes**: Switch between Light and Dark modes.
- **Color Picker**: Dynamically change the primary color of the UI.
- **Interactive Data Tables**: View and manage data for Orders, Customers, and Employees with sorting and pagination.
- **Data Visualization**: A rich collection of charts including Line, Area, Bar, and Pie charts.
- **Full-Featured Calendar**: Schedule and view events with a full-sized calendar.
- **Kanban Board**: A drag-and-drop task management board to track workflow.
- **Fully Responsive**: Seamless user experience on desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [React Context API](https://reactjs.org/docs/context.html)
- **Routing**: [React Router](https://reactrouter.com/)
- **UI Components**: [Syncfusion React Suite](https://www.syncfusion.com/react-components)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/react-admin-dashboard.git
    cd react-admin-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Get a Syncfusion License Key:**
    This project uses Syncfusion components, which require a license key to remove the trial watermark. You can obtain a **free community license**.
    - Go to [Syncfusion Community License](https://www.syncfusion.com/products/communitylicense) and register.
    - After getting your key, open the `src/main.jsx` file.

4.  **Add the license key:**
    In `src/main.jsx`, replace `'YOUR_SYNCFUSION_LICENSE_KEY'` with the key you obtained.
    ```javascript
    // src/main.jsx
    import { registerLicense } from '@syncfusion/ej2-base';

    // Registering Syncfusion license key
    registerLicense('YOUR_SYNCFUSION_LICENSE_KEY');
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

Please note that the Syncfusion component library has its own [licensing terms](https://www.syncfusion.com/company/license-agreements). A community license is available for free for eligible users.

## 🙏 Acknowledgements

This project was inspired and guided by the "React Admin Dashboard" tutorial by [JavaScript Mastery](https://www.youtube.com/c/JavaScriptMastery).