
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
          dispatch(setMissingNamesByType(fileList))
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

export const  setStatisticHist =(fileName,featureList)=>{
    const params = {
        fileList:fileName,
        featureList:featureList
    }
    const headers = {
        'Access-Control-Allow-Origin':"*"
    }
    return async function(dispatch) {
        return axios.get(URL.GET_STATISTIC_FEATURE_HIST,{params,headers})
          .then(({data} ) => {
          dispatch(setStatisticFeatureHist(data))
        })
        .catch(err => {
            console.log(err);
            alert("Coudnt load Histograma data resualt");
            window.location.reload();
            // need to decide what to do - how to get back to last page ?
        });
      };
}
export const  setMissingNamesByType=(fileName)=>{
    const params = {
        fileList:fileName,
    }
    const headers = {
        'Access-Control-Allow-Origin':"*"
    }
    return async function(dispatch) {
        return axios.get(URL.GET_MISSING_NAMES_BY_TYPE,{params,headers})
          .then(({data} ) => {
          dispatch(setMissingNamesByTypeFromServer(data))
        })
        .catch(err => {
            console.log(err);
            alert("Coudnt load Histograma data resualt");
            window.location.reload();
            // need to decide what to do - how to get back to last page ?
        });
      };
}

export const  getNumericFeatureTitleXY=()=>{

    const headers = {
        'Access-Control-Allow-Origin':"*"
    }
    return async function(dispatch) {
        return axios.get(URL.GET_NUMERIC_FEATURE_TITLE_X_Y,{headers})
          .then(({data} ) => {
          dispatch(setNumericFeatureTitleXY(data))
        })
        .catch(err => {
            console.log(err);
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

export const setStatisticFeatureHist=(data)=>{
    return(
        {
            type: CONST.SET_STATISTIC_FEATURE_HIST,
            data,
        }
    );
}

export const setMissingNamesByTypeFromServer=(data)=>{
    return(
        {
            type: CONST.SET_MISSING_NAMES_BY_TYPE,
            data,

        }
    );
}


export const setNumericFeatureTitleXY=(data)=>{
    return(
        {
            type: CONST.SET_NUMERIC_FEATURE_TITLE_X_Y,
            data,

        }
    );
}





