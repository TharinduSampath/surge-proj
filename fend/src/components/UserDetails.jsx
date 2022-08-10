import React from "react";
import { Container, Button, Modal, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserDetailsEdit from "./UserDetailsEdit";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const GET_URL = "http://localhost:8080/user/single";

function UserDetails() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [accountType, setAccountType] = useState("");
	const [id, setId] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");

	useEffect(() => {
		async function fetchData() {
			try {
				const email = auth?.email;
				const response = await axios.get(GET_URL, {
					headers: {
						"Content-Type": "application/json",
					},
					params: {
						email: email,
					},
				});
				setEmail(response?.data?.email);
				setFirstName(response?.data?.email);
				setLastName(response?.data.lastName);
				setAccountType(response?.data?.accountType);
				setId(response?.data?.id);
				setMobile(response?.data?.mobile);
				//TODO: Loading Indicators.
			} catch (err) {
				//TODO: Handle errors.
			}
		}
		fetchData();
	});

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
		</div>
	);
}

export default UserDetails;
