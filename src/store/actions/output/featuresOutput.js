
import axios from  'axios';
import * as CONST from '../actionsTypes'
import * as URL from '../url'

//params :{fileList:fileList,featureList:featureList}
//return axios.get(URL.GET_FEATURES_RESULT, {params :{fileList:fileList_to_server}},{headers :{'Access-Control-Allow-Origin': '*'}})

export const  setFeaturesOutput=(featureList, fileList, accessionNumberList, fileFromServer)=>{
    const fileList_to_server =[];
    
    if (fileList.length !== 0){
        for(let i = 0 ;i<fileList.length;i++){
            fileList_to_server.push(fileList[i].name)
        }
    }
    console.log("file",fileFromServer);
 
    const params = {
        fileList:fileList_to_server.length !== 0 ? fileList_to_server :accessionNumberList.length ? accessionNumberList: [fileFromServer],
        featureList:featureList
    }
    console.log("params", params)
    const headers = {
        'Access-Control-Allow-Origin':"*"
    }
    // console.log(fileList_to_server);
    return async function(dispatch) {
        return axios.get(URL.GET_FEATURES_RESULT,{params,headers})
          .then(({ data }) => {
            console.log(data);
        //   console.log(typeof JSON.parse(data));
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
    // console.log(fileList_to_server);
    return async function(dispatch) {
        return axios.get(URL.GET_DATA_GC_CONTENT,{params,headers})
          .then(({ data }) => {
            console.log(data);
        //   console.log(typeof JSON.parse(data));
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

