import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

type WarmupProps = {
  name: string;
  sets: number;
  reps: number;
};

type WorkoutProps = {
  name: string;
  sets: number;
  reps: number;
};

type WorkoutCardProps = {
  warmup: WarmupProps[];
  workout: WorkoutProps[];
  day: string;
  setSelectedWorkout: React.Dispatch<React.SetStateAction<number | null>>;
  setCompletedWorkouts: React.Dispatch<React.SetStateAction<number[] | []>>;
};

function WorkoutCard({
  warmup,
  workout,
  day,
  setSelectedWorkout,
  setCompletedWorkouts,
}: WorkoutCardProps) {
  const [weights, setWeights] = useState<{
    day: number;
    warmup: string[];
    workout: string[];
  }>({
    day: parseInt(day),
    warmup: ["N/A", "N/A"],
    workout: ["N/A", "N/A", "N/A", "N/A", "N/A"],
  });

  function handleSaveWeights() {
    if (localStorage.getItem("saved_weights")) {
      const saved_weights = localStorage.getItem("saved_weights");
      if (saved_weights) {
        let parsed_saved_weights = [...JSON.parse(saved_weights)];
        let found = false;

        for (let i = 0; i < parsed_saved_weights.length; i++) {
          if (parsed_saved_weights[i].day === parseInt(day)) {
            found = true;
            parsed_saved_weights[i] = weights;
            break;
          }
        }

        if (found === false) {
          parsed_saved_weights = [...parsed_saved_weights, weights];
        }

        localStorage.setItem(
          "saved_weights",
          JSON.stringify(parsed_saved_weights)
        );
      }
    } else {
      const saved_weights = [weights];
      localStorage.setItem("saved_weights", JSON.stringify(saved_weights));
    }
  }

  function handleComplete() {
    setCompletedWorkouts((prevState) => {
      const completed_workouts = [...prevState, parseInt(day)];
      localStorage.setItem(
        "completedWorkouts",
        JSON.stringify(completed_workouts)
      );
      return completed_workouts;
    });
  }

  useEffect(() => {
    if (!day) return;

    const saved_weights = localStorage.getItem("saved_weights");
    if (saved_weights) {
      const parsed_saved_weights = [...JSON.parse(saved_weights)];

      for (let i = 0; i < parsed_saved_weights.length; i++) {
        if (parsed_saved_weights[i].day === parseInt(day)) {
          setWeights(parsed_saved_weights[i]);
          break;
        }
      }
    }
  }, [day]);

  return (
    <>
      <Card className="pb-2">
        <div className="flex flex-col pl-5">
          <div className="flex items-center justify-between">
            <p>
              Day{" "}
              {parseInt(day) + 1 < 10
                ? "0" + (parseInt(day) + 1)
                : parseInt(day) + 1}
            </p>
            <p className="pr-5">
              {parseInt(day) % 3 === 0 ? (
                <i className="fa-solid fa-dumbbell"></i>
              ) : parseInt(day) % 3 === 1 ? (
                <i className="fa-solid fa-weight-hanging"></i>
              ) : (
                <i className="fa-solid fa-bolt"></i>
              )}
            </p>
          </div>
          <p className="mb-3 text-3xl font-extrabold">
            {parseInt(day) % 3 === 0 ? (
              <span>Push</span>
            ) : parseInt(day) % 3 === 1 ? (
              <span>Pull</span>
            ) : (
              <span>Legs</span>
            )}{" "}
            Workout
          </p>
        </div>
      </Card>

      <div className="p-1">
        <div className="grid grid-cols-5 font-bold mb-2">
          <p className="col-span-2">Warmup</p>
          <p>Sets</p>
          <p>Reps</p>
          <p>Max weight</p>
        </div>
        <div className="flex flex-col gap-4">
          {warmup.map((warmup, warmupIndex) => {
            return (
              <div key={warmupIndex} className="grid grid-cols-5">
                <p className="col-span-2">
                  {warmupIndex + 1}. {warmup.name}
                </p>
                <p>{warmup.sets}</p>
                <p>{warmup.reps}</p>
                <Input
                  type="text"
                  placeholder="N/A"
                  value={weights.warmup[warmupIndex]}
                  onChange={(e) => {
                    setWeights((prevState) => ({
                      ...prevState,
                      warmup: {
                        ...prevState.warmup,
                        [warmupIndex]: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-5">
        <div className="grid grid-cols-5 font-bold mb-2">
          <p className="col-span-2">Workout</p>
          <p>Sets</p>
          <p>Reps</p>
          <p>Max weight</p>
        </div>
        <div className="flex flex-col gap-4">
          {workout.map((workout, workoutIndex) => {
            return (
              <div key={workoutIndex} className="grid grid-cols-5">
                <p className="col-span-2">
                  {workoutIndex + 1}. {workout.name}
                </p>
                <p>{workout.sets}</p>
                <p>{workout.reps}</p>
                <Input
                  type="text"
                  placeholder="N/A"
                  value={weights.workout[workoutIndex]}
                  onChange={(e) => {
                    setWeights((prevState) => ({
                      ...prevState,
                      workout: {
                        ...prevState.workout,
                        [workoutIndex]: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <Button
          onClick={() => {
            handleSaveWeights();
            setSelectedWorkout(null);
          }}
          className="cursor-pointer"
        >
          Save & exit
        </Button>
        <Button
          onClick={() => {
            handleComplete();
            setSelectedWorkout(null);
          }}
          className="ml-3 cursor-pointer"
        >
          Complete
        </Button>
      </div>
    </>
  );
}
export default WorkoutCard;
