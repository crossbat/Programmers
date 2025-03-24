const express = require('express');
const jwt = require('jsonwebtoken');

const authorization = (req, res) => {
  try {
    const receivedAuth = req.headers['authorization'];
    if (receivedAuth) {
      const decodedAuth = jwt.verify(receivedAuth, process.env.PRIVATE_KEY);
      return decodedAuth;
    } else {
      throw new ReferenceError("jwt must be provided!");
    }
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    return err
  }
}

module.exports = authorization
