import React from "react";
import CreateNote from "../components/CreateNote";
import UserDetails from "../components/UserDetails";
import NoteDisplay from "../components/NoteDisplay";
import { Container, Grid } from "@mui/system";

function UserPage() {
	return (
		<Container>
			<UserDetails />
			<NoteDisplay />
		</Container>
	);
}

export default UserPage;
