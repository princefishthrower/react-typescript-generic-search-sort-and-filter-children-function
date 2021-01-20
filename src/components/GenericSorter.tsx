import * as React from "react";
import { useState } from "react";
import ISorter from "../interfaces/ISorter";
import PropsWithChildrenFunction from "../types/PropsWithChildrenFunction";
import { genericSort } from "../utils/genericSort";

export interface ISortersProps<T> {
  defaultProperty: Extract<keyof T, string | number | Date>;
  data: Array<T>;
}

export default function GenericSorter<T>(props: PropsWithChildrenFunction<ISortersProps<T>, T>) {
  const { data, defaultProperty, children } = props;
  const [activeSorter, setActiveSorter] = useState<ISorter<T>>({
    property: defaultProperty,
    isDescending: true,
  });
  const object = data.length > 0 ? data[0] : {};
  return (
    <>
      <label htmlFor="sorters" className="mt-3">Sorters! Try us too! (We also work!)</label>
      <select
        id="sorters"
        className="custom-select"
        onChange={(event) =>
          setActiveSorter(
            {property: event.target.value.split(",")[0] as any,
            isDescending: event.target.value.split(",")[1] === "true"}
          )
        }
        defaultValue={["title", "true"]}
      >
        {Object.keys(object).map((key) => {
          if (!key) {
            return <></>
          }
          return (
            <>
              <option
                key={`${key}-true`}
                value={[key, "true"]}
              >
                sort by '{key}' descending
              </option>
              <option
                key={`${key}-false`}
                value={[key, "false"]}
              >
                sort by '{key}' ascending
              </option>
            </>
          );
        })}
      </select>
      {children && data
            .sort((widgetA, widgetB) =>
            genericSort<T>(widgetA, widgetB, activeSorter)
          )
            .map(x => children(x))
          }
    </>
  );
}
