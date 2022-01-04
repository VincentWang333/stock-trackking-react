import { bindActionCreators } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { actionCreators } from "../State";
import { AppService } from "../Service/app.service";

export default function TickerPicker(props:{selectedTicker: string}){
    const appService = new AppService();
    const dispatch = useDispatch();
    const {changeSelectedTicker, selectedTickerInfoUpdate} = bindActionCreators(actionCreators, dispatch);

    //only fetch new data when selecte ticker is changed
    useEffect(()=>{
        if(props.selectedTicker){
            appService.getSelectedStockInfo(props.selectedTicker).then((data)=>{
                selectedTickerInfoUpdate(data);
            });
        }
    }, [props.selectedTicker])
      
    return <select name="stocke-picker" id="stocke-picker" value={props.selectedTicker} onChange={(event)=>{changeSelectedTicker(event.target.value)}}>
                <option value="AAPL">AAPL</option>
                <option value="AMZN">AMZN</option>
                <option value="TSLA">TSLA</option>
            </select>
}