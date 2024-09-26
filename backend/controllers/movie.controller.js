import { fetchFromTMDB } from "../services/tmdb.service.js";
import { ENV_VARS } from "../config/envVars.js";

export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?api_key=" + ENV_VARS.TMDB_API_KEY);
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({ success: true, content: randomMovie });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error in movie.controller"});
    }
}

export async function getMovieTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=` + ENV_VARS.TMDB_API_KEY);
        res.json({success: true, trailers: data.results});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }

        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export async function getMovieDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?api_key=` + ENV_VARS.TMDB_API_KEY);
        res.status(200).json({success: true, content: data});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export async function getSimilarMovies(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=` + ENV_VARS.TMDB_API_KEY);
        res.status(200).json({success: true, similar: data.results});
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

export async function getMoviesByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?api_key=` + ENV_VARS.TMDB_API_KEY);
        res.status(200).json({success: true, content: data.results});
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}