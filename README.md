# Phonebook

Basic application to manage a phonebook.

## Prequisites
1. You will need a Mongo database to save the Contact.
2. You will need to install globally on your computer `NestJS` and `Angular CLI`:
```cmd
npm install -g @nest/cli @angular/cli
```

## Path to awesome

### Start the backend project
1. Copy the content of `.env.example` file inside a file `.env`
2. Add your connection string URI of your MongoDB
3. Run the project with this command:
```bash
cd phonebook-api
npm install
npm run start:dev
```

### Start the frontend project
1. Run the project wwith this command:
```bash
cd phonebook-webapp
npm install
npm run start
```