
import axios from  'axios';
import * as CONST from '../actionsTypes'
import * as URL from '../url'


export const  setFeaturesOutput=(featureList, fileList)=>{
   
    const params = {
        fileList: fileList,
        featureList:featureList
    }
    console.log("params", params)
    const headers = {
        'Access-Control-Allow-Origin':"*"
    }
    return async function(dispatch) {
        return axios.get(URL.GET_FEATURES_RESULT,{params,headers})
          .then(({ data }) => {
          dispatch(setFeaturesListOutput(data))
        });
      };
}

export const  setDataGcContent=(fileName)=>{
    const params = {
        fileName:fileName,
    }
    const headers = {
        'Access-Control-Allow-Origin':"*"
    }
    return async function(dispatch) {
        return axios.get(URL.GET_DATA_GC_CONTENT,{params,headers})
          .then(({ data }) => {
            console.log(data);
          dispatch(setDataGcContentFromServer(data))
        });
      };
}

export const setFeaturesListOutput=(data, feature_type, nameFile)=>{
    return(
        {
            type: CONST.SET_FEATURES_LIST_OUTPUT,
            data,
            feature_type,
            nameFile
        }
    );
}

export const setDataGcContentFromServer=(data)=>{
    return(
        {
            type: CONST.SET_DATA_GC_CONTENT,
            data,

        }
    );
}

