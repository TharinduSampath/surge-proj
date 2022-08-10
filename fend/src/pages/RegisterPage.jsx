import { Box } from "@mui/material";
import React from "react";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
	return (
		<Box
			sx={{
				mx: "auto",
				width: 600,
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<RegisterForm />
		</Box>
	);
}

export default RegisterPage;
