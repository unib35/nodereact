import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
	const dispatch = useDispatch();
	
	const [Email, setEmail] = useState("")
	const [Name, setName] = useState("")
	const [Password, setPassword] = useState("")
	const [ConfirmPassword, setConfirmPassword] = useState("")
	
	const onEmailHandler = (event) => {
		setEmail(event.currentTarget.value)
	}
	const onNameHandler = (event) => {
		setName(event.currentTarget.value)
	}
	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value)
	}
	const onConfirmPasswordHandler = (event) => {
		setConfirmPassword(event.currentTarget.value)
	}
	
	const onSubmitHandler = (event) => {
		//이 코드를 작성해주면 버튼을 작동시킬때마다 페이지를 리프레시 시키는걸 막아줌.
		event.preventDefault(); 
		
		if(Password !== ConfirmPassword) {
			return alert("Password and ConfirmPassword ard not matched!!")
		}
		
		
		let body = {
			email: Email,
			password: Password,
			name: Name
		}
		
		dispatch(registerUser(body))
		.then(response => {
			if(response.payload.success) {
				props.history.push("/login")
			} else {
				alert("Failed to Sign-up")
			}
		})
	}
	
	
	
	return (
		<div style={{
			display : 'flex', justifyContnet: 'center', alignItems: 
			'center', width: '100%', height: '100vh'
		}}>
			<form style={{ display:'flex', flexDirection:'column' }}
				onSubmit={onSubmitHandler}
			>
				<label>Email</label>
				<input type="email" value={Email} onChange={onEmailHandler} />
				
				<label>Name</label>
				<input type="text" value={Name} onChange={onNameHandler} />
				
				<label>Password</label>
				<input type="password" value={Password} onChange={onPasswordHandler} />
				
				<label>Confirm Password</label>
				<input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
				
				<br />
				<button type="submit">
					Register
				</button>
			
			
			</form>
			
			
		</div>
	)
}

export default RegisterPage
