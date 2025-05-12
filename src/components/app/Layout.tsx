import { workoutProgram } from "@/utils";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import WorkoutCard from "./WorkoutCard";

function Layout() {
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);
  const [completedWorkouts, setCompletedWorkouts] = useState<number[]>([]);

  useEffect(() => {
    const completed_workouts = localStorage.getItem("completedWorkouts");
    if (completed_workouts !== null) {
      setCompletedWorkouts(JSON.parse(completed_workouts));
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 mt-10 gap-3 mb-10">
        {Object.keys(workoutProgram).map((day, dayIndex) => {
          const dayIndexNumber = dayIndex as keyof typeof workoutProgram;
          const { warmup, workout } = workoutProgram[dayIndexNumber];

          if (selectedWorkout === dayIndex) {
            return (
              <div key={dayIndex} className="col-span-full">
                <WorkoutCard
                  warmup={warmup}
                  workout={workout}
                  day={day}
                  setSelectedWorkout={setSelectedWorkout}
                  setCompletedWorkouts={setCompletedWorkouts}
                />
              </div>
            );
          }

          return (
            <Card
              key={dayIndex}
              onClick={() => setSelectedWorkout(dayIndex)}
              className={`text-center p-2 ${
                completedWorkouts.includes(dayIndex - 1) || dayIndex === 0
                  ? "cursor-pointer"
                  : "pointer-events-none"
              }`}
            >
              <CardHeader>
                {" "}
                <p>
                  Day {dayIndex + 1 < 10 ? "0" + (dayIndex + 1) : dayIndex + 1}
                </p>
              </CardHeader>
              <CardContent>
                <div>
                  {dayIndex === 0 ||
                  completedWorkouts.includes(dayIndex - 1) ? (
                    <p className="my-3">
                      {dayIndex % 3 === 0 ? (
                        <i className="fa-solid fa-dumbbell"></i>
                      ) : dayIndex % 3 === 1 ? (
                        <i className="fa-solid fa-weight-hanging"></i>
                      ) : (
                        <i className="fa-solid fa-bolt"></i>
                      )}
                    </p>
                  ) : (
                    <p>
                      <i className="fa-solid fa-lock my-3"></i>
                    </p>
                  )}
                  <p className="mb-3 text-3xl">
                    {dayIndex % 3 === 0 ? (
                      <span>Push</span>
                    ) : dayIndex % 3 === 1 ? (
                      <span>Pull</span>
                    ) : (
                      <span>Legs</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default Layout;
