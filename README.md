# Eic Auth

## Install

Add dependency to package.json

```
'eic-auth': 'https://github.com/Prepsmith/eic-auth-node'
```

then run

```
npm install
```

## Usage

Add eic auth to express middleware

```
var eicAuth = require('eic-auth');

app.use(eicAuth());
```

Then you can call currentUser

```
req.currentUser.idUrl
req.currentUser.username
req.currentUser.userId
req.currentUser.issuedAt
req.currentUser.displayName
req.currentUser.email

req.currentUser.isSignedIn() # is signed in by session cookies
req.currentUser.isVerified() # is signed in by token/signature
```
