
import axios from  'axios';
import * as CONST from '../actionsTypes'
import * as URL from '../url'


export const  setFeaturesListFromServer=()=>{
    return async function(dispatch) {
        return axios.get(URL.GET_LIST_FEATURES, {headers :{'Access-Control-Allow-Origin': '*'}})
          .then(({ data }) => {
          dispatch(setFeaturesList(data));
        });
      };
}

export const  getFeatureDescription=()=>{
    return async function(dispatch) {
        return axios.get(URL.GET_FEATURE_DESCRIPTION, {headers :{'Access-Control-Allow-Origin': '*'}})
          .then(({ data }) => {
          dispatch(setFeatureDescription(data));
        });
      };
}

export const  submitToServer=(fileMetaData, accessionNumber, featuresChooseByUser)=>{
    return async function(dispatch) {
     
        if(fileMetaData !== undefined){
            dispatch(setFeaturesChosenByUser(featuresChooseByUser))
        }
      
    };
}


export const setFeaturesList=(data)=>{
    return(
        {
            type: CONST.SET_FEATURES_LIST,
            data
        }
    );
}


export const setFeaturesChosenByUser=(featuresChooseByUser)=>{
    return(
        {
            type: CONST.SET_FEATURES_CHOSEN_BY_USER,
            featuresChooseByUser
        }
    );
}

export const setDoneUploadFile=(value)=>{
    return(
        {
            type: CONST.SET_DONE_UPLOAD_FILE,
            value
        }
    );
}

export const setFeatureDescription=(data)=>{
    return(
        {
            type: CONST.SET_FEATURE_DESCRIPTION,
            data
        }
    );
}

export const setCheckedSelectAll=(data)=>{
    return(
        {
            type: CONST.SET_CHECKED_SELECT_ALL,
            data
        }
    );
}