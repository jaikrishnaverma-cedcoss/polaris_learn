export const initialState = {
    exams: [
      {
        id: "exam-1234",
        exam_name: "SSC (CHSL)",
        exam_type: "Central Gov.",
        created_at: "2023-08-01 15:09:58",
      },
      {
        id: "exam-1235",
        exam_name: "SSC (CGL)",
        exam_type: "Central Gov.",
        created_at: "2023-08-01 15:09:58",
      },
      {
        id: "exam-1236",
        exam_name: "UPSC (Pre)",
        exam_type: "Central Gov.",
        created_at: "2023-08-01 15:09:58",
      },
    ],
    papers: [
      {
        id: "papers-9736",
        paper_name: "CGL 2023 s01",
        exam_id: "exam-1235",
        exam_name: "SSC (CGL)",
        no_of_questions: "3",
        total_time_minutes: "6",
        total_marks: "678678",
        questions: [
          {
            bilingual: false,
            paper_name: "2023 s01",
            question: {
              english: "father of proton?",
              hindi: "",
            },
            options: {
              english: ["Rutherford", "chandwik", "einstine", "tomson"],
              hindi: ["", "", "", ""],
            },
            correct_answer: 0,
            imageLink: "",
            loading: false,
          },    {
            bilingual: false,
            paper_name: "2023 s01",
            question: {
              english: "father of atom? 22",
              hindi: "",
            },
            options: {
              english: ["Rutherford", "chandwik", "einstine", "tomson"],
              hindi: ["", "", "", ""],
            },
            correct_answer: 1,
            imageLink: "",
            loading: false,
          },
          {
            bilingual: false,
            paper_name: "2023 s01",
            question: {
              english: "father of atom 33?",
              hindi: "",
            },
            options: {
              english: ["Rutherford", "chandwik", "einstine", "tomson"],
              hindi: ["", "", "", ""],
            },
            correct_answer: 1,
            imageLink: "",
            loading: false,
          },
        ],
        created_at: "2023-08-01 15:55:43",
      },
    ],
    users:[
  
    ]
  };
  
  
  
  export const status_details = [
    {
      id: 0,
      status: "Answered",
    },
    {
      id: 1,
      status: "Not Answered",
    },
    {
      id: 2,
      status: "Not Visited",
    },
    {
      id: 3,
      status: "Mark for Review",
    },
    {
      id: 4,
      status:
        "Answered & Marked for Review (Will not considered for evaluation)",
    },
  ];
  const getStatusById=(id)=>{
   return status_details.find(item=>item.id===id)
  }
  export const HeadingFormat = (key) => {
    if(key && typeof key=="string")
    return key.split("_").map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(" ");
    return key
  };