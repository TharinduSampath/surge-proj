import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TextField, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const GET_URL = "http://localhost:8080/user";

function AdminPendingUserTable() {
	const { auth } = useAuth();
	const [users, setUsers] = useState([]);
	const [tempSearch, setTempSearch] = useState(""); //Temporarily store search text.
	const [search, setSearch] = useState(""); //Actually update search
	const [page, setPage] = useState(0);
	const [totalPages, setTotalPages] = useState(10);

	useEffect(() => {
		async function fetchData() {
			try {
				const email = auth?.email;
				const response = await axios.get(GET_URL, {
					params: {
						status: "FALSE",
						search: search,
						page: page,
					},
				});
				setUsers(response?.data?.content);
				setTotalPages(response?.data?.totalPages);
				console.log("This data was fetched", users, totalPages);
				//TODO: Add Loading indicators
			} catch (err) {
				//TODO: Handle errors.
			}
		}
		fetchData();
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
		if (page - 1 > -1) setPage(page - 1);
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
							value={tempSearch}
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
							<TableCell align="right">Temporary Password</TableCell>
						</TableRow>
					</TableHead>
					<TableBody fullWidth>
						{users.map((user, i) => (
							<TableRow key={i}>
								<TableCell component="th" scope="row">
									{user.email}
								</TableCell>
								<TableCell align="right">{user.password}</TableCell>
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

export default AdminPendingUserTable;
