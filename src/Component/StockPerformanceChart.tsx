import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function generateTrackingRangePerformanceData(selectedWeekRange: number[], performanceData:[]){
    var targetDateIndex = -1;
    var trackingRangePerformanceDate = [];
    var selectedRangeLowerBoundTimestamp = selectedWeekRange[0];
    var selectedRangeUpperBoundTimestamp = selectedWeekRange[1];
    for(let i=0; i<performanceData.length; i++){
        if(selectedRangeLowerBoundTimestamp < performanceData[i][0] && performanceData[i][0] < selectedRangeUpperBoundTimestamp){
            targetDateIndex = i;
        }
    }
    if (targetDateIndex >=0 ){
        trackingRangePerformanceDate = retriveMostRecentThreeYearsData(targetDateIndex, performanceData);
    }
    return trackingRangePerformanceDate;
}

function retriveMostRecentThreeYearsData(targetDateIndex: number, performanceData: []){
    // we assume that there are 52 weeks in a year
    var weeksOfPerformanceDate = performanceData.length;
    var collectedData: any[] = [];
    var offset = 0;
    if(targetDateIndex+(52*3)>weeksOfPerformanceDate){
        offset = targetDateIndex+(52*3) - weeksOfPerformanceDate + 1;
    }
    var startTargetIndex = targetDateIndex - offset;
    if(startTargetIndex >= 0){
        for(let i=0; i<(52*3); i++){
            collectedData.push(performanceData[startTargetIndex+i]);
        }
    }
    return collectedData;
}

function caculateTrackingRangePerformanceData(trackingRangePerformanceData: any[]):any[]{
    var caculatedData = [];
    var currentValue = 10000;
    for (let i=0; i<trackingRangePerformanceData.length; i++){
        var newDataGroup = [];
        newDataGroup.push(trackingRangePerformanceData[i][0]);
        currentValue = currentValue * (1 + (trackingRangePerformanceData[i][1])/100);
        newDataGroup.push(currentValue);
        caculatedData.push(newDataGroup);
    }
    return caculatedData;
}


export default function StockPerformanceChart(props:{selectedWeekRange:number[], performanceData:[], selectedTicker: string}){
    var trackingRangePerformanceData = generateTrackingRangePerformanceData(props.selectedWeekRange, props.performanceData);
    var seriesData = caculateTrackingRangePerformanceData(trackingRangePerformanceData);
    const option = {
        title:{
            text:"Recent three years performance"
        },
        xAxis: {
            type: 'datetime',
            labels: {
                format: '{value:%e %b, %Y}',
                align: 'right',
                rotation: -30
            }
        },
        series:[
            {
                name: props.selectedTicker,
                data: seriesData
            }
        ]
    }
    return (
        <HighchartsReact
            highcharts={Highcharts} 
            options={option}/>
    );
}