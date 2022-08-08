import React from "react";
import { Container, Button, Modal, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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

function UserDetails() {
	const [modalOpen, setModalOpen] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [accountType, setAccountType] = useState("");
	const [id, setId] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");

	useEffect(() => {
		//TODO: Make API Call Here.
	}, [firstName, lastName, id, email, mobile]);

	const handleOpen = () => {
		setModalOpen(true);
	};
	const handleClose = () => {
		setModalOpen(false);
	};

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

			<Button onClick={handleOpen}>Edit Details</Button>
			<Modal open={modalOpen} onClose={handleClose}>
				<Box sx={style}></Box>
			</Modal>
		</div>
	);
}

export default UserDetails;
