# App

## Description


## Install

```bash
$ npm install
```

## Initialize the database
First, run the initialization script:
`./init.sh`

Then, run docker and wait a few moments until the `init` container runs the script:
`docker compose -f init-db.docker-compose.yml up --build`

## Run the app
Run docker:
`docker compose -f run.docker-compose.yml up --build`

Now you can go over to `localhost:3000`

## Time spent
14 hours

## Issues
### ServeStatic
`ServeStaticModule` for some reason tries to serve `index.html` from the serve directory even though I set the option that should disable that behavior (`index: false`).

# Research
## Admin panel
### AdminJS
1. supports noSQL as well as relational dbs
2. has adapters for all major ORMs
3. has clear architecture
4. is easily exstensible
5. supports React
6. supports different REST frameworks
7. has good documentation
8. has a team of developers and many contributors

### Express Admin
1. only supports relational dbs
2. instead of adapters, is configured via a .json file
3. has an understandable pattern
4. is extensible through custom views
5. doesn't support React
6. only supports Express.js
7. has somewhat poor documentation
8. has not that many contributors

### Conclusions
I would choose AdminJS because it is well maintained and well documented, has a clear architecture, is easily extensible and supports React out of the box.

## File upload
### Multer
1. built on top of Busboy
2. only allows for passing limits related busboy options
3. allows control over where file are stored through `DiskStorage`
4. is more popular on GitHub

### Express-fileupload
1. built on top of Busboy
2. allows for passing busboy options
3. allows control over wher files are stored through the `.mv` method
4. is somewhat less popular on github

### Conclusions
Both are pretty much equivalent: both are built on top of busboy. I would choose `multer` because it has a little bit more intuitive interface and is more popular.

## Time spent
1:40