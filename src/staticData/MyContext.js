import { createContext, useEffect, useState } from "react";
import { initialState } from "./initialData";
import { noRef } from "../components/utility/GlobalFunctions";
import { useSnackbar } from "../components/SnackbarWrapper";
import { Frame } from "@shopify/polaris";

export const MyContext = createContext();

export const ContextWraper = (props) => {
  console.log(noRef(initialState));
  const [centralState, setCentralState] = useState(noRef(initialState));
  const { SnackBar, enqueueSnackbar } = useSnackbar();
  // useEffect(() => {
  //   const data = localStorage.getItem("Live_Exam_Jai_Corp");
  //   if (data) setCentralState({ ...JSON.parse(data) });
  // }, []);

  // useEffect(() => {
  //   if (JSON.stringify(initialState) !== JSON.stringify(centralState))
  //     localStorage.setItem("Live_Exam_Jai_Corp", JSON.stringify(centralState));
  // }, [centralState]);u

  return (
    <MyContext.Provider value={{ centralState, setCentralState, enqueueSnackbar }}>
  
<Frame>
{props.children}
     { SnackBar}
</Frame>
  
    </MyContext.Provider>
  );
};
