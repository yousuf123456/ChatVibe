
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/yousuf123456/ChatVibe">
    <img src="/public/images/logo.png" alt="Logo" width="auto" height="60">
  </a>

<h1 align="center">ChatVibe</h1>

  <p align="center">
    A real-time chat application where users can create personal or group chats, send messages and images instantly with seamless live updates.
    <br />
    <a href="https://github.com/yousuf123456/ChatVibe"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/yousuf123456/ChatVibe">View Demo</a>
    &middot;
    <a href="https://github.com/yousuf123456/ChatVibe/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/yousuf123456/ChatVibe/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technologies-used">Technologies Used</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project
[![Project Name Screen Shot][project-screenshot]](https://example.com)

Initially when I was learning about web development, I wondered that how chat systems databases are structured, thats where I decided to create **ChatVibe**. It is a real-time chat application designed for seamless communication.

- Users can get started by signing in to the app.
- Connect with others by searching for their ID or email address.
- Create personal or group chats with ease.
- Enjoy real-time features such as:
  - Online user presence
  - Typing indicators

These features keep conversations interactive and engaging.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies Used

### 🧩 Frontend

| Technology                                  | Purpose                                                |
|---------------------------------------------|--------------------------------------------------------|
| [![React][React.js]][React-url]             | For building interactive and dynamic user interfaces   |
| [![Next][Next.js]][Next-url]                | For server-side rendering and static site generation   |
| [![Shadcn][Shadcn-ui]][Shadcn-url]          | For reusable and pre-styled ui components              |
| [![Tailwind][Tailwind-CSS]][Tailwind-url]   | For utility-first and responsive styling               |

<br />

### 🔧 Backend

#### **Current Stack**
| Technology                                  | Purpose                                                    |
|---------------------------------------------|------------------------------------------------------------|
| [![Clerk][Clerk.js]][Clerk-url]             | For user authentication and account management             |
| [![Cloudinary][Cloudinary]][Cloudinary-url] | For uploading and hosting of static files                  |
| [![Convex][Convex.dev]][Convex-url]         | As serverless backend server and real-time updates database|

#### **Previously Used Stack (Now Replaced)**
| Technology                               | Purpose                                                       |
|------------------------------------------|---------------------------------------------------------------|
| [![Mongodb][Mongodb]][Mongodb-url]       | As non-sql database for storing conversations                 |
| [![Pusher][Pusher]][Pusher-url]          | To push events to the users to create a real time env         |
| [![NextAuth][NextAuth]][NextAuth-url]    | For user authentication                                       |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

This is a list of tools you must have installed in your machine before proceeding:

- [git (Version Control)](https://git-scm.com)
- [Node.js (Javascript running environment)](https://nodejs.org/en)
- [npm (Node Package Manager)](https://www.npmjs.com)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/yousuf123456/ChatVibe.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Get your technologies credentials by creating an account on the following platforms:
   - [Clerk.js](https://clerk.com/)
   - [Convex.dev](https://www.convex.dev/)
   - [Cloudinary](https://cloudinary.com/)
5. Add your obtained credentials in your `.env.local` file.
   ```
   CONVEX_DEPLOYMENT=convex_deployment;
   NEXT_PUBLIC_CONVEX_URL=convex_deployment_url;

   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=clerk_publishable_key;
   CLERK_SECRET_KEY=clerk_secret;

   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name;
   ```
6. Run the local server.
   ```
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap
The following features are in my future plans to be added in this web application:

- [ ] Emoji Picker — Added: April 23, 2025
- [ ] Voice Messages — Added: April 23, 2025
- [ ] Voice Calls — Added: April 23, 2025

See the [open issues](https://github.com/yousuf123456/ChatVibe/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

💡 Got ideas or improvements? Your contributions are welcome that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:
Currently, I have solely worked on this project.
Be the first one to join me in shaping this project better😊.

<a href="https://github.com/yousuf123456/ChatVibe/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yousuf123456/ChatVibe" alt="contrib.rocks image" width="50" height="50" />
</a>

<!-- LICENSE -->

## License

Licensed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Muhammad Yousuf - [Linkedin](www.linkedin.com/in/muhammad-yousuf-dev) - m.yousuf.developer@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/yousuf123456/ChatVibe.svg?style=for-the-badge
[contributors-url]: https://github.com/yousuf123456/ChatVibe/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/yousuf123456/ChatVibe.svg?style=for-the-badge
[forks-url]: https://github.com/yousuf123456/ChatVibe/network/members
[stars-shield]: https://img.shields.io/github/stars/yousuf123456/ChatVibe.svg?style=for-the-badge
[stars-url]: https://github.com/yousuf123456/ChatVibe/stargazers
[issues-shield]: https://img.shields.io/github/issues/yousuf123456/ChatVibe.svg?style=for-the-badge
[issues-url]: https://github.com/yousuf123456/ChatVibe/issues
[license-shield]: https://img.shields.io/github/license/yousuf123456/ChatVibe.svg?style=for-the-badge
[license-url]: https://github.com/yousuf123456/ChatVibe/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/muhammad-yousuf-dev/
[project-screenshot]: /public/images/Chat-Vibe-SS.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white&logoSize=auto
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB&logoSize=auto
[React-url]: https://reactjs.org/
[Clerk.js]: https://img.shields.io/badge/clerk.js-262626?style=for-the-badge&logo=clerk&logoColor=6C47FF&logoSize=auto
[Clerk-url]: https://clerk.com
[Shadcn-ui]: https://img.shields.io/badge/shadcnui-000000?style=for-the-badge&logo=shadcnui&logoColor=white&logoSize=auto
[Shadcn-url]: https://ui.shadcn.com
[Convex.dev]: https://img.shields.io/badge/Convex-b45309?style=for-the-badge&logoColor=black&logoSize=auto
[Convex-url]: https://www.convex.dev
[Tailwind-CSS]: https://img.shields.io/badge/Tailwind.CSS-172554?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&logoSize=auto
[Tailwind-url]: https://tailwindcss.com
[Cloudinary]: https://img.shields.io/badge/Cloudinary-3F5FFF?style=for-the-badge&logo=cloudinary&logoColor=white&logoSize=auto
[Cloudinary-url]: https://cloudinary.com
[Pusher]: https://img.shields.io/badge/Pusher-F0F1F6?style=for-the-badge&logo=pusher&logoColor=300D4F&logoSize=auto
[Pusher-url]: https://pusher.com/
[NextAuth]: https://img.shields.io/badge/NextAuth-1BB4E6?style=for-the-badge&logoSize=auto
[NextAuth-url]: https://next-auth.js.org/
[Mongodb]: https://img.shields.io/badge/Mongodb-00684A?style=for-the-badge&logo=mongodb&logoColor=B1FF05&logoSize=auto
[Mongodb-url]: https://www.mongodb.com/
