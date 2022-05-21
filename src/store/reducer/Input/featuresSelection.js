import * as ACTION_TYPE from '../../actions/actionsTypes'
const initialState = {
	featuresList:[],
	featuresChosenByUser: [],
	doneUploadFile:false,
	checkedSelectAll:{
		Gene_Features:false,
		General_Features:false,
		Genome_Features:true,
		Protein_Features:false},
	featuresDescription:{},
	featuresTitleDescription:{}
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
	return {...state, doneUploadFile:action.data}
}
const setCheckedSelectAll=(state, action)=>{
	return {...state, checkedSelectAll: action.data}
}
const setFeatureDescription=(state, action)=>{
	return {...state, featuresDescription: action.data}
}
const setTitleFeatureDescription=(state, action)=>{
	return {...state, featuresTitleDescription: action.data}
}



const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_FEATURES_LIST:
            return setFeaturesList(state, action)
		case ACTION_TYPE.SET_FEATURES_CHOSEN_BY_USER:
			return featuresChosenByUser(state, action)
		case ACTION_TYPE.SET_DONE_UPLOAD_FILE:
			return setDoneUploadFile(state, action)
		case ACTION_TYPE.SET_CHECKED_SELECT_ALL:
			return setCheckedSelectAll(state, action)
		case ACTION_TYPE.SET_FEATURE_DESCRIPTION:
			return setFeatureDescription(state, action)
		case ACTION_TYPE.SET_TITLE_FEATURE_DESCRIPTION:
			return setTitleFeatureDescription(state, action)
		default:
			return state;
	}
};

export default reducer;


