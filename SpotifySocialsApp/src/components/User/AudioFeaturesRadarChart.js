import React, { useEffect, useState, useContext } from 'react'
import styled from "styled-components";
import { LineSegment, Arc, VictoryArea, VictoryLabel, VictoryGroup, VictoryPolarAxis, VictoryChart, VictoryTheme } from "victory-native";

const maxima = {
  acousticness: 1,
  danceability: 1,
  energy: 1,
  instrumentalness: 1,
  liveness: 1,
  loudness: -60,
  speechiness: 1,
  tempo: 170
}

function processData(data) {
  const makeDataArray = (d) => {
    return Object.keys(maxima).map((key) => {
      return { x: key, y: d[key] / maxima[key] };
    });
  };
  const newData = data.map((datum) => makeDataArray(datum));

  return newData
}

const AudioFeaturesRadarChart = ({
  graphData
}) => {
  const data = processData(graphData)

  return (
    <VictoryChart polar
      domain={{ y: [0, 1] }}
    >
      <VictoryGroup colorScale={["#2ac940", "#f6527c"]}
        style={{ data: { fillOpacity: 0.2, strokeWidth: 4 } }}
      >
        {data.map((data, i) => {
          return <VictoryArea key={i} data={data} />;
        })}
      </VictoryGroup>
      {
        Object.keys(maxima).map((key, i) => {
          return (
            <VictoryPolarAxis key={i} dependentAxis
              style={{
                axis: { stroke: 'black' }
              }}
              axisLabelComponent={<VictoryLabel style={{ 'fill': 'white' }} />}
              axisComponent={<LineSegment type={"axis"} style={{ strokeWidth: '2px', stroke: "rgba(255, 255, 255, 0)" }} />}
              circularGridComponent={<Arc type={"axis"} style={{ strokeWidth: '2px', stroke: "rgba(255, 255, 255, 0.01)" }} />}
              tickLabelComponent={
                <VictoryLabel style={{ fill: "none" }} />
              }
              labelPlacement="vertical"
              axisValue={i + 1} label={key}
              tickFormat={(t) => t}
              tickValues={[0.25, 0.5, 0.75]}
            />
          );
        })
      }
      <VictoryPolarAxis
        labelPlacement="parallel"
        tickFormat={() => ""}
        style={{
          axis: { strokeWidth: '2px', stroke: "white", opacity: 0.07 },
        }}
        gridComponent={<LineSegment type={"grid"} style={{ strokeWidth: '2px', stroke: "rgba(255, 255, 255, 0.07)" }} />}
      />

    </VictoryChart>
  )
}

export default AudioFeaturesRadarChart
