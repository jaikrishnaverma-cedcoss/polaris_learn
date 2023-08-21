import React, { useContext } from "react";
import { MyContext } from "../staticData/MyContext";
import { DataTables } from "./DataTables";
import { noRef } from "./utility/GlobalFunctions";

export const Papers = () => {
  const {
    centralState: { papers },
  } = useContext(MyContext);
  return <DataTables dataSource={noRef(papers.map(x=>{
    delete x["questions"]
    return x;
  }))} title="Papers" />;
};


