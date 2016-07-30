import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

router.post('/', (req, res) => {
  const { identifier, password } = req.body;

  User.query({
    where: { username: identifier },
    orWhere: { email: identifier }
  }).fetch().then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.get('password_digest'))) {
        const token = jwt.sign({
          id: user.get('id'),
          username: user.get('username')
        }, config.jwtSecret);
        res.json({ token });
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
  });
});

export default router;
