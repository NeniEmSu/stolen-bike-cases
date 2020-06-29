# Stolen Bike Cases - Backend (Node.js)

## Context

> Stolen bikes are a typical problem in a lot of major cities. The Police want to be more efficient in resolving stolen bike cases. They decided to build a software that can automate their processes — the software that you're going to develop.

Coding Challenge Guidelines

===========================

Please organize, design, test, document and deploy your code as if it were
going into production, then send us a link to the hosted repository (e.g.
Github, Bitbucket...).

## Product Requirements

- [ ] Bike owners can report a stolen bike.
- [ ] New stolen bike cases should be automatically assigned to any free police officer.  
- [ ] A police officer can only handle one stolen bike case at a time.
- [ ] When the Police find a bike, the case is marked as resolved and the responsible police officer becomes available to take a new stolen bike case.
- [ ] The system should be able to assign unassigned stolen bike cases automatically when a police officer becomes available.

## Your Mission

Your task is to provide APIs for a frontend application that satisfies all requirements above.

Please stick to the Product Requirements. You should not implement authorization and authentication, as they are not important for the assessment. Assume everyone can make requests to any API.

## Tech Requirements

- Node.js
- **Tests (quality and coverage)**
- You are free to use any framework, but we prefer Vue
- Use any database (preferably Firestore)
- Typescript is a plus, but not required

## Instructions

- Build a performant, **clean and well-structured solution**.
- Commit early and often. We want to be able to check your progress.
- **Send us an email with a link to the repository when you finish the assessment**.
- Please do not spend more than 6 hours.
- Please complete your working solution within 7 days of receiving this challenge.

### Front-end

The front-end should ideally be a single page app with a single `index.html`
linking to external JS/CSS/etc. You may take this opportunity to demonstrate
your CSS3 or HTML5 knowledge.

Host it!

--------

When you’re done, host it somewhere (e.g. on Amazon EC2, Heroku, Google AppEngine, etc.).

## Deployed link

<https://comming_soon_maybe>

### The stack on the FrontEnd is based on

1. Nuxt
2. Vue
3. VueX
4. Bootstrap-Vue
5. Axios
6. PWA
7. SCSS
8. Jest
9. Eslint
10.Bootstrap Icon

### The stack on the BackEnd is based on

1. Node Express
2. MongoDB
3. MVC

### need a env file to start this app

```(js)

BASE_URL=http://localhost:3000

MONGO_DB_CONNECTION="link to mongo database"

PORT=3000

```

Backend

- [ ] Backend Testing
- [ ] Inprove error handling responses
- [ ] Create service for auto assignment
- [ ] Create officers routes, model and controllers
- [ ] Req.body validation with @hapi/joi
- [ ] Create cases routes, model and controllers
- [ ] Set up express api, cors, proxy settings and basics

Frontend

- [ ] Frontend Testing
- [ ] add full PWA support
- [ ] generate routes
- [ ] set up proper seo
- [ ] add robots.txt
- [ ] add sitemap
- [ ] UX/UI logic refactor
- [ ] add Skeleton loaders
- [ ] animated transition
- [ ] state management init
- [ ] add readme documentation for all major directories
- [ ] setup readme for documentation
- [ ] Project initialization

## Deployment Setup

### Options

1. Deploy main branch with npm run build or npm run generate as stated below.

### nginx

- [Using nginx as a reverse proxy](https://nuxtjs.org/faq/nginx-proxy/)
- [Blog post on the deployment process to nginx](https://www.waysquare.com/creating-vue-js-application-using-nuxt-js-and-nginx/)
- [Deploy nuxt app (Vue.js) with Pm2 and Nginx](https://kenyaappexperts.com/blog/deploy-vue-js%E2%80%8A-with-pm2-and-nginx/)

<!-- Given the .env page is populated with relevant data -->

Note:

1. Server port points to

```bash
server: {
    port: 3000, # update according to server requirements
    host: '0.0.0.0'
  },
```

as updated in nuxt.config.js coment section out or update places it's needed on nginx deployment.
2. Your webserver is not aware of the routing inside your Vue application, so you'll need to have Nginx point all requests to the application to the index.html and after that Vue routing will take over. The documentation can be found [here](https://router.vuejs.org/guide/essentials/history-mode.html).

The required configuration snippet copied from there is the following:

```bash
location / {
  try_files $uri $uri/ /index.html;
}
```

Or if using nginx proxy, The documentation can be found [here](https://nuxtjs.org/faq/nginx-proxy/)

#### Nginx Proxy

For Nginx you can add a proxy using the follwing location block:

```yaml
server {
    location / {
        proxy_pass http://http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### Process Manager

Keep the Node server alive forever:

```bash
# install pm2 process manager
npm install -g pm2

# startup script
pm2 startup

# from within project folder start process
pm2 start npm --name "stolen-bike-cases" -- run start

# save process list
pm2 save

# list all processes
pm2 l
```

After each deploy you'll need to restart the process:

```bash
pm2 restart stolen-bike-cases
```

To update, install, generate and restart server with all new changes from github use the bellow command

```bash
npm run update
```

Make sure to read the [Nuxt docs](https://nuxtjs.org/).

More Information on deploying to Nginx

```bash
map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {
    listen          80;             # the port nginx is listening on
    server_name     your-domain;    # setup your domain here

    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    location / {
        expires $expires;

        proxy_redirect                      off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # set the adress of the Node.js instance here
    }
}
```

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
