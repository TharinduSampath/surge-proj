import React from "react";
import { Typography, Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
	const navigate = useNavigate();
	return (
		<Box
			sx={{
				mx: "auto",
				width: 400,
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<Paper
				sx={{
					p: 2,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<Typography my={2} align="center">
					Oops! Looks like you went somewhere unintended!. I hope you find you
					way back!
				</Typography>
				<Button
					variant="contained"
					onClick={() => {
						navigate("/login");
					}}
				>
					Back to login
				</Button>
			</Paper>
		</Box>
	);
}

export default ErrorPage;
