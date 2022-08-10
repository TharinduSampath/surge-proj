import React from "react";
import { useState, useEffect } from "react";
import {
	Box,
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
	Grid,
	Fade,
	Popper,
} from "@mui/material";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

function RegisterForm() {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const [mobile, setMobile] = useState();
	const [mobileError, setMobileError] = useState(false);

	const [dateOfBirth, setDateOfBirth] = useState();

	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState("");
	const [matchPasswordError, setMatchPasswordError] = useState(false);

	const [oldPassword, setOldPassword] = useState(""); //password cannot equal oldPassword on submit.

	const [anchorEl, setAnchorEl] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [err, setErr] = useState(false); //If server throws an error. Show an error message.

	const REGEX_MOBILE = /^(\+\d{1,3}[- ]?)?\d{10}$/;
	const REGEX_PASS =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const GET_URL = "http://localhost:8080/user/single";
	const PATCH_URL = "http://localhost:8080/register/firsttime";

	useEffect(() => {
		async function fetchData() {
			try {
				const email = auth?.email;
				const response = await axios.get(GET_URL, {
					headers: {
						"Content-Type": "application/json",
					},
					params: {
						email: email,
					},
				});
				setEmail(response?.data?.email);
				setOldPassword(response?.data?.password);
				console.log("This data was fetched", email, oldPassword);
				//TODO: Loading Indicators.
			} catch (err) {
				//TODO: Handle errors.
			}
		}
		fetchData();
	}, []);

	const handleSubmit = async () => {
		//TODO: Check all fields
		if (true) {
			const email = auth?.email;
			try {
				const response = await axios.patch(
					PATCH_URL,
					{
						email: email,
						firstName: firstName,
						lastName: lastName,
						mobile: mobile,
						dateOfBirth: dateOfBirth,
						password: password,
					},
					{
						header: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin": "*",
						},
					}
				);
				setAuth(null);
				navigate("/login");
			} catch (err) {
				//TODO: Error handling
			}
		}
	};

	//Each of these functions check validity. Update error status. Then update state.
	const handleFirstNameChange = (s) => {
		setFirstName(s);
	};
	const handleLastNameChange = (s) => {
		setLastName(s);
	};
	const handleMobileChange = (s) => {
		const isValid = REGEX_MOBILE.test(s);
		setMobileError(!isValid);
		setMobile(s);
	};
	const handleDobChange = (s) => {
		setDateOfBirth(s);
	};
	const handlePasswordChange = (s) => {
		const isValid = REGEX_PASS.test(s) && s !== oldPassword;
		setPasswordError(!isValid);
		setPassword(s);
	};
	const handleMatchPasswordChange = (s) => {
		const isValid = password === s;
		setMatchPasswordError(!isValid);
		setMatchPassword(s);
	};
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handlePasswordFocus = (s) => {
		setPasswordFocus(s);
	};

	//TODO: Cleanup and Finish Register layout

	return (
		<Paper sx={{ p: 3 }}>
			<Typography mb={1} component="div" variant="h6">
				Registration Form
			</Typography>
			<TextField
				value={email}
				label="Email"
				variant="filled"
				margin="dense"
				fullWidth
				disabled
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						label="First name"
						variant="filled"
						margin="dense"
						onChange={(e) => handleFirstNameChange(e.target.value)}
						fullWidth
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						label="Last name"
						variant="filled"
						margin="dense"
						onChange={(e) => handleLastNameChange(e.target.value)}
						fullWidth
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						label="Mobile"
						variant="filled"
						margin="dense"
						onChange={(e) => handleMobileChange(e.target.value)}
						fullWidth
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						variant="filled"
						margin="dense"
						label="Date of Birth"
						type="date"
						fullWidth
						onChange={(e) => handleDobChange(e.target.value)}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<FormControl variant="filled" fullWidth margin="dense">
						<InputLabel>Password</InputLabel>
						<FilledInput
							type={showPassword ? "text" : "password"}
							value={password}
							onFocus={(e) => {
								handlePasswordFocus(true);
								setAnchorEl(e.target);
							}}
							onBlur={() => handlePasswordFocus(false)}
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
					<Popper
						open={passwordFocus}
						anchorEl={anchorEl}
						placement="left"
						transition
					>
						{({ TransitionProps }) => (
							<Fade {...TransitionProps} timeout={350}>
								<Paper>
									<Typography sx={{ p: 1, m: 1 }} type="body2">
										Minimum 8 characters <br />
										At least 1 uppercase letter <br />
										1 lowercase letter <br />
										1 number <br />1 special character
									</Typography>
								</Paper>
							</Fade>
						)}
					</Popper>
				</Grid>
				<Grid item xs={6}>
					<FormControl variant="filled" fullWidth margin="dense">
						<InputLabel>ReType-Password</InputLabel>
						<FilledInput
							type={showPassword ? "text" : "password"}
							value={matchPassword}
							onChange={(e) => handleMatchPasswordChange(e.target.value)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton onClick={handleShowPassword} edge="end">
										{showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</Grid>
			</Grid>

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

export default RegisterForm;
