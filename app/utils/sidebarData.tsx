import QuizForm from "~/components/quiz-form";
import Progress from "../components/progress";
import Timer from "../components/timer";

export const SidebarConfig = [
  {
    name: "Progress",
    render: (widgetData:any) => <Progress widgetData={widgetData} percent={10}/>,
    type: "progress",
  },
  {
    name: "Timer",
    render: (widgetData:any) => <Timer widgetData={widgetData} />,
    type: "timer",
  },
  {
    name: "Form",
    render: (widgetData:any) => <QuizForm widgetData={widgetData} />,
    type: "form",
  },
];
