import React from "react";
import LoginForm from "../components/LoginForm";
import { Box, Container } from "@mui/system";
import { Stack } from "@mui/material";

function LoginPage() {
	return (
		<Box
			sx={{
				mx: "auto",
				width: 360,
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<LoginForm />
		</Box>
	);
}

export default LoginPage;
