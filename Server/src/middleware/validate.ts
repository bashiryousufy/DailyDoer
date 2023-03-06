const jwt = require('jsonwebtoken');
import { parseJwt } from '../utils/jwt';

function isAuthenticated(req: any, res: any, next: any) {

  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).send("Unauthorized");
  }

  try {

    const token = authorization.split(' ')[1];

    const parsedToken = parseJwt(token);

    res.locals.userId = parsedToken.userId;

    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.payload = payload;

  } catch (err: any) {

    res.status(401).send("Unauthorized");

  }

  return next();

}

export default isAuthenticated;