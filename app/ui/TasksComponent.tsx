import { fetchgetTasks } from "../lib/apiactions";
import Input from "./Input";
import OneItem from "./OneItem";

const TasksComponent = async () => {
  const data = await fetchgetTasks();
  // console.log(data);

  // const handleCklick = (itemNumber: any) => {
  //   console.log(itemNumber);
  // };

  return (
    <>
      <Input />
      <div className=" flex flex-wrap gap-3 mt-10 ml-5 mr-5">
        {data.map((each: any) => {
          return (
            <div className="" key={each.id}>
              {/* <p >
              {each.id}
            </p> */}
              <OneItem
                taskID={each.id}
                part_number={each.part_number}
                description={each.description}
                status={each.status}
              />
              {/* <span
                // onClick={() => handleCklick(each.id)}
                className=" hover:bg-yellow-500 transition-all w-max h-20 pl-3 pr-3 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm cursor-pointer "
              >
                {each.part_number}
              </span> */}
              {/* <p>{each.description}</p>
            <p>{each.status}</p> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TasksComponent;
