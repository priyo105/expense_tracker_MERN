/* eslint-disable no-restricted-globals */
import React from "react";
import CollapsableComponent from "../Components/CollapsableComponent";
import CategoryCollapsedElements from "./filters/CategoryFilter";
import DatrRangeFilter from "./filters/DatrRangeFilter";
function TransactionFilter() {
  return (
    <div>
      <CollapsableComponent
        title={"Categories"}
        Children={CategoryCollapsedElements}
      />

      <div className="mt-10">
        <CollapsableComponent title={"Date Range"} Children={DatrRangeFilter} />
      </div>
    </div>
  );
}

export default TransactionFilter;
