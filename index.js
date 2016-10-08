'use strict';

module.exports = function() {
  function EicUser(auth_session) {
    if (auth_session) {
      this.idUrl = auth_session.id_url;
      this.username = auth_session.username;
      this.userId = auth_session.user_id;
      this.issuedAt = auth_session.issued_at;
      this.displayName = auth_session.display_name;
      this.email = auth_session.email;
    }
  }

  EicUser.prototype.isSignedIn = function() {
    return !!this.userId;
  }

  return function(req, res, next) {
    req.currentUser = new EicUser(req.session.auth);
    next();
  }
}
