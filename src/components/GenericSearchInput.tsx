import * as React from "react";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import PropsWithChildrenFunction from "../types/PropsWithChildrenFunction";
import { genericSearch } from "../utils/genericSearch";

export interface ISearchProps<T> {
  data: Array<T>;
  propertiesToSearchOn: Array<keyof T>
}

export default function GenericSearchInput<T>(
  props: PropsWithChildrenFunction<ISearchProps<T>, T>
) {
  const { data, propertiesToSearchOn, children } = props;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  useEffect(() => {
    if (debouncedSearchQuery !== undefined) {
      setSearchQuery(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, setSearchQuery]);

  return (
    <>
      <label htmlFor="search" className="mt-3">
        Search! Try me! (I work!)
      </label>
      <input
        id="search"
        className="form-control full-width"
        type="search"
        placeholder="Search..."
        aria-label="Search"
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      {children &&
        data
          .filter((widget) =>
            genericSearch<T>(
              widget,
              propertiesToSearchOn,
              searchQuery
            )
          )
          .map((x) => children(x))}
    </>
  );
}
