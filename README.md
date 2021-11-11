# men-template
A template for creating a server with Node, Express, and a MongoDB database. I am using a **MEN** tech stack (Mongo, Express, Node) with **TypeScript**.

## Running the server
- If you are *testing* your backend, I would recommend downloading [Nodemon](https://nodemon.io/), which will monitor for any changes in your source and automatically restart your server. Simply run `nodemon server.ts`. Download [Postman](https://www.postman.com/) to test your API endpoints.
- If you are *deploying* your backend on a server, run `nohup node server.ts &` to run the server in the background and keep a track of the console logs in a file `nohup.out`.

## What's In Each Folder
- **config** contains configuration files. 
- **controllers** contains controller files.
- **models** contains model files for your database schema.
- **routes** contains the `router.ts` file.

## Do It Yourself
1. Create a folder for the server: `mkdir backend`
2. Go into the directory ` cd backend`
3. Run `npm init` to create `package.json` file. Set `"entry point"` (aka `"main"`) to `server.ts` - this is the file that will be handle the startup of the server
5. Install [express](https://www.npmjs.com/package/express), [mongoose](https://www.npmjs.com/package/mongoose), [bcrypt](https://www.npmjs.com/package/bcrypt), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), [dotenv](https://www.npmjs.com/package/dotenv) by running ```npm install {package_name}```
6. Go to [MongoDB Atlas Cloud](https://www.mongodb.com/cloud/atlas/register) to create a MongoDB database on the cloud. Follow their documentation on how to create a cluster. Remember to add all IP addresses so that your app can be accessible anywhere, and create a user so that the server can successfully connect to the database using the credentials. 
7. Create `.env` file and set the following env variables: `BACKEND_PORT`, `MONGOATLAS_CLUSTER`, `MONGOATLAS_USERNAME`, `MONGOATLAS_PASSWORD`. Remember to add `.env` to your `.gitignore` file.
8. Code away, follow the template code
