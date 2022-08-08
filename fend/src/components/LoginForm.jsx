import React from "react";
import { useState } from "react";
import {
	Container,
	Paper,
	Typography,
	TextField,
	Button,
	Alert,
	InputAdornment,
	FormControl,
	IconButton,
	InputLabel,
	FilledInput,
} from "@mui/material";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function LoginForm() {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [err, setErr] = useState(false); //If server throws an error. Show an error message.

	const handleSubmit = () => {
		//TODO: Api Call here
	};
	const handlePasswordChange = (passwordString) => {
		setPassword(passwordString);
	};
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Container>
			<Paper sx={{ p: 3, width: 260 }}>
				<Typography mb={1} component="div" variant="h6">
					Login
				</Typography>
				<TextField label="Email" variant="filled" margin="dense" fullWidth />
				<FormControl variant="filled" fullWidth margin="dense">
					<InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
					<FilledInput
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => handlePasswordChange(e.target.value)}
						endAdornment={
							<InputAdornment position="end">
								<IconButton onClick={handleShowPassword} edge="end">
									{showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				{err ? (
					<div>
						<Alert severity="error" sx={{ mt: 1 }}>
							Wrong password or email. Please re-check your credentials!
						</Alert>
					</div>
				) : (
					<div></div>
				)}
				<Button
					sx={{ mt: 1 }}
					color="primary"
					variant="contained"
					onClick={handleSubmit}
					size="large"
				>
					Login
				</Button>
			</Paper>
		</Container>
	);
}

export default LoginForm;
