import {
  Button,
  FormLayout,
  Grid,
  LegacyCard,
  Page,
  Select,
  TextField,
} from "@shopify/polaris";
import React, { useState } from "react";
import { createdAt, idGenerate, noRef } from "./utility/GlobalFunctions";
import { MyContext } from "../staticData/MyContext";
const initialPaperState = {
  paper_name: "",
  exam_id: "",
  no_of_questions: "",
  total_time_minutes: "",
  total_marks: "",
};
export function CreatePaper() {
  const {
    centralState: { papers, exams },
    setCentralState,enqueueSnackbar
  } = React.useContext(MyContext);
  const [state, setState] = useState(noRef(initialPaperState));
  const submitPaper = (e) => {
    e.preventDefault();
    const {
      paper_name,
      exam_id,
      no_of_questions,
      total_time_minutes,
      total_marks,
    } = state;
    const exist = papers.findIndex((item) => item.paper_name === paper_name);
    const exam_name = exams.find((item) => item.id === exam_id)?.exam_name;
    if (exist === -1) {
      setState({ ...state, ...noRef(initialPaperState) });
      setCentralState((prev) => {
        prev.papers.push({
          id: idGenerate("papers", prev.papers),
          paper_name,
          exam_id,
          exam_name,
          no_of_questions,
          total_time_minutes,
          total_marks,
          questions: [],
          created_at: createdAt(),
        });
        return { ...prev };
      });
      enqueueSnackbar("Created successfully");
    } else {
      enqueueSnackbar("Paper Name Already Exist.:error");
    }
  };
  return (
    <Page
      title={"HeadingFormat(title)"}
      primaryAction={{ content: "Add product" }}
      secondaryActions={[
        {
          content: "Export",
          accessibilityLabel: "Export product list",
          onAction: () => alert("Export action"),
        },
        {
          content: "Import",
          accessibilityLabel: "Import product list",
          onAction: () => alert("Import action"),
        },
      ]}
    >
      <form onSubmit={submitPaper}>
        <Grid>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 3, lg: 12, xl: 12 }}>
            <LegacyCard title="Create Paper" sectioned>
              <FormLayout>
                <Grid>
                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <TextField
                      label="Paper Name"
                      id="outlined-size-small"
                      defaultValue=""
                      placeholder="UPSC-pre 2021"
                      size="small"
                      fullWidth
                      value={state.paper_name}
                      onChange={(e) => setState({ ...state, paper_name: e })}
                      autoComplete="off"
                    />
                  </Grid.Cell>

                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={state.exam_id}
                      onChange={(e) => setState({ ...state, exam_id: e })}
                      label="Choose a Exam"
                      placeholder="Centra Gov."
                      required
                      options={exams.map((option) => {
                        return {
                          label: option.exam_name,
                          value: option.id,
                        };
                      })}
                    />
                  </Grid.Cell>

                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <TextField
                      label="No of Questions"
                      id="outlined-size-small"
                      defaultValue="0"
                      size="small"
                      fullWidth
                      type="number"
                      required
                      value={state.no_of_questions}
                      onChange={(e) =>
                        setState({ ...state, no_of_questions: e })
                      }
                    />
                  </Grid.Cell>

                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <TextField
                      label="Total Time given in minutes"
                      id="outlined-size-small"
                      defaultValue="0"
                      size="small"
                      fullWidth
                      type="number"
                      value={state.total_time_minutes}
                      onChange={(e) =>
                        setState({ ...state, total_time_minutes: e })
                      }
                      required
                    />
                  </Grid.Cell>

                  <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <TextField
                      label="Total marks"
                      id="outlined-size-small"
                      defaultValue="0"
                      size="small"
                      fullWidth
                      type="number"
                      value={state.total_marks}
                      onChange={(e) => setState({ ...state, total_marks: e })}
                      required
                    />
                  </Grid.Cell>
                </Grid>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button primary submit>
                    Save
                  </Button>
                </div>
              </FormLayout>
            </LegacyCard>
          </Grid.Cell>
        </Grid>
      </form>
    </Page>
  );
}
