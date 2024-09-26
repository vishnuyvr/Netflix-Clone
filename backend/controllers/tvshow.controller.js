import { fetchFromTMDB } from "../services/tmdb.service.js";
import { ENV_VARS } from "../config/envVars.js";

export async function getTrendingtvshows(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?api_key=" + ENV_VARS.TMDB_API_KEY);
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({ success: true, content: randomMovie });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error in movie.controller"});
    }
}

export async function gettvshowTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=` + ENV_VARS.TMDB_API_KEY);
        res.json({success: true, trailers: data.results});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }

        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export async function gettvshowDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?api_key=` + ENV_VARS.TMDB_API_KEY);
        res.status(200).json({success: true, content: data});
    } catch (error) {
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

export async function getSimilartvshows(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=` + ENV_VARS.TMDB_API_KEY);
        res.status(200).json({success: true, similar: data.results});
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}

export async function gettvshowsByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?api_key=` + ENV_VARS.TMDB_API_KEY);
        res.status(200).json({success: true, content: data.results});
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error"});
    }
}