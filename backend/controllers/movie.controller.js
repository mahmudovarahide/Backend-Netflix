import { fetchFromTMDB } from "../services/tmdb.service.js";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/trending/movie/day?language=en-US`);
        const limited = data.results.slice(0, 5);
        res.json({ success: true, content: limited });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
}

export async function getNowPlayingMovies(req, res) {
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`);
        res.json({ success: true, content: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
}

export async function getMovieTrailer(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}/videos?language=en-US`);
        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        if (!trailer) {
            return res.status(404).json({ success: false, message: "Trailer not found" });
        }
        res.json({ success: true, trailer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
}

export async function getMovieDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.error(error);
        if (error.response?.status === 404) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }
        res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
}

export async function getSimilarMovies(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
}

export async function getRecommendationMovies(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}/recommendations?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
}

export async function getMoviesByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${category}?language=en-US&page=1`);
        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Internal Server Error: ${error.message}` });
    }
}
