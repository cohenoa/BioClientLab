
import axios from  'axios';
import * as CONST from '../actionsTypes'
import * as URL from '../url'


export const  downloadAccessionNumber = ( accessionNumber)=>{
    return async function(dispatch) {
        return axios
            
            .post(URL.POST_UPLOAD_FILE,{accessionNumber:accessionNumber}, {'Content-Type': 'application/json'})
            .then(res => {
                if(res.status === 200)
                    dispatch(setDoneUploadFile(true))
                
                })
            .catch(err => console.warn(err));  
    };
}

export const  setExistingFilesListFromServer=()=>{
    return async function(dispatch) {
        return axios.get(URL.GET_EXISTING_FILES_LIST, {headers :{'Access-Control-Allow-Origin': '*'}})
          .then(({ data }) => {
          dispatch(setExistingFilesList(data));
        });
      };
}

export const setExistingFilesList=(data)=>{
    return(
        {
            type: CONST.SET_EXISTING_FILES_LIST,
            data
        }
    );
}

export const setDoneUploadFile=(data)=>{
    return(
        {
            type: CONST.SET_DONE_UPLOAD_FILE,
            data
        }
    );
}

