import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const createToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )
}

export const register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        message: 'This e-mail address is already in use'
      })
    };

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      passwordHash: hash
    });

    const token = createToken(newUser._id);
    const { passwordHash, ...userData } = newUser._doc;

    res.status(201).json({ ...userData, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Failed to register',
    });
  }
}

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: 'Incorrect login or password'
      })
    };

    if (!user.isActive) {
      return res.status(403).json({
        message: 'You are blocked, contact the site administrator'
      })
    };

    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Incorrect login or password'
      })
    };

    const token = createToken(user._id);
    const { passwordHash, ...userData } = user._doc;

    res.status(201).json({ ...userData, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Failed to log in'
    });
  }
}

export const firebaseLogin = async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (!user.isActive) {
        return res.status(403).json({
          message: 'You are blocked, contact the site administrator'
        });
      };
      const token = createToken(user._id);
      res.status(201).json({ ...user._doc, token });
    } else {
      const newUser = await User.create({ email, firstName, lastName, });
      const token = createToken(newUser._id);
      res.status(201).json({ ...newUser._doc, token });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Failed to log in'
    });
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'User is unauthorized'
    });
  }
}