import * as ACTION_TYPE from '../../actions/actionsTypes'
const initialState = {
	featuresList:{},
	dataHist:{},
	statisticHist:{},
	missingNamesByType:{},
	NamesByProductType:{},
	numericFeatureTitleXY:{}

};

const setFeatureListOutput=(state, action)=>{
	return {...state, featuresList: action.data}
}
const resetFeatureListOutput=(state, action)=>{
	return {...state, featuresList: {}}
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
	let data = action.data
	if(typeof action.data === 'string')
	{
		console.log(data);

		data = JSON.parse(data)
	}

	return {...state, statisticHist: data}
}
const setNameByProductType=(state, action)=>{
	return {...state, NamesByProductType: action.data}
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
		case ACTION_TYPE.SET_NAMES_BY_PRODUCT_TYPE:
			return setNameByProductType(state, action)
		case ACTION_TYPE.RESET_FEATURE_LIST:
			return resetFeatureListOutput(state, action)
			

		default:
			return state;
	}
};

export default reducer;


