import React from "react";
import { Container, Button, Modal, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserDetailsEdit from "./UserDetailsEdit";

function UserDetails() {
	
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [accountType, setAccountType] = useState("");
	const [id, setId] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");

	useEffect(() => {
		//TODO: Make API Call Here.
	}, [firstName, lastName, id, email, mobile]);

	

	return (
		<div>
			<Typography component="div" variant="h6">
				<div>
					<span>{firstName}</span>
					<span>{lastName}</span>
				</div>
			</Typography>
			<Typography component="div" variant="body1">
				<div>{accountType}</div>
			</Typography>
			<Typography component="div" variant="body2">
				<div>{id}</div>
				<div>{email}</div>
				<div>{mobile}</div>
			</Typography>

			<UserDetailsEdit />
		</div>
	);
}

export default UserDetails;
