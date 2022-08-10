import React from "react";
import {
	Container,
	Button,
	Modal,
	Box,
	Typography,
	Paper,
} from "@mui/material";
import { useState } from "react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
};

function UserDetailsEdit() {
	//TODO : Build User Detail Editing.
	const [modalOpen, setModalOpen] = useState(false);
	const handleOpen = () => {
		setModalOpen(true);
	};
	const handleClose = () => {
		setModalOpen(false);
	};
	const handleSubmit = () => {
		//TODO: Make API Call Here.
	};

	return (
		<div>
			<Button onClick={handleOpen}>Edit Details</Button>
			<Modal open={modalOpen} onClose={handleClose}>
				<Box sx={style}>
					<Paper sx={{ p: 3 }}>Test</Paper>
				</Box>
			</Modal>
		</div>
	);
}

export default UserDetailsEdit;
