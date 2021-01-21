import React from "react";
import GenericSorter from "./components/GenericSorter";
import GenericFilter from "./components/GenericFilter";
import GenericSearchInput from "./components/GenericSearchInput";
import { WidgetCard } from "./components/WidgetCard";
import IWidget from "./interfaces/IWidget";
import widgets from "./mock-data/widgets";

export default function App() {
  return (
    <div className="container mx-auto my-2">
      <div className="my-3">
        <i>
          From the blog post{" "}
          <a href="https://chrisfrewin.com/blog/extending-react-types-for-children-as-a-function/">
            "Extending React Standard Types to Allow for Children as a Function"
          </a>
          .
        </i>
      </div>
      <GenericSearchInput<IWidget>
        data={widgets}
        propertiesToSearchOn={["title", "description"]}
      >
        {(widget) => <WidgetCard key={widget.id} {...widget} />}
      </GenericSearchInput>
      <h3>Results:</h3>
      <div className="row">
        <GenericSorter<IWidget> data={widgets} defaultProperty="title">
          {(widget) => <WidgetCard key={widget.id} {...widget} />}
        </GenericSorter>
      </div>
      <div className="row">
        <GenericFilter<IWidget> data={widgets}>
          {(widget) => <WidgetCard key={widget.id} {...widget} />}
        </GenericFilter>
      </div>
    </div>
  );
}
