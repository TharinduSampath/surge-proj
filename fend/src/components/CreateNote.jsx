import React from "react";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

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

function CreateNote() {
	const [modalOpen, setModalOpen] = useState(false);
	const [err, setErr] = useState(); //If we get an error from server or client.

	const handleOpen = () => {
		setModalOpen(true);
	};
	const handleClose = () => {
		setModalOpen(false);
	};

	const handleSubmit = () => {
		//TODO: Api Call here.
	};

	return (
		<div>
			<Button onClick={handleOpen}>Create Note</Button>
			<Modal open={modalOpen} onClose={handleClose}>
				<Box sx={style}>
					<Typography mb={1} component="div" variant="h6">
						Create Note
					</Typography>
					<Typography mb={1} component="div" variant="body2">
						Create a note here to keep track of something you might forget. It
						will be displayed below!
					</Typography>
					<TextField label="Title" variant="filled" margin="dense" fullWidth />
					<TextField
						label="Type your note here..."
						variant="filled"
						margin="dense"
						fullWidth
						multiline
						rows={4}
					/>
					<Button
						sx={{ mt: 1 }}
						color="primary"
						variant="contained"
						onClick={handleSubmit}
						size="large"
					>
						Post Note
					</Button>
				</Box>
			</Modal>
		</div>
	);
}

export default CreateNote;
