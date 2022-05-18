
import * as ACTION_TYPE from '../../actions/actionsTypes'
const initialState = {
	featuresList:{},
	dataHist:{},
	statisticHist:{},
	missingNamesByType:{},
	numericFeatureTitleXY:{}
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

const setNumericFeatureTitleXY=(state, action)=>{
	return {...state, numericFeatureTitleXY: action.data}
}

const setStatisticFeatureHist=(state, action)=>{
	return {...state, statisticHist: action.data}
}



const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_FEATURES_LIST_OUTPUT:
            return setFeatureListOutput(state, action)
		case ACTION_TYPE.SET_DATA_HIST:
			return setDataHist(state, action)
		case ACTION_TYPE.SET_MISSING_NAMES_BY_TYPE:
			return setMissingNamesByType(state, action)
		case ACTION_TYPE.SET_NUMERIC_FEATURE_TITLE_X_Y:
			return setNumericFeatureTitleXY(state, action)
		case ACTION_TYPE.SET_STATISTIC_FEATURE_HIST:
			return setStatisticFeatureHist(state, action)
		default:
			return state;
	}
};

export default reducer;


