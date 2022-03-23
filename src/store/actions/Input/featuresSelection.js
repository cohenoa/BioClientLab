
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
        //console.log(fileMetaData);
        dispatch(setDoneUploadFile(false))
        if(fileMetaData !== undefined){
            console.log(featuresChooseByUser);
            dispatch(setFeaturesChosenByUser(featuresChooseByUser))
        }
         
        if(accessionNumber !== '')
        {
            console.log("before axios")
        return axios
            
            .post(URL.POST_UPLOAD_FILE,{accessionNumber:accessionNumber}, {'Content-Type': 'application/json'})
            .then(res => console.log(res))
            .catch(err => console.warn(err));
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