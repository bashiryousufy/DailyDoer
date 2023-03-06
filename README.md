# DailyDoer
Take control of your day with DailyDoer! This powerful to-do app helps you stay organized and focused, so you can get more done in less time. With features like task prioritization, due date reminders, and syncing across devices, DailyDoer makes it easy to manage your tasks and stay on track. Download it now and start achieving your goals one task at a time!

## Description 
This project is a to-do app built using Node.js with Express as the backend framework and Angular as the frontend framework. The app uses Postgres as the database and Prisma as the ORM. Additionally, it integrates with Google Cloud Translation API to provide multi-language support.

## Technologies Used
- Node.js with Express
- Postgres
- Prisma as ORM
- Angular
- Google Cloud Translation API

## Installation 
To install and run this project, follow these steps:

1. Clone this repository to your local machine.
2. Install Node.js and NPM on your machine.
3. Install the project dependencies by running the command npm install.
4. Set up a Postgres database and update the connection string in the .env file.
5. Run the database migrations by running the command npx prisma migrate dev.
6. Start the backend server by running the command npm run dev.
7. Start the frontend server by running the command npm start.
8. Open your web browser and navigate to http://localhost:{PORT} to view the app.

## List of target translation languages short code:

- fa = Persian
- ru = Russian
- es = Spanish
- ar = Arabic
- en = English
- zh = Chinese
- hi = Hindi
- fr = French

These Short code can be used for requesting google cloud translation api for translating any text in the languages specified above.
[Source](https://www.loc.gov/standards/iso639-2/php/code_list.php)

## Usage
- TODO

## Hosting in Google Cloud
To host this project in Google Cloud, you can follow these general steps:

1. Create a new project in the Google Cloud Console.
2. Set up a new Postgres instance by following the Cloud SQL for Postgres Quickstart.
3. Update the connection string in the .env file to point to the new Postgres instance.
4. Create a new service account with the appropriate permissions to access the Google Cloud Translation API by following the Creating and Managing Service Accounts documentation.
5. Download the JSON key for the new service account and save it in a safe location.
6. Set the GOOGLE_APPLICATION_CREDENTIALS environment variable to the path of the JSON key file.
7. Build the Node.js backend by running the command npm run build:server.
8. Build the Angular frontend by running the command npm run build:client.
9. Deploy the Node.js backend and Angular frontend to Google App Engine by following the Deploying a Node.js App to App Engine Flexible Environment and Deploying a Static Website to App Engine documentation, respectively.
10. Access the app by navigating to the App Engine URL.

## License
This project is licensed under the [MIT License](https://opensource.org/license/mit/).
