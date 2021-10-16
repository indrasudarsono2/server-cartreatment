const isLogin = (req,res,next) => {
  if(req.session.user == null || req.session.user == undefined){
    req.flash('alertMessage', 'Session is expired, please sign in');
    req.flash('alertStatus', 'danger');
    res.redirect('/admin/signin');
  }else{
    var hour = 3600000
    req.session.cookie.expires = new Date(Date.now() + hour)
    req.session.cookie.maxAge = 100 * hour
    next();
  }
}

module.exports = isLogin;