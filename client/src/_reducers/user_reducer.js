import {
	LOGIN_USER
} from'../_actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case LOGIN_USER:
			return {...state, loginSuccess: action.payload} //스프레드 오퍼레이
		default:
			return state;
	}
}