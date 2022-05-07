
import * as ACTION_TYPE from '../../actions/actionsTypes'
const initialState = {
	featuresList:{},
	dataHist:{},
	missingNamesByType:{}
};

const setFeatureListOutput=(state, action)=>{
	return {...state, featuresList: action.data}
}

const setDataHist=(state, action)=>{
	return {...state, dataHist: action.data}
}

const setMissingNamesByType=(state, action)=>{
	return {...state, missingNamesByType: action.data}
}


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_FEATURES_LIST_OUTPUT:
            return setFeatureListOutput(state, action)
		case ACTION_TYPE.SET_DATA_HIST:
			return setDataHist(state, action)
		case ACTION_TYPE.SET_MISSING_NAMES_BY_TYPE:
			return setMissingNamesByType(state, action)

		default:
			return state;
	}
};

export default reducer;


