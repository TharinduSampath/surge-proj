import { Paper, Typography, Divider } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

function Note() {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");

	useEffect(() => {
		setTitle("Default");
		setDesc("This is a description");
	});

	return (
		<div>
			<Paper sx={{ p: 2, height: 200 }}>
				<Typography variant="h6" my={1}>
					{title}
				</Typography>
				<Divider />
				<Typography variant="body1" my={1}>
					{desc}
				</Typography>
			</Paper>
		</div>
	);
}

export default Note;
