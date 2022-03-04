
import { Upload } from 'antd';
import * as ACTION_TYPE from '../../actions/actionsTypes'
const initialState = {
	featuresList:[],
	featuresChosenByUser: [],
	doneUploadFile:''
};

const setFeaturesList=(state, action)=>{
	const featuresListTemp = action.data
	return {...state, featuresList:featuresListTemp}
}

const featuresChosenByUser=(state, action)=>{
	const featuresList = action.featuresChooseByUser
	return {...state, featuresChosenByUser:featuresList}
}

const setDoneUploadFile=(state, action)=>{
	return {...state, doneUploadFile:action.value}
}


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_FEATURES_LIST:
            return setFeaturesList(state, action)
		case ACTION_TYPE.SET_FEATURES_CHOSEN_BY_USER:
			return featuresChosenByUser(state, action)
		case ACTION_TYPE.SET_DONE_UPLOAD_FILE:
			return setDoneUploadFile(state, action)
		default:
			return state;
	}
};

export default reducer;


