
import axios from  'axios';
import * as CONST from '../actionsTypes'
import * as URL from '../url'


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

