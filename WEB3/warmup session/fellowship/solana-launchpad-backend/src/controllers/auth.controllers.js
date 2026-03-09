

const jwt = require("jsonwebtoken")
const prisma = require("../prisma")
const bcrypt = require("bcryptjs")

 async function registerController(req,res){
      const { email, password, name } = req.body || {};
      if (!email || !password || !name) {
          return res.status(400).json({ error: "Missing required fields" });
      }
    
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(409).json({ error: "Email already registered" });
      }
    
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          name,
          passwordHash,
        },
      });
    
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
    
      return res.status(201).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
}

 async function loginController(req,res){

    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password" });
    }
  
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  
    return res.status(200).json({
      token,
      user: {
          id: user.id,
          email: user.email,
          name: user.name,
      },
    })

}

module.exports = {
    registerController,
    loginController
}