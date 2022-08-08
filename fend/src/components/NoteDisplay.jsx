import { TextField, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Note from "./Note";

function NoteDisplay() {
	const [notes, setNotes] = useState([]);
	const [tempSearch, setTempSearch] = useState(""); //Temporarily store search text.
	const [search, setSearch] = useState(""); //Actually update search
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(10);

	useEffect(() => {
		//TODO: Api Call here
	}, [page, search]);

	const handleSearchText = (string) => {
		console.log(string);
		setTempSearch(string);
	};

	const handleSearchConfirm = (string) => {
		setSearch(tempSearch);
	};

	const handleNextPage = () => {
		if (page + 1 < totalPages) setPage(page + 1);
		console.log(page);
	};
	const handlePrevPage = () => {
		if (page - 1 > 1) setPage(page - 1);
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
							onChange={(e) => handleSearchText(e.target.value)}
							value={search}
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
					<Grid item xs={4}>
						<Note />
					</Grid>
					<Grid item xs={4}>
						<Note />
					</Grid>
					<Grid item xs={4}>
						<Note />
					</Grid>
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
