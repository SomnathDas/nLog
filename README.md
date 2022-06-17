# nLog
---

*Natural Way Of Blogging. By writing politcally incorrect things uwu*

---

## Built using ( MERN STACK )
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## Try Now [ Deployment is online ( hopefully ) ]
**[Try nLog now](https://nlog.social)**

## Screen-shots ( Aesthetic and Mild UI )
**Design File:  [Checkout at Figma](https://www.figma.com/community/file/1118764549305878223)**
![Screenshot of home page of nLog website](https://i.imgur.com/SnnJLjL.png "Responsive af")
![Screenshot of home page of nLog website on mobile screen](https://i.imgur.com/uEIvyIe.png "Freedom of speech? Log-in first")

## Installation 
1. **Make sure you have Node.js v16 or above**
2. **Make sure you have npm (node package manager)**

```bash
git clone https://github.com/SomnathDas/nLog.git
```
```bash
cd nLog
```
```bash
cd client
```
```bash
npm install
```
```bash
cd ..
```
```bash
cd server
```
```bash
npm install
```
```bash
cd ..
```

## Configuration

### Server
```bash
cd server
```
```bash
touch .env
```
```bash
nano .env
```
```bash
DB_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
PORT=3000
ALLOWED_ORIGIN=http://localhost:3000
NODE_ENV=production
```

**You can generate ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET using https://nodejs.org/api/crypto.html**

### Client
```bash
cd client
```
```bash
touch .env
```
```bash
nano .env
```
```bash
REACT_APP_BASE_URL=http://localhost:3000
```

## Running the application

### Development
**Run individually client and server on different ports ( Make sure to configure ports in above Configuration (.env files)
```bash
npm run start
```

### Production
**Build client and run both client and server on same ports (This method can vary depending on how you choose to deploy )
```bash
npm run build
```

## How to deploy the app on VPS (Virtual Private Server) ?
**I recommend the following tutorials
https://www.youtube.com/watch?v=Nxw2j1-srVc
https://github.com/safak/youtube/tree/mern-deployment

## Special Thanks 
1. Favicon: Photo by <a href="https://unsplash.com/@evieshaffer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Evie S.</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

2. Login & Sign-Up Screen: Photo by <a href="https://unsplash.com/@simebasioli?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sime Basioli</a> on <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

## Author
**Somnath Das**
* My Portfolio -> https://somnath.me
* My Github -> https://github.com/SomnathDas
* My Instagram -> https://instagram.com/samurai3247

