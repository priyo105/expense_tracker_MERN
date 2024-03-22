import React from "react";
import Collapsible from "react-collapsible";

function CollapsableComponent({ title, Children }) {
  return (
    <div>
      <Collapsible
        triggerStyle={{ fontWeight: "bold" }}
        trigger={
          <div className="flex flex-row">
            <p>{title}</p>
            <img
              alt=""
              height={20}
              width={20}
              className="ml-10 mt-1"
              src="/down-arrow.png"
            />
          </div>
        }
      >
        <div>
          <Children />
        </div>
      </Collapsible>
    </div>
  );
}

export default CollapsableComponent;
