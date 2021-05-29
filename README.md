# men-template
A template for creating a server with Node.js, Express.js, and a MongoDB database. I am using a **MEN** tech stack (Mongo, Express, Node).

## Do It Yourself
1. Create a folder for the server: `mkdir backend`
2. Go into the directory ` cd backend`
3. Run `npm init` to create `package.json` file. Set `"entry point"` (aka `"main"`) to `server.js` - this is the file that will be handle the startup of the server
5. Install [express](https://www.npmjs.com/package/express), [mongoose](https://www.npmjs.com/package/mongoose), [bcrypt](https://www.npmjs.com/package/bcrypt), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [dotenv](https://www.npmjs.com/package/dotenv) by running ```npm install {package_name}```
6. Go to [MongoDB Atlas Cloud](https://www.mongodb.com/cloud/atlas/register) to create a MongoDB database on the cloud. Follow their documentation on how to create a cluster. Remember to add all IP addresses so that your app can be accessible anywhere, and create a user so that the server can successfully connect to the database using the credentials. 
7. Create `.env` file and set the following env variables: `BACKEND_PORT`, `MONGOATLAS_CLUSTER`, `MONGOATLAS_USERNAME`, `MONGOATLAS_PASSWORD`. Remember to add `.env` to your `.gitignore` file.
8. Code away, follow the template code
