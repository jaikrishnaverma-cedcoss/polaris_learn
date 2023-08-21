import React, { useContext } from "react";
import { MyContext } from "../staticData/MyContext";
import { DataTables } from "./DataTables";
import { noRef } from "./utility/GlobalFunctions";

export const Home = () => {
  const {
    centralState: { exams },
  } = useContext(MyContext);
  return <DataTables dataSource={noRef(exams)} title={"Exams"}/>;
};


