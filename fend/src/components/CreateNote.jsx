import React from "react";
import {
	Button,
	Modal,
	Box,
	TextField,
	Typography,
	Paper,
} from "@mui/material";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
};

const SAVE_URL = "http://localhost:8080/note";

function CreateNote({ onUpdate }) {
	const { auth } = useAuth();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const [modalOpen, setModalOpen] = useState(false);
	const [err, setErr] = useState(); //If we get an error from server or client.

	const handleShowModal = () => {
		setTitle("");
		setDescription("");
		setModalOpen(!modalOpen);
	};

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const email = auth?.email;
			console.log(
				"Submitting a note",
				JSON.stringify({ userEmail: email, title, description })
			);
			const response = await axios.post(
				SAVE_URL,
				JSON.stringify({ userEmail: email, title, description }),
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			onUpdate();
			//TODO: Loading indicator
			//TODO: Update state of note display.
		} catch (err) {
			//TODO: Error handling here.
		}
	};

	return (
		<React.Fragment>
			<Button
				color="primary"
				variant="contained"
				size="medium"
				onClick={handleShowModal}
			>
				Create Note
			</Button>
			<Modal open={modalOpen} onClose={handleShowModal}>
				<Box sx={style}>
					<Paper sx={{ p: 3 }}>
						<Typography mb={1} component="div" variant="h6">
							Create Note
						</Typography>
						<Typography mb={1} component="div" variant="body2">
							Create a note here to keep track of something you might forget. It
							will be displayed below!
						</Typography>
						<TextField
							label="Title"
							variant="filled"
							margin="dense"
							onChange={handleTitleChange}
							value={title}
							fullWidth
						/>
						<TextField
							label="Type your note here..."
							variant="filled"
							margin="dense"
							onChange={handleDescriptionChange}
							value={description}
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
					</Paper>
				</Box>
			</Modal>
		</React.Fragment>
	);
}

export default CreateNote;
