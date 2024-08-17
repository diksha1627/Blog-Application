Next.js Blog App
This is a Next.js blog application that uses Material-UI (MUI) for styling. It displays a list of blog posts fetched from a public API and allows users to view individual posts along with their comments.

Features
Homepage: Displays a list of blog posts in a responsive grid layout.
Post Page: Shows detailed information about a selected post and its comments.
Responsive Design: Uses Material-UI to ensure a responsive and visually appealing design.
Getting Started
Prerequisites
Node.js (v14 or later)
npm 
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/diksha1627/Blog-Application.git
Navigate to the project directory:

bash
Copy code
cd your-repo
Install dependencies:

Using npm:

bash
Copy code
npm install




To start the development server, use one of the following commands:

bash
Copy code
npm run dev

Open http://localhost:3000 in your browser to view the application.

File Structure
app/page.tsx: The homepage that displays a list of blog posts.
app/post/[id]/page.tsx: The post detail page that shows the post content and comments.
HomePage Component
Location: app/page.tsx
Description: Fetches and displays a list of blog posts. Each post is presented in a card layout, and users can click on a "View Post" button to see more details.
PostPage Component
Location: app/post/[id]/page.tsx
Description: Displays detailed information about a specific post and its comments. Includes a "Go Back" button to return to the homepage.
Customization
You can customize the design by modifying the Material-UI theme in your project. To learn more about customizing MUI themes, check out the Material-UI theming documentation.

