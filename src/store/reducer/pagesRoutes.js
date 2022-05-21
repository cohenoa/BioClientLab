import * as ACTION_TYPE from '../actions/actionsTypes'
const initialState = {
	currentPage:['1']
};

const setCurrentPage=(state, action) =>{
    return {...state, currentPage: action.currentPage}

}


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CURRENT_PAGE:
            return setCurrentPage(state, action)
		
		default:
			return state;
	}
};

export default reducer;


