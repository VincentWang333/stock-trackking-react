import { Dispatch } from "react";
import { ActionType } from "../action-types";
import { Action } from "../actions";


export const changeSelectedTicker = (ticker:string) => {
    return(dispatch:Dispatch<Action>) => {
        dispatch({
            type:ActionType.CHANGE_TIKCER,
            payload: ticker
        });
    }
}

export const changeSelectedWeekTo = (lowerBoundDate:number, upperBoundDate: number) => {
    return(dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGE_SELECTED_DATE_OF_WEEK,
            payload: [lowerBoundDate, upperBoundDate]
        });
    }
}

export const selectedTickerInfoUpdate = (tickerInfo: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.UPDATE_PERFORMANCE_DATA,
            payload: tickerInfo
        });
    }
}