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
    <Container>
      <AxisLabel
        top={275}
        left={170}
      >Speechiness</AxisLabel>
      <AxisLabel
        top={240}
        left={90}
      >Loudness</AxisLabel>
      <AxisLabel
        top={145}
        left={45}
      >Liveness</AxisLabel>
      <AxisLabel
        top={50}
        left={60}
      >Instrumental</AxisLabel>
      <AxisLabel
        top={15}
        left={185}
      >Energy</AxisLabel>
      <AxisLabel
        top={145}
        left={320}
      >Acoustic</AxisLabel>
      <AxisLabel
        top={240}
        left={275}
      >Tempo</AxisLabel>
      <AxisLabel
        top={50}
        left={275}
      >Danceability</AxisLabel>

      <VictoryChart polar
        domain={{ y: [0, 1] }}
      >
        <VictoryGroup colorScale={["#2ac940", "#f6527c"]}
          style={{ data: { fillOpacity: 0.2, strokeWidth: 3 } }}
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

                axisLabelComponent={<VictoryLabel style={{ 'fill': 'none' }} />}
                axisComponent={<LineSegment type={"axis"} style={{ strokeWidth: '4px', stroke: "rgba(255, 255, 255, 0)" }} />}
                circularGridComponent={<Arc type={"axis"} style={{ strokeWidth: '4px', stroke: "rgba(255, 255, 255, 0.01)" }} />}
                tickLabelComponent={
                  <VictoryLabel style={{ fill: "none" }} />
                }
                labelPlacement="vertical"
                axisValue={i + 1} label={key}
                tickFormat={(t) => t}
                tickValues={[0.33, 0.66]}
              />
            );
          })
        }
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickFormat={() => ""}
          style={{
            axis: { strokeWidth: '4px', stroke: "white", opacity: 0.07 },
          }}
          gridComponent={<LineSegment type={"grid"} style={{ strokeWidth: '4px', stroke: "rgba(255, 255, 255, 0.07)" }} />}
        />

      </VictoryChart>
    </Container>
  )
}

const Container = styled.View`

`
const AxisLabel = styled.Text`
  fontFamily: TTCommons-DemiBold;
  fontSize: 15px;
  color: white;
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left}
`

export default AudioFeaturesRadarChart
