'use strict';

module.exports = function() {
  function EicUser(auth_session, params) {
    if (auth_session) {
      this.idUrl = auth_session.id_url;
      this.username = auth_session.username;
      this.userId = auth_session.user_id;
      this.issuedAt = auth_session.issued_at;
      this.displayName = auth_session.display_name;
      this.email = auth_session.email;
    }
    this.params = params;
  }

  EicUser.prototype.isSignedIn = function() {
    return !!this.userId;
  }

  EicUser.prototype.isVerified = function() {
    if (this.params.c && this.params.v) {
      var crypto = require('crypto')
        , shasum = crypto.createHash('sha1');
      shasum.update(`${decodeURIComponent(this.params.c)}:EIC:AUTH:${process.env.EIC_SECRET}`);
      return shasum.digest('hex') == this.params.v && (parseInt(Buffer.from(decodeURIComponent(this.params.c), 'base64')) + 60) * 1000 > new Date().getTime();
    }
    return false;
  };

  return function(req, res, next) {
    req.currentUser = new EicUser(req.session.auth, req.query);
    next();
  }
}
