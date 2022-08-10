import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";

function AdminUserTable() {
	const [users, setUsers] = useState([]);
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

	return (
		<div>
			<div>
				<Grid container spacing={1}>
					<Grid item xs={8}>
						<TextField
							label="Search Email"
							variant="outlined"
							fullWidth
							size="small"
							onChange={(e) => handleSearchText(e.target.value)}
							value={search}
							autoComplete="new-password"
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

			<TableContainer fullWidth>
				<Table fullWidth>
					<TableHead fullWidth>
						<TableRow fullWidth>
							<TableCell>Email</TableCell>
							<TableCell align="right">First name</TableCell>
							<TableCell align="right">Last name</TableCell>
							<TableCell align="right">Date Of Birth</TableCell>
							<TableCell align="right">Mobile</TableCell>
						</TableRow>
					</TableHead>
					<TableBody fullWidth>
						{users.map((user, i) => (
							<TableRow key={i}>
								<TableCell component="th" scope="row">
									{user.email}
								</TableCell>
								<TableCell align="right">{user.firstName}</TableCell>
								<TableCell align="right">{user.lastName}</TableCell>
								<TableCell align="right">{user.dateOfBirth}</TableCell>
								<TableCell align="right">{user.mobile}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

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

export default AdminUserTable;
