
import * as ACTION_TYPE from '../../actions/actionsTypes'
const initialState = {
	featuresList:{},
	dataHist:{}
};

const setFeatureListOutput=(state, action)=>{
	return {...state, featuresList: action.data}
}

const setDataHist=(state, action)=>{
	return {...state, dataHist: action.data}
}


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_FEATURES_LIST_OUTPUT:
            return setFeatureListOutput(state, action)
		case ACTION_TYPE.SET_DATA_HIST:
			return setDataHist(state, action)

		default:
			return state;
	}
};

export default reducer;


