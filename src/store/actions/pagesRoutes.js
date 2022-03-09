
import axios from  'axios';
import * as CONST from './actionsTypes'
// import * as URL from '../xurl'


export const  setCurrentPage=(currentPage)=>{
    return(
        {
            type: CONST.SET_CURRENT_PAGE,
            currentPage
        }
    );
}

