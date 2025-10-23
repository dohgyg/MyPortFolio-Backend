import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import contactRoutes from './server/routes/contact.routes.js';
import educationRoutes from './server/routes/education.routes.js';
import projectRoutes from './server/routes/project.routes.js';
import userRoutes from './server/routes/user.routes.js';
import authRoutes from "./server/routes/auth.routes.js";
app.use("/api", authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri, {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    //useUnifiedTopology: true
  })
  .then(() => {
    console.log("Portfolio API is running ✅");
  });
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});
app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});
