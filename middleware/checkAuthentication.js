const checkAuth=(req,res,next)=>{
    const accessToken=req.cookies.access_token;

    if (accessToken){
        next();
    }
    else{
        res.redirect('/github/auth');
    }

}

module.exports=checkAuth;