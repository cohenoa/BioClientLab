
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
            .catch(err => {
                console.warn(err);
                alert("Coudnlt Download file from GenBank By the accession Number enterd");
                window.location.reload();// TODO:Change it to like enter first web

            });  
    };
}

export const  setExistingFilesListFromServer=()=>{
    return async function(dispatch) {
        return axios.get(URL.GET_EXISTING_FILES_LIST, {headers :{'Access-Control-Allow-Origin': '*'}})
          .then(({ data }) => {
          dispatch(setExistingFilesList(data));
        })
        .catch(err =>{
            console.log("err in :", err);
            alert("Coudnlt set files list from server")
            window.location.reload();// TODO:Change it to like enter first web

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

