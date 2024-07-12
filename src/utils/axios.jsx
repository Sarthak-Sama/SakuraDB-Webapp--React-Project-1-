import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODk3YzM5OThmZmM2NWU4YTUyNzhlNWI2MGRmZjJiNSIsIm5iZiI6MTcxOTU2NTc4NS4xNzMxNzMsInN1YiI6IjY2N2U3YWZjMWNiNWQ2ZThhNDhkNzRhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cKhJjz0ULhHkXsCfJIjwuC4yMx0lrCqwQlE70L10W10",
  },
});

export default instance;
