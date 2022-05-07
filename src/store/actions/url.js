const URL = 'http://127.0.0.1:5000/'
// NEW PATH'https://bioserverlab.herokuapp.com/'
// http://192.168.1.45:8080
// LOCAL DEV http://127.0.0.1:5000/
//http://192.168.1.46:8080/
//export const POST_FILE_FROM_SERVER = `${URL}api/chooseFileFromServer`
export const POST_UPLOAD_BUCKET_FILE = `${URL}api/uploadBucketFile`
export const GET_LIST_FEATURES = `${URL}api/listFeatures`
export const POST_UPLOAD_FILE = `${URL}api/uploadFile`
export const GET_FEATURES_RESULT = `${URL}api/features`
export const GET_EXISTING_FILES_LIST = `${URL}api/existinglistFiles`
export const GET_DATA_GC_CONTENT = `${URL}api/gc-content`
export const GET_FEATURES_DATA_HIST = `${URL}api/featuresHist`
export const GET_FEATURE_DESCRIPTION = `${URL}api/getFeaturesDescription`
export const GET_TITLE_FEATURE_DESCRIPTION = `${URL}api/getTitleFeaturesDescription`
export const GET_MISSING_NAMES_BY_TYPE = `${URL}/api/missingNames`