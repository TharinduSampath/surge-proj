import { TextField, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Note from "./Note";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const GET_URL = "http://localhost:8080/note";

function NoteDisplay() {
	const { auth } = useAuth();
	const [notes, setNotes] = useState([]);
	const [tempSearch, setTempSearch] = useState(""); //Temporarily store search text.
	const [search, setSearch] = useState(""); //Actually update search
	const [isUpdated, setIsUpdated] = useState(false);

	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const handleUpdate = () => {
		setIsUpdated(!isUpdated);
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const email = auth?.email;
				const response = await axios.get(GET_URL, {
					params: {
						email: email,
						search: search,
						page: page,
					},
				});
				setNotes(response?.data?.content);
				setTotalPages(response?.data?.totalPages);
				console.log("This data was fetched", notes, totalPages);
				setIsUpdated(true);
			} catch (err) {
				//TODO: Handle errors.
			}
		}
		fetchData();
	}, [page, search, isUpdated]);

	const handleSearchText = (e) => {
		console.log(e.target.value);
		setTempSearch(e.target.value);
	};

	const handleSearchConfirm = (string) => {
		setSearch(tempSearch);
	};

	const handleNextPage = () => {
		if (page + 1 < totalPages) setPage(page + 1);
		console.log(page);
	};
	const handlePrevPage = () => {
		if (page - 1 > -1) setPage(page - 1);
		console.log(page);
	};

	//TODO: Center the pagination properly

	return (
		<div>
			<div>
				<Grid container spacing={1}>
					<Grid item xs={8}>
						<TextField
							label="Search Title"
							variant="outlined"
							fullWidth
							size="small"
							onChange={handleSearchText}
							value={tempSearch}
						/>
					</Grid>
					<Grid item xs={4}>
						<Button
							color="primary"
							variant="contained"
							onClick={() => handleSearchConfirm()}
							size="medium"
						>
							Search
						</Button>
					</Grid>
				</Grid>
			</div>
			<div>
				<Grid container spacing={2} mt={1}>
					{notes.map((note) => (
						<Grid item xs={4}>
							<Note note={note} onUpdate={handleUpdate} />
						</Grid>
					))}
				</Grid>
			</div>
			<div>
				<Grid mt={1} container spacing={1} justifyContent="center">
					<Grid item xs={2}>
						<Button
							color="primary"
							variant="contained"
							onClick={handlePrevPage}
							size="medium"
							disabled={page - 1 > -1 ? false : true}
						>
							Prev
						</Button>
					</Grid>
					<Grid item xs={2}>
						<Button
							color="primary"
							variant="contained"
							onClick={handleNextPage}
							size="medium"
							disabled={page + 1 < totalPages ? false : true}
						>
							Next
						</Button>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default NoteDisplay;
