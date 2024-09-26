import express from 'express'; 
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvshowRoutes from "./routes/tvshow.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import { protectRoute } from './middleware/protectRoute.js';


const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tvshow", protectRoute, tvshowRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

app.listen(PORT, () => {
    console.log('Server started at http://localhost:' + PORT);
    connectDB();
});

