
import axios from  'axios';
import * as CONST from '../actionsTypes'
import * as URL from '../url'


export const  setFeaturesOutput=(featureList, fileList)=>{
   
    const params = {
        fileList: fileList,
        featureList:featureList
    }
    const headers = {
        'Access-Control-Allow-Origin':"*"
    }
    return async function(dispatch) {
        return axios.get(URL.GET_FEATURES_RESULT,{params,headers})
          .then(({ data }) => {
          dispatch(setFeaturesListOutput(data))
        })
        .catch(err => {
            console.log(err);
            alert("Coudnt load Feature resualt");
            window.location.reload();
            // need to decide what to do - how to get back to last page ?
        });
      };
}

export const  setDataHist=(fileName,featureList)=>{
    const params = {
        fileList:fileName,
        featureList:featureList
    }
    const headers = {
        'Access-Control-Allow-Origin':"*"
    }
    return async function(dispatch) {
        return axios.get(URL.GET_FEATURES_DATA_HIST,{params,headers})
          .then(({data} ) => {
          dispatch(setDataHistFromServer(data))
        })
        .catch(err => {
            console.log(err);
            alert("Coudnt load Histograma data resualt");
            window.location.reload();
            // need to decide what to do - how to get back to last page ?
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

export const setDataHistFromServer=(data)=>{
    return(
        {
            type: CONST.SET_DATA_HIST,
            data,

        }
    );
}

