# TV-MAZE

> **Problem Statement**: John is a fan of TV Shows and has been looking for a way to manage the shows that he has watched, find new ones that he has not watched and also rate the shows that he loved.
To solve John’s problem, you are tasked to create a creative web application that will enable John and his friend keep track of their TV Shows.

The app should:

1. Allow John to list and search for TV shows based on:

- Name of the Show
- Genre of the Show
- Rating of the show
- Date of premiere
- Status

2. View the details of the TV show including:

- Name
- Crew
- Episodes/ Seasons
- Image Gallery

3. Add TV Shows to his watch Schedule
4. Favorite TV Shows that he has watched
5. Comment on TV Shows that he has watched

## FRONTEND

### Getting Started

```
git clone https://github.com/Levy-Naibei/digital-vision.git
```

```
cd digital-vision/packages/client
```

```
Run yarn install
```

```
Run yarn start
```

## BACKEND

## TV Shows GraphQL Service

This is the backend graphQL service that consumes the `TVMAZE` API.

### Requirements

 This assumes you have Node.js and Mongo DB installed on your machine.

### Getting Started

```
Open another terminal
```

```
cd digital-vision/packages/server
```

```
Create .env file at the root of server directory
```

```
Add in .env file your mongodb values for DATABASE_URL and SECRET_KEY as shown in packages/server/.env.sample
```

```
Run yarn install
```

```
Run yarn start
```