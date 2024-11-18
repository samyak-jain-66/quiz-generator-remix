import React from "react";

const Preview = ({ widgets }:{widgets:any}) => {
  console.log("widgets", widgets);
  return (
    <div>
      {widgets?.map((widget:any, index:number) => {
        return <div key={index}>{widget?.render(widget)}</div>;
      })}
    </div>
  );
};

export default Preview;
