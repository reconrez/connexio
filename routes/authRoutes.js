const AuthController = require("../controllers/authController");
const { Router } = require('express');
const router = Router();

router.post("/register", async (req, res) => {
  const { username, email, password, repassword } = req.body;
  const response = await AuthController.register({ username, email, password, repassword });

  if (response.status) {
    return res.status(200).json(response.result);
  } else {
    return res.status(401).json(response.result);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const response = await AuthController.login({ username, password });

  if (response.status) {
    return res.status(200).json(response.result);
  } else {
    return res.status(401).json(response.result);
  }
});

router.post("/logout", async (req, res) => {
  const { user_id } = req.body;
  const response = await AuthController.logout({ user_id });

  if (response.status) {
    return res.status(200).json(response.result);
  } else {
    return res.status(401).json(response.result);
  }
});

router.post("/token", async (req, res) => {
  const { refresh_token } = req.body;
  const response = await AuthController.getNewAccessToken({ refresh_token });

  if (response.status) {
    return res.status(200).json(response.result);
  } else {
    return res.status(403).json(response.result);
  }
});

module.exports = router;