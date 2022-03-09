
import * as ACTION_TYPE from '../../actions/actionsTypes'
const initialState = {
	featuresList:{},
	dataGcContent:[]
};

const setFeatureListOutput=(state, action)=>{
	return {...state, featuresList: action.data}
}

const setDataGcContent=(state, action)=>{
	return {...state, dataGcContent: action.data}
}


const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_FEATURES_LIST_OUTPUT:
            return setFeatureListOutput(state, action)
		case ACTION_TYPE.SET_DATA_GC_CONTENT:
			return setDataGcContent(state, action)

		default:
			return state;
	}
};

export default reducer;


