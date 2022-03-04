
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

export const  submitToServer=(fileMetaData, accessionNumber, featuresChooseByUser)=>{
    return async function(dispatch) {
        //console.log(fileMetaData);
        dispatch(setDoneUploadFile(false))
        if(fileMetaData !== undefined){
            console.log(featuresChooseByUser);
            dispatch(setFeaturesChosenByUser(featuresChooseByUser))
        }

        // if(fileMetaData !== undefined)
        // {
        //     const formData = new FormData();
        //     formData.append("file",fileMetaData );
        // return axios
        //     .post(URL.POST_UPLOAD_FILE,formData, {'Content-Type': 'multipart/form-data'})
        //     .then(res => 
        //         {
        //         if(res.status === 200)
        //         {
        //             dispatch(setDoneUploadFile(true))
        //         }
        //         }
        //         )
        //     .catch(err => console.warn(err));
        //  }   
         
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