import * as React from "react";
import { Box, Button, Grid } from "@mui/material";
import { fetchDogsById, getBreeds, matchDogs, searchDogs } from "../api/dogs";
import {
  Dog,
  DogSearch,
  DogSearchResponse,
  MatchResponse,
} from "../models/dogModel";
import { DogCard } from "../components/DogCard";
import axios from "../api/axiosInstance";
import { logout } from "../api/auth";
import { useAuthContext } from "../context/authContext";
import { useNavigate } from "react-router";
import { TopBar } from "../components/TopBar";
import { FavoriteList } from "../components/FavouriteList";
import { PaginationControls } from "../components/Pagination";
import { MatchDialog } from "../components/MatchDialog";
import { API_BASE_URL } from "../utils/constants";

const PAGE_SIZE = 25;
const BASE_URL = API_BASE_URL
export const SearchPage: React.FC = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  // State
  const [breeds, setBreeds] = React.useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = React.useState<string[]>([]);
  const [dogs, setDogs] = React.useState<Dog[]>([]);
  const [favoriteIds, setFavoriteIds] = React.useState<string[]>([]);
  const [favoriteDogs, setFavoriteDogs] = React.useState<Dog[]>([]);
  const [totalResults, setTotalResults] = React.useState<number>(0);
  const [nextQuery, setNextQuery] = React.useState<string | null>(null);
  const [prevQuery, setPrevQuery] = React.useState<string | null>(null);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [matchedDog, setMatchedDog] = React.useState<Dog | null>(null);
  const [matchModalOpen, setMatchModalOpen] = React.useState<boolean>(false);

  // Effects: Fetch breeds and perform search whenever filters or sort order change.
  React.useEffect(() => {
    fetchBreeds();
    performSearch();
  }, [selectedBreeds, sortOrder]);

  // Fetch available breeds.
  const fetchBreeds = async () => {
    try {
      const response = await getBreeds();
      setBreeds(response);
    } catch (error) {
      console.error("Failed to fetch breeds:", error);
    }
  };

  // Perform a new search (resetting to page 1).
  const performSearch = async () => {
    try {
      const params: DogSearch = {
        breeds: selectedBreeds.length > 0 ? selectedBreeds : undefined,
        size: PAGE_SIZE,
        from: undefined,
        sort: `breed:${sortOrder}`,
      };
      const response: DogSearchResponse = await searchDogs(params);
      setTotalResults(response.total);
      setNextQuery(response.next || null);
      setPrevQuery(response.prev || null);
      setCurrentPage(1);
      const dogDetails = await fetchDogsById(response.resultIds);
      setDogs(dogDetails);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  // Fetch a specific page using a relative query string.
  const fetchPage = async (query: string) => {
    try {
      const response = await axios.get(`${BASE_URL}${query}`, {
        withCredentials: true,
      });
      const data: DogSearchResponse = response.data;
      setTotalResults(data.total);
      setPrevQuery(data.prev || null);

      // Parse the "from" parameter from the query string to compute current page.
      const queryString = query.split("?")[1] || "";
      const searchParams = new URLSearchParams(queryString);
      const fromParam = searchParams.get("from");
      const fromNumber = fromParam ? parseInt(fromParam, 10) : 0;
      const newPage = Math.floor(fromNumber / PAGE_SIZE) + 1;
      const computedTotalPages = Math.ceil(data.total / PAGE_SIZE);
      setCurrentPage(Math.min(newPage, computedTotalPages));

      // If we're on the last page, disable the Next button.
      if (newPage >= computedTotalPages) {
        setNextQuery(null);
      } else {
        setNextQuery(data.next || null);
      }

      if (!data.resultIds || data.resultIds.length === 0) {
        setDogs([]);
        return;
      }

      const dogDetails = await fetchDogsById(data.resultIds);
      setDogs(dogDetails);
    } catch (error) {
      console.error("Failed to fetch page", error);
    }
  };

  // Logout function.
  const logOut = async () => {
    await logout();
    setUser(null);
    navigate("/");
  };

  // Toggle sort order.
  const toggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Handle breed selection change.
  const handleBreedChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const newSelected = typeof value === "string" ? value.split(",") : value;
    setSelectedBreeds(newSelected);
  };

  // Update favorite list persistently across pages.
  const handleToggleFavorite = (dogId: string) => {
    if (favoriteIds.includes(dogId)) {
      setFavoriteIds((prev) => prev.filter((id) => id !== dogId));
      setFavoriteDogs((prev) => prev.filter((dog) => dog.id !== dogId));
    } else {
      setFavoriteIds((prev) => [...prev, dogId]);
      // Look for the dog object in the current page.
      const dogObj = dogs.find((dog) => dog.id === dogId);
      if (dogObj) {
        setFavoriteDogs((prev) => [...prev, dogObj]);
      }
    }
  };

  // Generate a match and open the match dialog.
  const generateMatch = async () => {
    try {
      const response: MatchResponse = await matchDogs(favoriteIds);
      const matchDogId = response.match;
      const dogDetails = await fetchDogsById([matchDogId]);
      if (dogDetails && dogDetails.length > 0) {
        setMatchedDog(dogDetails[0]);
        setMatchModalOpen(true);
      } else {
        alert("Match found, but couldn't fetch dog details.");
      }
    } catch (error) {
      console.error("Match generation failed", error);
    }
  };

  // Calculate total pages.
  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  return (
    <Box sx={{ p: 2 }}>
      <TopBar
        breeds={breeds}
        selectedBreeds={selectedBreeds}
        onBreedChange={handleBreedChange}
        sortOrder={sortOrder}
        onToggleSort={toggleSort}
        onLogout={logOut}
      />

      <FavoriteList favorites={favoriteDogs} />

      <Button
        variant="contained"
        color="primary"
        onClick={generateMatch}
        sx={{ m: 2 }}
      >
        Create Match
      </Button>

      <PaginationControls
        totalResults={totalResults}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrev={() => prevQuery && fetchPage(prevQuery)}
        onNext={() => nextQuery && fetchPage(nextQuery)}
        prevDisabled={!prevQuery}
        nextDisabled={!nextQuery}
      />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {dogs.map((dog) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dog.id}>
            <DogCard
              dog={dog}
              isFavorite={favoriteIds.includes(dog.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          </Grid>
        ))}
      </Grid>

      <MatchDialog
        open={matchModalOpen}
        matchedDog={matchedDog}
        onClose={() => setMatchModalOpen(false)}
      />
    </Box>
  );
};
