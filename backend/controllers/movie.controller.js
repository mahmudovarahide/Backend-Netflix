import { fetchFromTMDB } from "../services/tmdb.service.js";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "9b40f3adb97e7234c2ea10b62783d862";

export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`);
        const limited = data.results.slice(0, 5);
        res.json({ success: true, content: limited });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getNowPlayingMovies(req, res) {
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
        res.json({ success: true, content: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getMovieTrailer(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        res.json({ success: true, trailer });
    } catch (error) {
        console.error(error);
        if (error.message.includes("404")) {
            return res.status(404).send({ success: false, message: "Trailer not found" });
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getMovieDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.error(error);
        if (error.message.includes("404")) {
            return res.status(404).send({ success: false, message: "Movie not found" });
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSimilarMovies(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getRecommendationMovies(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getMoviesByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
