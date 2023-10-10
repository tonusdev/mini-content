
# 📝 MiniContent

MiniContent - a mini-app for Telegram, enabling community leaders to create exclusive articles for their audience with Telegram Premium subscriptions.

## 🎥 Demo


🤖 [Telegram Mini-app](https://t.me/MiniContentBot)

📢 [Telegram Channel with articles examples](https://t.me/MiniContent_Demo)

## ✨ Features

MiniContent has tools to help you share and manage your articles on Telegram:

- 📝 **Write for Everyone**: Make articles for both free and Premium Telegram users.

- 🎨 **Rich Formatting**: Use easy tools to make your articles look nice.

- 🔗 **Instant Links**: Add links in your articles that open instantly in Telegram.

- 📊 **See Views**: Check how many people read each article.

## 🚀 Usability
With MiniContent, you can make special articles just for people who pay for a Premium subscription on Telegram. What This Means:

- More Boosts: Premium subscribers will want to read what you make and give more boots to your channel.
- Support Telegram: When you offer special articles, more people might want to get a Premium subscription.

## Table of Contents

- [📝 MiniContent](#-minicontent)
  * [🎥 Demo](#-demo)
  * [✨ Features](#-features)
  * [🚀 Usability](#-usability)
  * [💡 Motivation](#-motivation)
  * [🔧 How It Works](#-how-it-works)
  * [🛠  Tech Stack](#--tech-stack)
  * [Development environment](#development-environment)
    + [Setting Up Telegram Test Server](#setting-up-telegram-test-server)
    + [How to Access the Test Server:](#how-to-access-the-test-server)
      - [Telegram iOS:](#telegram-ios)
      - [Telegram Android:](#telegram-android)
      - [Telegram Desktop (Windows):](#telegram-desktop-windows)
      - [Telegram Desktop (Mac OS):](#telegram-desktop-mac-os)
  * [Create bot in Test Server](#create-bot-in-test-server)
  * [Run Locally](#run-locally)
    + [Prerequisite: Installing MongoDB](#prerequisite-installing-mongodb)
    + [Installing dependencies](#installing-dependencies)
    + [Settings environment variables](#settings-environment-variables)
    + [Run both frontend and backend](#run-both-frontend-and-backend)
    + [Developing GraphQL API](#developing-graphql-api)
    + [Using Next.js Rewrites to Avoid CORS Issues](#using-nextjs-rewrites-to-avoid-cors-issues)
    + [Testing with Ngrok Tunnel](#testing-with-ngrok-tunnel)
  * [📁 NestJS Backend Structure](#-nestjs-backend-structure)
    + [📁 articles Directory](#-articles-directory)
    + [📁 auth Directory](#-auth-directory)
    + [📁 bot Directory](#-bot-directory)
  * [📁 NextJS Frontend Structure](#-nextjs-frontend-structure)
    + [📁 `app` Directory](#-app--directory)
    + [📁 components Directory](#-components-directory)
    + [📁 environment Directory](#-environment-directory)
    + [📁 i18n Directory](#-i18n-directory)
    + [📁 services Directory](#-services-directory)
  * [Key libraries and tools used](#key-libraries-and-tools-used)
    + [Backend](#backend)
    + [Frontend](#frontend)
  * [Deployment](#deployment)
  * [License](#license)


## 💡 Motivation

The motivation of this project is to make it easy for people to build mini-apps for their communities. You can use this repo like a starting step. From here, you can make many great projects.

## 🔧 How It Works

MiniContent lets you make articles with two parts:

- For Everyone: A part that everyone can read.
- For Premium Users: A part that only people with a Telegram Premium subscription can see.

Here's how you use it:

- Open MiniContent mini-app.
- Click on "Create New Article."
- Write in two separate fields: one for everyone, one for premium users.
- When you're done, click publish. You'll get a link.
- Share this link anywhere on Telegram: in channels, groups, or private chats.

When someone clicks on your article link:
- MiniContent verify a [data recived from Telegram](https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app) and generate a JWT token with user data as a payload.
- The server looks at [`user.is_premium`](https://core.telegram.org/bots/webapps#webappuser) field to see if they have a Premium Telegram subscription.
- If they do, they get to see the premium part of your article.

##  🛠  Tech Stack
This project is made using one programming language: **TypeScript**. 

- **Backend**: [NestJS](https://docs.nestjs.com/) - is a framework for building efficient and scalable server-side applications. It uses JavaScript, and it's easy to learn if you know JavaScript.
- **Frontend**: [NextJS](https://nextjs.org/) - is a popular framework for building web applications. It makes it easy to build both static websites and server-rendered pages. This means your website can load and run very fast, giving visitors a smooth experience. 
- **Database**: MongoDB.

## Development environment

### Setting Up Telegram Test Server
To effectively develop and test your mini-app, it's essential to use the Telegram test server. Here's why:

- Local Host Testing: The Telegram test server allows you to run your mini-app on localhost, making development more manageable.

- No HTTPS Requirement: Unlike the production server, the test server doesn't mandate the use of HTTPS. This simplifies the setup and testing process during development.

### How to Access the Test Server

First you need to create account in Telegram test server using your **phone**. You can use your phone number. Learn more about [Telegram Test Server](https://core.telegram.org/bots/webapps#testing-mini-apps).

#### Telegram iOS:
1. Fastly tap Settings section 10 times;
2. Tap Accounts button;
3. Tap Login to another account;
4. Tap Test button;
5. Create a new account.

#### Telegram Android:
1. Install [Telegram Beta](https://install.appcenter.ms/users/drklo-2kb-ghpo/apps/telegram-beta-2/distribution_groups/all-users-of-telegram-beta-2);
2. Open Telegram Beta;
3. Check "Test server" and create a new account.

Then open Telegram Desktop. Ensure you're using the official Telegram Desktop client. 

#### Telegram Desktop (Windows):
1. Open side menu;
2. Expand the menu item, where current username is specified;
3. Hold Shift + Alt and press right mouse button on Add Account button;
4. Select Test Server;
5. Scan the QR code using a phone with an account on the test server (open "Devices" setting in Telegram and click "Link Desktop Device").

#### Telegram Desktop (Mac OS):
1. click the Settings icon 10 times to open the Debug Menu
2. Hold ⌘ and click ‘Add Account’
3. Scan the QR code using a phone with an account on the test server (open "Devices" setting in Telegram and click "Link Desktop Device").

## Create bot in Test Server

Open @BotFather in Test Server and create your bot as usual. 

Then create an app using `/newapp` command using settings like that:

```
Direct Link: https://t.me/MiniContentBot/view
Description: View
GIF: 🚫 has no GIF
Web App URL: http://127.0.0.1:3000/auth/view/
```

Than you need to set a domain to bot: 
1. Run `/mybots` in BotFather and select your bot
2. Click Bot Settings -> Domain -> Set Domain
3. Send `127.0.0.1` to the BotFather.

## Run Locally

### Prerequisite: Installing MongoDB
Before setting up MiniContent, you must have MongoDB installed on your machine. 

Install MongoDB from [MongoDB Download Center](https://www.mongodb.com/docs/manual/administration/install-community/).

Also, you need to create a user in MongoDB: [instruction here](https://www.mongodb.com/docs/manual/tutorial/configure-scram-client-authentication/#std-label-create-user-admin).

### Installing dependencies

Clone the project

```bash
  git clone https://github.com/tonusdev/mini-content.git
```

Go to the project directory

```bash
  cd mini-content
```

Install dependencies for backend

```bash
  cd backend
  npm install
```

Install dependencies for frontend

```bash
  cd frontend
  npm install
```

### Settings environment variables

To run this project, you will need to add the following environment variables to your `.env` file in `backend` folder:

```bash
# Settings for the backend server
APP_PORT=3001  
APP_ADDRESS=127.0.0.1           

# Settings for handling cross-origin requests
CORS_ALLOWED_HEADERS=Content-Type,Authorization
CORS_CREDENTIALS=true  
CORS_METHODS=GET,POST,OPTIONS
CORS_ORIGIN=*   

# Telegram server setting
# Use Telegram's test server instead of the production one
TELEGRAM_TEST_SERVER=true          

# Settings for GraphQL
# Enable GraphQL's Integrated Development Environment (IDE)
GRAPHQL_ENABLE_IDE=true   
# Allow introspection of your GraphQL schema         
GRAPHQL_ENABLE_INTROSPECTION=true  

# MongoDB database connection string
MONGODB_URI=mongodb://<username>:<password>@localhost:27017/minicontent?authSource=admin

# Telegram bot token
BOT_TOKEN=2200244087:**   # The token for the Telegram bot

# Settings for JSON Web Tokens (JWT)
JWT_ALGORITHM=HS256                # The algorithm used for JWT
JWT_EXPIRES_IN=1h                  # How long the JWT will remain valid
JWT_SECRET=secret                  # The secret key for JWT

# The domain for the backned
DOMAIN=127.0.0.1 
# The environment the app is running in (development, production, etc.)
NODE_ENV=development          

# The link to the mini-app for bot authentication (Port 3000 is set - this is the port of the NextJS )
BOT_MINIAPP_LINK=http://127.0.0.1:3000/auth/articles

```

Next, you need to update environment variables in `frontend` frolder in `.env.development` file:

```bash
# Endpoint for graphql requests
NEXT_PUBLIC_GRAPHQL_ENDPOINT=/graphql

# Link to mini app created in BotFather
NEXT_PUBLIC_MINI_APP_LINK=https://t.me/MiniContentBot/view

# Endpoint for the GraphQL server where Next will proxy the requests (it is used in /frontend/next.config.mjs file)
GRAPHQL_SERVER_ENDPOINT=http://localhost:3001/graphql
```

### Run both frontend and backend 

To run both the frontend and backend services simultaneously, you can use Visual Studio Code's 'Run and Debug' feature or execute them in two separate terminal windows.

Run backend: 

```bash
cd backend
npm run start:dev
```

Run frontend: 

```bash
cd frontend
npm run dev
```

After starting up, you can type `/start` in your bot chat. This will send you a welcome message with a button that launches the mini-app in Telegram.

### Developing GraphQL API

It is necessary that the frontend and backend work simultaneously for developing api.

1. Run Your Bot: Start your bot to access the mini-app.
2. [Open Debug Mode](https://core.telegram.org/bots/webapps#debug-mode-for-mini-apps): This lets you see what's happening in the console.
3. Look for a Message: In the console, there's a message saying, Enter this into authenticate mutation in Apollo IDE for development:, followed by some data from Telegram.
4. Copy the Data: Highlight and copy the Telegram data.
5. [Open Apollo IDE](https://www.apollographql.com/docs/graphos/explorer): In your web browser, go to http://127.0.0.1:3000/graphql. This is where you can test and develop your GraphQL API.
6. Set Up the Mutation: Type in this code:

```graphql
mutation Mutation($input: AuthenticateInput!) {
  authenticate(input: $input)
}
```

7. Add Your Data: On the side, there's a section for "variables." Enter this:

```json
{
  "input": {
    "initDataRaw": "PASTE YOUR COPIED TELEGRAM DATA HERE"
  }
}
```

8. Run It: Click the "Run" or "Mutation" button.

Doing this logs you in and lets you develop your GraphQL API in the Apollo IDE.

### Using Next.js Rewrites to Avoid CORS Issues

With Next.js, you can use the [rewrites feature](https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites) in the configuration. This lets you redirect frontend requests to your backend without running into CORS (Cross-Origin Resource Sharing) errors. Basically, it's a way to make sure your frontend and backend can talk to each other without any problems. You can see this configuration in `./frontend/next.config.mjs` file.

### Testing with Ngrok Tunnel
Ngrok is a handy tool that creates a secure tunnel from a public endpoint (like a URL) to a local server on your machine. By using Ngrok's tunnel feature, you can test your mini-app in a production-like environment even when it's running locally. This is especially useful for testing features and integrations that require a live URL.

In short, Ngrok ensures that you can test your mini-app thoroughly before officially deploying it to production.

1. Go to ngrok egde dashboard: https://dashboard.ngrok.com/cloud-edge/edges
2. Click on "New Edge" button
3. Get edge id, like that: `edge=edghts_`
4. Run on your local machine: `ngrok tunnel --label edge=edghts_****** http://127.0.0.1:3000`
5. Click "Refresh" in ngrok page and verify that tunnel works
6. Copy domain with https, like that `https://********.ngrok.app`
7. Update backend .env file with domain
8. Update bot configs in BotFather with this domain

## 📁 NestJS Backend Structure

NestJS provides first-class support for GraphQL, allowing developers to create flexible and strongly-typed APIs quickly. Here's a basic outline of its organization:
- Modules: NestJS promotes a modular architecture. Each feature of the application is split into its module, allowing for a clear separation of concerns. Modules are declared using the @Module() decorator.
- Resolvers: In the GraphQL context, resolvers handle the incoming queries and mutations. They're classes adorned with the @Resolver() decorator. Inside, methods with @Query() handle GraphQL queries, and methods with @Mutation() handle mutations.
- Schema: NestJS with GraphQL often uses a code-first approach, meaning the GraphQL schema is automatically generated from your TypeScript classes (DTOs and Resolvers). However, you can also use a schema-first approach where you define your schema using SDL (Schema Definition Language).
- Providers: Providers can be services, repositories, factories, or any other classes that the system needs to function. They are decorated with @Injectable(), and are responsible for the business logic of your application.
- Middleware: Middleware in NestJS works similarly to Express middleware, allowing you to run specific code before the request reaches the route handler.
- Interceptors: Interceptors have a set of useful capabilities, like transforming the response returned from a method execution or manipulating request objects.
- Guards: Guards determine if a request will be handled by the route handler. They are used mainly for authentication and authorization purposes.
- Decorators: Custom decorators allow you to create annotations for your classes, methods, or method parameters.
- DTOs (Data Transfer Objects): DTOs are used to define the data structure for both incoming and outgoing requests. They can help in validating data using class-validator.
- Models: Represent the data models and their relationships, especially when using ORMs like Mongoose with databases.


Below is an overview of the main components and their responsibilities in our NestJS backend:

- app.config.ts: Contains the application's main configuration.
- app.interceptor.ts: Defines the global interceptor for the app.
- app.module.ts: The root module of the application. This is where core modules are imported.

### 📁 articles Directory
Handles everything related to articles:

- articles.module.ts: Module for articles-related components.
- articles.resolver.ts: Resolves the GraphQL queries and mutations related to articles.
- articles.service.ts: Service that contains business logic for articles.
- dto: Contains data transfer objects for articles operations:
- entities: Contains the main entity related to articles:
- models: Contains the main model for articles:

### 📁 auth Directory
Handles authentication:

- auth.decorators.ts: Contains decorators related to authentication.
- auth.guard.ts: Defines the guard for routes requiring authentication.
- auth.module.ts: Module for authentication components.
- auth.resolver.ts: Resolves the GraphQL queries and mutations related to authentication.
- auth.service.ts: Service containing the business logic for authentication.
- auth.utils.ts: Contains utility functions for authentication.
- dto: Contains data transfer object for authentication:
- entities: Contains the main entity related to users:
- models: Contains the main model for users:
- strategies: Contains strategies for authentication:

### 📁 bot Directory
Handles the Telegram bot interactions:

- bot.module.ts: Module for bot-related components.
- bot.service.ts: Service containing the business logic for the bot.
- bot.update.ts: Contains updates handler for the bot.


## 📁 NextJS Frontend Structure


This section provides an overview of the main components and their responsibilities in our frontend setup:

*   **@types**: Contains custom type declarations.
    
    *   **global.d.ts**: Global type definitions.
    *   **gql**: GraphQL-related type declarations.
        *   **index.d.ts**: Main GraphQL type definitions.
*   **Dockerfile**: Contains the instructions to containerize the frontend application using Docker.
    
    

### 📁 `app` Directory

Handles the primary application logic, structured by localization:

*   **\[locale\]**: Locale-specific directory (e.g., 'en', 'ru', 'uk'). Contains localized routes.
    
    *   **articles**: Handles article-related views.
        
        *   **layout.tsx**: The main layout for the articles section.
        *   **page.tsx**: The main page rendering articles.
    *   **auth**: Handles authentication views.
        
        *   **\[...slug\]**: Dynamic route handling various authentication paths.
            *   **layout.tsx**: The main layout for the authentication section.
            *   **page.tsx**: The main authentication page.
    *   **edit**: Allows editing articles.
        
        *   **\[articleId\]**: Dynamic route for individual article editing.
            *   **layout.tsx**: The layout for the article editing section.
            *   **page.tsx**: The main page to edit articles.
    *   **view**: For viewing individual articles.
        
        *   **\[articleId\]**: Dynamic route to view specific articles.
            *   **layout.tsx**: The main layout for viewing an article.
            *   **page.tsx**: The page rendering the article content.
    *   **layout.tsx**: The primary layout for the application.
        
    *   **page.tsx**: The primary page component.
        
    *   **providers.tsx**: Providers setup for state and context management.
        
*   **codegen.ts**: Configuration for generating types and operations from GraphQL.

### 📁 components Directory
Contains reusable UI components:

- CustomLink.tsx: A custom link component for navigation.
- PublishModal.tsx: Modal component for publishing actions.
- SDKLoader.tsx: Component to load the Telegram SDK.
- SetLinkModal.tsx: Modal component to set article links.
- Tiptap.tsx: Component related to the Tiptap text editor.

### 📁 environment Directory
Handles the environment-specific configurations:

- client.ts: Client-side environment configuration.

### 📁 i18n Directory
Handles internationalization:

- client.ts: Client-side i18n configurations.
- server.ts: Server-side i18n configurations.
- locales: Contains language-specific translations.

### 📁 services Directory
Contains service utilities, often relating to data fetching or business logic:

- graphql: GraphQL client configuration and related utilities.
- client.ts: GraphQL client setup.
- keyFactory.ts: Utility for key generation for React Query.
- useArchiveArticleMutation.ts: Hook for archiving articles.
- useArticleQuery.ts: Hook to fetch a single article.
- useArticlesQuery.ts: Hook to fetch multiple articles.
- useAuthenticateMutation.ts: Hook for user authentication.
- useCreateArticleMutation.ts: Hook to create articles.
- useUpdateArticleMutation.ts: Hook to update articles.
- useUserQuery.ts: Hook to fetch user data.

## Key libraries and tools used

### Backend 

- [NestJS](https://nestjs.com/) - is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. With its modular architecture and expressive API, it provides an out-of-the-box application architecture.

- [Mongoose](https://mongoosejs.com/) - provides a straight-forward, schema-based solution createing models for MongoDB. It includes built-in type casting, validation, and more, out of the box.

- [Telegraf](https://telegraf.js.org/) - is a modern Telegram bot framework for Node.js. It provides a simple and efficient way to handle updates and create Telegram bots.

- [GraphQL](https://graphql.org/) - is a query language for your API, and a runtime for executing those queries with your existing data. Instead of multiple endpoints, GraphQL provides a more efficient, powerful, and flexible alternative to REST.

- [nestjs-i18n-telegraf](https://github.com/vitaliy-grusha/nestjs-i18n-telegraf) - is a module that provides i18n support for NestJS applications with support of Telegraf

### Frontend

- [NextJS](https://nextjs.org/) - is a React framework that enables features such as server-side rendering and static site generation. It's designed for building highly scalable and optimized React applications.

- [nextui](https://nextui.org/) - offers a collection of high-quality React components, hooks, and themes. With a focus on simplicity and usability, it helps in crafting beautiful interfaces with ease.

- [React Query](https://react-query.tanstack.com/) - is a data-fetching and state management library for React. It automates many repetitive tasks involved in fetching, caching, synchronizing, and updating server-state in your applications, leading to a more efficient data handling process.

- [Tiptap](https://tiptap.dev/) - is a headless and framework-agnostic rich-text editor. It provides the tools to create rich-text editors with a clean JSON output and is highly extensible through its plugin-based architecture.

- [@tma.js/sdk-react](https://docs.telegram-mini-apps.com/docs/libraries/tma-js-sdk-react) - React bindings for the Telegram mini-app client SDK. It includes hooks, components, and other useful tools that enable the use of React alongside the Web Apps client SDK. It automatically tracks changes to SDK components.

- [Tailwind CSS](https://tailwindcss.com/) - is a utility-first CSS framework that allows developers to quickly build custom user interfaces. Instead of writing custom CSS classes for each design or component, Tailwind provides a set of utility classes to add directly to your HTML.

- [next-international](https://next-international.vercel.app/docs) - is a library for internationalization in Next.js with type-safety.

## Deployment


Deploying the application becomes simple with Docker Compose. It allows us to define and run multi-container Docker applications.

Ensure you have both Docker and Docker Compose installed on your VPS. You can open `docker-compose.yaml` file to see deployment configuration.

Steps:
1. Clone the repository:

```bash
git clone https://github.com/tonusdev/mini-content.git
cd mini-content
```

2. Create one `.env` file with environment variables for backend and frontend both:

```bash
MONGODB_USER=admin
MONGODB_PASS=******
MONGODB_DATABASE=minicontent
BOT_TOKEN=58117:******
DOMAIN=domain.dev
JWT_SECRET=secret
BOT_MINIAPP_LINK=https://domain.dev/auth/articles

NEXT_PUBLIC_GRAPHQL_ENDPOINT=/graphql
NEXT_PUBLIC_MINI_APP_LINK=https://t.me/MiniContentBot/view
```

3. Build the Docker images:

```bash
docker-compose build
```
4. Run the application:
```bash
docker-compose up
```
## License

[MIT](https://choosealicense.com/licenses/mit/)

