const jwt = require('jsonwebtoken');

function isAuthenticated(req: any , res: any , next: any ) {
    const { authorization } = req.headers;
  
    if (!authorization) {
      res.status(401).send("Unauthorized");
    }
  
    try {
      const token = authorization.split(' ')[1];
      const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.payload = payload;
    } catch (err: any) {
      res.status(401).send("Unauthorized");
    }
  
    return next();
  }
  
export  default isAuthenticated;
  