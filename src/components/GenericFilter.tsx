import * as React from "react";
import { ReactNode, useState } from "react";
import IFilter from "../interfaces/IFilter";
import PropsWithChildrenFunction from "../types/PropsWithChildrenFunction";
import { genericFilter } from "../utils/genericFilter";

export interface IFiltersProps<T> {
  data: Array<T>;
}

export default function GenericFilter<T>(
  props: PropsWithChildrenFunction<IFiltersProps<T>, T>
) {
  const { data, children } = props;
  const [activeFilters, setActiveFilters] = useState<Array<IFilter<T>>>([]);
  const object = data.length > 0 ? data[0] : {};
  const labelTruthy = (
    <>
      is <b>truthy</b>
    </>
  );

  const labelFalsy = (
    <>
      is <b>falsy</b>
    </>
  );

  const keys = Object.keys(object);
  return (
    <div className="p-1 my-2">
      <label className="mt-3">Filters! Try us too! (We also work!)</label>
      {(keys as any).map((key: keyof T) => {
        const getRadioButton = (isTruthyPicked: boolean): ReactNode => {
          const id = isTruthyPicked
            ? `radio-defined-${key}`
            : `radio-not-defined-${key}`;
          const label = isTruthyPicked ? labelTruthy : labelFalsy;

          const getChecked = () => {
            const x = activeFilters.filter((x) => x.property === key);
            return x.length === 1 && x[0].isTruthyPicked === isTruthyPicked;
          };

          return (
            <>
              <input
                type="radio"
                id={id}
                value={key.toString()}
                checked={getChecked()}
                onChange={(event) => {
                  event.target.checked
                    ? setActiveFilters([
                        ...activeFilters.filter(
                          (filter) => filter.property !== key
                        ),
                        { property: key, isTruthyPicked },
                      ])
                    : setActiveFilters(
                        activeFilters.filter(
                          (filter) => filter.property !== key
                        )
                      );
                }}
                className={"m-1 ml-3"}
              />
              <label htmlFor={id}>
                '{key}' {label}
              </label>
            </>
          );
        };

        return (
          <>
            <div key={key.toString()} className="input-group my-3">
              {getRadioButton(true)}
              {getRadioButton(false)}
            </div>
          </>
        );
      })}
      {children &&
        data
          .filter((widget) => genericFilter<T>(widget, activeFilters))
          .map((x) => children(x))}
    </div>
  );
}
