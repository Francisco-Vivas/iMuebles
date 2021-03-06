# iMuebles

<a href=""><img alt="open-source" src="https://img.shields.io/badge/Open%20Source-%F0%9F%A7%A1-orange"></a>
<a href=""><img alt="website" src="https://img.shields.io/badge/Website-%F0%9F%92%BB-lightgrey"></a>
<a href=""><img alt="ironhackers" src="https://img.shields.io/badge/Ironhackers-WebDev-%2300b4FF"></a>

By [Francisco Vivas](https://www.linkedin.com/in/vivas-francisco/) & [Karen Roth](https://github.com/KarenRoth).

## What is iMuebles?

iMuebles is your best resource if you want to get new furniture por a short time without worrying about your location. <br>
Find it, reserve it and take it away!

## Setup on your pc

Download the repository using the cli, curl or doing git clone and before running it on your computer, make sure you run

```
$ npm install
```

### Environment Variables

You have to create an `.env` file with the following variables:

```
PORT, default, 3000
SECRET, a random string
DB, a Mongo Atlas db connection
GOOGLE_ID, Google Developers ID
GOOGLE_SECRET, Google Developers secret key
FACEBOOK_ID, Facebook Developers ID
FACEBOOK_SECRET, Facebook Developers secret key
CLOUDINARY_NAME, Cloudinary cloud name
CLOUDINARY_KEY, Cloudinary access key
CLOUDINARY_SECRET, Cloudinary secret key
GMAIL_USER, Gmail user (for Nodemailer)
GMAIL_PASS, Gmail password (for Nodemailer)
```

### Live test.

Access to the deployed application, [https://imuebles.herokuapp.com/](https://imuebles.herokuapp.com/), and access with this credentials. <br>
Sign up with your account for better user experience.

> Test user <br>
> email: user@mail.com <br>
> password: password <br>
