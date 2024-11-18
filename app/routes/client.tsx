import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import Progress from "~/components/progress";
import QuizForm from "~/components/quiz-form";
import Timer from "~/components/timer";
import { loadQuizData } from "~/utils/utils";
import { useNavigate } from "@remix-run/react";

const client = () => {
  const data = useLoaderData<typeof loader>();
  const [formData, setFormData] = useState<Array<any>>([]);
  // const [otherWidgetData, setOtherWidgetData] = useState<Array<any>>([]);
  const [formIndex, setFormIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [isTimerPresent, setIsTimerPresent] = useState(false);
  const [renderedElements, setRenderElements] = useState<Array<any>>([]);
  const navigate = useNavigate();

  const handleRendering = (item: any) => {
    switch (item?.type) {
      case "progress":
        return <Progress widgetData={item} percent={percent} />;
      case "timer":
        return (
          <Timer
            key={formIndex}
            widgetData={item}
            timer={60}
            handleNextQuestion={handleNextQuestion}
          />
        );
      case "form":
        return <QuizForm widgetData={item} key={formIndex} />;
      default:
        return <></>;
    }
  };

  const handleNextQuestion = () => {
    if (isTimerPresent) {
      handleClickIndex();
    }
  };

  const handleClickIndex = () => {
    if (formIndex < formData.length - 1) {
      // // isFormRendered = false
      // setIsformrender(false)
      setRenderElements([]);
      setFormIndex((prev) => {
        const nextIndex = prev + 1;
        setPercent(Math.floor((nextIndex / formData.length) * 100));
        return nextIndex;
      });
    } else {
      navigate(`/thank-you`);
    }
  };

  // Fetch and update form data on load
  useEffect(() => {
    if (data) {
      const filterFormData = data.filter((item: any) => item.type === "form");
      const otherFormData = data.filter((item: any) => item.type !== "form");
      const timer = data.filter((item: any) => item.type === "timer");

      if (timer.length > 0) {
        setIsTimerPresent(true);
      }
      // setOtherWidgetData(otherFormData);
      setFormData(filterFormData);
    }
  }, []);

  // Handle rendering elements without updating state inside render
// Handle rendering elements without updating state inside render
useEffect(() => {
  const newRenderedElements: any = [];
console.log("data", data)
  data.forEach((item: any) => {
    if (item.type === "form") {
      if (formIndex < formData.length) {
        if (formData[formIndex]?.id == item.id) {
          console.log("inside hello",formData[formIndex]?.id,item.id);
          newRenderedElements.push(handleRendering(item));
        }
      }
    } else {
      newRenderedElements.push(handleRendering(item));
    }
  });

  setRenderElements(newRenderedElements);
}, [formIndex, formData]);



  return (
    <div className="flex flex-col gap-2 mx-4 sm:mx-16 md:max-24 lg:mx-80 mt-8">
      <h2>{"Question " + (formIndex + 1)}</h2>

      {/* Render elements stored in state */}
      {renderedElements}

      {/* Next button to navigate through questions */}
      {formIndex !== formData.length && (
        <button
          onClick={handleClickIndex}
          className="bg-blue-500 text-white px-3 py-2 rounded-md mt-5"
        >
          Next
        </button>
      )}
    </div>
  );
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query: any = url.searchParams.get("quizId");
  const quizData = await loadQuizData();
  const widgetData = quizData[query];
  return json(widgetData);
}

export default client;
