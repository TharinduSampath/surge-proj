import UserDetails from "../components/UserDetails";
import AdminCreateUser from "../components/AdminCreateUser";
import AdminUserTable from "../components/AdminUserTable";
import AdminPendingUserTable from "../components/AdminPendingUserTable";
import { Container, Grid } from "@mui/material";

function AdminPage() {
	return (
		<Container>
			<UserDetails />
			<AdminCreateUser />
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<AdminUserTable />
				</Grid>
				<Grid item xs={6}>
					<AdminPendingUserTable />
				</Grid>
			</Grid>
		</Container>
	);
}

export default AdminPage;
