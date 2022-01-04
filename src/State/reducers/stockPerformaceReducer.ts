import { ActionType } from "../action-types";
import { Action } from "../actions";
import {AAPL} from "../constants";


const initialState = {
    selectedTicker : AAPL,
    selectedWeekRangeTimestamp : [],
    minDateRangeTimestamp: 0,
    maxDateRangeTimestamp: 0,
    performanceData: []
}

//Ideally, all the time object should base in UTC time zone,
//but in this case we are using week range to handle a larger time offset 
function getWeekRangeLowerBoundTimestamp(timestamp:number){
    var date = new Date(timestamp);
    date.setDate(date.getDate()-4);
    return date.getTime();
}

function getWeekRangeUpperBoundTimestamp(timestamp:number){
    var date = new Date(timestamp);
    date.setDate(date.getDate()+2);
    return date.getTime();
}

function validateSelectedTimeRange(selectedWeekRange: number[], performanceData:[]){
    var valid = false;
    var targetIndex = -1;
    var selectedRangeLowerBoundTimestamp = selectedWeekRange[0];
    var selectedRangeUpperBoundTimestamp = selectedWeekRange[1];
    for(let i=0; i<performanceData.length; i++){
        if(selectedRangeLowerBoundTimestamp < performanceData[i][0] && performanceData[i][0] < selectedRangeUpperBoundTimestamp){
            targetIndex = i;
        }
    }
    if (targetIndex >=0 ){
        if(targetIndex+(52*3)< performanceData.length){
            valid = true;
        }
    }
    return valid;

}

const reducer = (state: any=initialState, action: Action) => {
    switch(action.type){
        case ActionType.CHANGE_TIKCER:
            return {...state, selectedTicker: action.payload };
        case ActionType.CHANGE_SELECTED_DATE_OF_WEEK:
            if(!validateSelectedTimeRange(action.payload, state.performanceData)){
                alert("Not enought data can be retrived, date range has been adjusted to the most recent three years of your selected date");
            }
            return {...state, selectedWeekRangeTimestamp: [...action.payload] };
        case ActionType.UPDATE_PERFORMANCE_DATA:
            return {...state, 
                    selectedWeekRangeTimestamp: [getWeekRangeLowerBoundTimestamp(action.payload.performance[0][0]), getWeekRangeUpperBoundTimestamp(action.payload.performance[0][0])], 
                    minDateRangeTimestamp: getWeekRangeLowerBoundTimestamp(action.payload.performance[0][0]),
                    maxDateRangeTimestamp: getWeekRangeUpperBoundTimestamp(action.payload.performance[action.payload.performance.length-1][0]),
                    performanceData: [...action.payload.performance]};
        default:
            return state
    }
}

export default reducer;