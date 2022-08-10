import React from "react";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
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
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";

const LOGIN_URL = "http://localhost:8080/login"; //Change according to backend.

function LoginForm() {
	const { setAuth } = useAuth(); //When we receive authorization. Put that in the global context.

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [err, setErr] = useState(false); //If server throws an error. Show an error message.

	const handleSubmit = async (e) => {
		//TODO: Api Call here
		e.preventDefault();
		console.log("Submit button pressed!");
		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({ email, password }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			console.log(JSON.stringify(response));
			const accessToken = response?.data?.accessToken;
			const decodedToken = jwt_decode(accessToken);
			console.log(decodedToken);
			//setAuth({ email, password, accountType, accessToken }); //Is it alright to store pwd here?
			//navigate(from, { replace: true }); //TODO: Redirect according to accountType and accountState.
		} catch (err) {
			if (!err?.response) {
				//Do an error here.
			} else if (err.response?.status === 400) {
				//Missing username or password
			} else {
				//Login failed
			}
		}
	};
	const handlePasswordChange = (passwordString) => {
		setPassword(passwordString);
	};
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleEmailChange = (s) => {
		setEmail(s);
	};

	return (
		<Paper sx={{ p: 3, width: 260 }}>
			<Typography mb={1} component="div" variant="h6">
				Login
			</Typography>
			<TextField
				label="Email"
				variant="filled"
				margin="dense"
				fullWidth
				onChange={(e) => handleEmailChange(e.target.value)}
				value={email}
			/>
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
	);
}

export default LoginForm;
