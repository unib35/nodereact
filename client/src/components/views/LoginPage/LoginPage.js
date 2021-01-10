import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'

function LoginPage(props) {
	const dispatch = useDispatch();
	const [Email, setEmail] = useState("")
	const [Password, setPassword] = useState("")
	const onEmailHandler = (event) => {
		setEmail(event.currentTarget.value)
	}
	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value)
	}
	
	const onSubmitHandler = (event) => {
		//이 코드를 작성해주면 버튼을 작동시킬때마다 페이지를 리프레시 시키는걸 막아줌.
		event.preventDefault(); 
		
		console.log('Email', Email);
		console.log('Password', Password);
		
		let body = {
			email: Email,
			password: Password
		}
		
		dispatch(loginUser(body))
		.then(response => {
			if(response.payload.loginSuccess) {
				props.history.push('/')
			} else {
				alert('잘못된 ID/PASSWORD 입니다.')
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
				<label>Password</label>
				<input type="Password" value={Password} onChange={onPasswordHandler} />
				
				<br />
				<button type="submit">
					Login
				</button>
			
			
			</form>
			
			
		</div>
	)
}

export default withRouter(LoginPage)