import React, { useEffect, useState } from "react";
import { scaleLinear, scaleLog, scaleSequential } from "d3-scale";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import countries from "./countries.json";
import continents from "./continents.json";
import { scaleSymlog } from "d3-scale";
import { interpolateBlues } from "d3-scale-chromatic";
import { Tooltip } from "react-tooltip";
import ChartPercentageStatsContainer from "../chart-percentage-stats-container/ChartPercentageStatsContainer";

import "./GeographyMap.css";

export const GeographyMap = (props: {
  type: "country" | "continent";
  data: {
    name: string;
    value: number;
  }[];
}) => {
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(50);

  useEffect(() => {
    if (props.data.length > 0) {
      const values = props.data.map((d) => d.value);
      setMinValue(Math.min(...values, 1));
      setMaxValue(Math.max(...values, 50));
    }
  }, [props.data]);

  const colorScale = scaleSymlog()
    .domain([minValue, maxValue])
    .constant(10)
    .range([0.25, 1]);

  const getColor = (value: number) => interpolateBlues(colorScale(value));

  return (
    <React.Fragment>
      <ComposableMap
        projectionConfig={{ rotate: [-45, 0, 0] }}
        className="geography__map"
      >
        <Geographies
          geography={props.type === "continent" ? continents : countries}
        >
          {({ geographies }) =>
            geographies.map((geo) => {
              const continentName: string =
                props.type === "continent"
                  ? geo.properties.CONTINENT
                  : geo.properties.name;
              const matchedData = props.data.find(
                (d) =>
                  d.name.startsWith(continentName) ||
                  continentName.startsWith(d.name)
              );
              const requestCount: number = matchedData ? matchedData.value : 0;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getColor(requestCount)}
                  stroke="#FFF"
                  strokeWidth={0.5}
                  data-tooltip-id={`request__origin__map__${props.type}`}
                  data-tooltip-html={`<h4>${continentName}</h4>${requestCount} requests`}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: "#2A4D8C",
                      outline: "none",
                      transition: "fill 0.2s ease-in-out",
                    },
                    pressed: { fill: "#1B3557", outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      <Tooltip id={`request__origin__map__${props.type}`} />

      <ChartPercentageStatsContainer
        data={props.data.map((c) => ({
          name: c.name,
          value: c.value,
        }))}
      />
    </React.Fragment>
  );
};
