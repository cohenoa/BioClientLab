import * as ACTION_TYPE from '../../actions/actionsTypes'
const initialState = {
	existingFilesList:[]
};

const setExistingFilesList=(state, action)=>{
	return {...state, existingFilesList: [...action.data]}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_EXISTING_FILES_LIST:
            return setExistingFilesList(state, action)
		default:
			return state;
	}
};

export default reducer;


