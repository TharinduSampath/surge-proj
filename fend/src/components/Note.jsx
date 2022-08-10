import {
	Paper,
	Typography,
	Divider,
	IconButton,
	Modal,
	Box,
	Stack,
	TextField,
	Button,
} from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
};

const EDIT_URL = "";
const DELETE_URL = "";

function Note() {
	let id;
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");

	const [tempTitle, setTempTitle] = useState("");
	const [tempDesc, setTempDesc] = useState("");

	const [editModalOpen, setEditModalOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	useEffect(() => {
		setTitle("Default");
		setDesc("This is a description");
	});

	const handleShowEditModal = () => {
		setTempTitle(title);
		setTempDesc(desc);
		setEditModalOpen(!editModalOpen);
	};
	const handleShowDeleteModal = () => {
		setDeleteModalOpen(!deleteModalOpen);
	};

	const handleEditTitleChange = (e) => {
		setTempTitle(e.target.value);
	};

	const handleEditDescChange = (e) => {
		setTempDesc(e.target.value);
	};

	const handleEditSubmit = () => {
		//TODO: Axios API call.
	};

	const handleDeleteSubmit = () => {
		//TODO: Axios API Call.
	};

	return (
		<div>
			<Paper sx={{ p: 1.5, height: 200 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Typography variant="h6" my={0.5}>
						{title}
					</Typography>
					<Stack direction="row">
						<IconButton onClick={() => handleShowEditModal()}>
							<AiFillEdit />
						</IconButton>
						<IconButton onClick={() => handleShowDeleteModal()}>
							<AiFillDelete />
						</IconButton>
					</Stack>
				</Box>
				<Divider />
				<Typography variant="body1" my={1}>
					{desc}
				</Typography>
			</Paper>
			<Modal open={editModalOpen} onClose={handleShowEditModal}>
				<Box sx={style}>
					<Paper sx={{ p: 3 }}>
						<Typography mb={1} component="div" variant="h6">
							Edit Note
						</Typography>
						<Typography mb={1} component="div" variant="body2">
							Edit your note below. You'll see it appear with your new changes
							after you save it!
						</Typography>
						<TextField
							label="Title"
							placeholder="Give your note a simple title..."
							variant="filled"
							margin="dense"
							onChange={(e) => handleEditTitleChange(e)}
							value={tempTitle}
							fullWidth
						/>
						<TextField
							label="Description"
							placeholder="Type your description here..."
							variant="filled"
							margin="dense"
							onChange={(e) => handleEditDescChange(e)}
							value={tempDesc}
							fullWidth
							multiline
							rows={4}
						/>
						<Stack direction="row" justifyContent="space-between">
							<Button
								sx={{ mt: 1 }}
								color="primary"
								variant="contained"
								onClick={handleShowEditModal}
								size="large"
							>
								Cancel
							</Button>
							<Button
								sx={{ mt: 1 }}
								color="primary"
								variant="contained"
								onClick={handleEditSubmit}
								size="large"
							>
								Edit Note
							</Button>
						</Stack>
					</Paper>
				</Box>
			</Modal>
			<Modal open={deleteModalOpen} onClose={handleShowDeleteModal}>
				<Box sx={style}>
					<Paper sx={{ p: 3 }}>
						<Typography mb={1} component="div" variant="h6">
							Delete Note
						</Typography>
						<Typography mb={1} component="div" variant="body2">
							Are you sure you want to delete your note? It will be lost
							forever!
						</Typography>
						<Stack direction="row" justifyContent="space-between">
							<Button
								sx={{ mt: 1 }}
								color="primary"
								variant="contained"
								onClick={handleShowDeleteModal}
								size="large"
							>
								Cancel
							</Button>
							<Button
								sx={{ mt: 1 }}
								color="primary"
								variant="contained"
								onClick={handleDeleteSubmit}
								size="large"
							>
								Delete Note
							</Button>
						</Stack>
					</Paper>
				</Box>
			</Modal>
		</div>
	);
}

export default Note;
