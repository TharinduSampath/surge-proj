import React from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "../api/axios";

const REGISTER_URL = "/register"; //Change this according to backend
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function AdminCreateUser() {
	const [email, setEmail] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [err, setErr] = useState(); //If we get an error from server or client.

	const handleEmailChange = (s) => {
		//Should probably run some validation
		setEmail(s);
	};

	const handleOpen = () => {
		setModalOpen(true);
	};
	const handleClose = () => {
		setModalOpen(false);
	};

	const handleSubmit = async () => {
		try {
			const response = await axios.post(
				REGISTER_URL,
				JSON.stringify({ email }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			console.log(JSON.stringify(response));
		} catch (err) {
			if (!err?.response) {
				//Do an error here.
			} else if (err.response?.status === 409) {
				//Email already exists.
			} else {
				//Registration failed.
			}
		}
	};

	return (
		<div>
			<Button onClick={handleOpen}>Create User</Button>
			<Modal open={modalOpen} onClose={handleClose}>
				<Box sx={style}>
					<Typography mb={1} component="div" variant="h6">
						Create User
					</Typography>
					<Typography mb={1} component="div" variant="body2">
						Enter the email of a user you want to invite to the platform. We
						will send them a verification link they can use to create their
						account and login.
					</Typography>
					<TextField label="Email" variant="filled" margin="dense" fullWidth />
					<TextField
						label="Repeat Email"
						variant="filled"
						margin="dense"
						onChange={(e) => handleEmailChange(e.target.value)}
						value={email}
						fullWidth
					/>
					<Button
						sx={{ mt: 1 }}
						color="primary"
						variant="contained"
						onClick={handleSubmit}
						size="large"
					>
						Send Email
					</Button>
				</Box>
			</Modal>
		</div>
	);
}

export default AdminCreateUser;
