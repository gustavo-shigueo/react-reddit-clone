# React Reddit Clone

## Running the App
To run the app you must build the API first. To do that, please follow these instructions:

<ol>
  <li>
    Go to <code>/server</code> and create a file called <code>.env</code> with the following code, changing the variables as needed:
      <pre>PORT=3001
DB_HOST="localhost"
DB_NAME="reddit_clone"
DB_USER="root"
DB_PASSWORD=""
DB_DIALECT="mysql"
NODE_ENV="development"
SECRET_ACCESS_TOKEN="very_strong_secret_1"
SECRET_REFRESH_TOKEN="very_strong_secret_2"</pre>
  </li>
  <li>Create a MySQL database with a name that matches the <code>DB_NAME</code> variable you created in the previous step</li>
  <li>Go to the file <code>/server/src/index.ts</code> and uncomment lines 26 through 29 so that the db tables are created</li>
  <li>In the <code>/server</code> folder, open your terminal and run the commands: <code>npm i</code>, <code>tsc</code> and <code>node dist/index.js</code></li>
  <li>Open a new terminal instance and go to the <code>/client</code> folder and run <code>npm i</code> and <code>npm start</code></li>
</ol>
