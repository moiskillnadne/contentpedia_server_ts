## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />

## Migrations

- Add `.env` file with following keys

```yml
NODE_ENV=production
PORT_SERVER=5555
DB_URI=mongodb+srv://victor_ryabkov:Ryabkov2607.@contentpedia.k4rqg.mongodb.net/contentpedia_dev?retryWrites=true&w=majority
JWT_SECRET=contentpedia
```

- Run `NODE_ENV='development' sequelize-cli db:migrate`
