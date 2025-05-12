function Header() {
  return (
    <>
      <div className="font-bold mt-16">
        <h1 className="text-3xl">Workout tracker</h1>
        <h3>The 30-days simple workouts program</h3>
      </div>
      <div className="mt-10">
        <h3 className="font-bold">
          Complete this training program if you want to...
        </h3>
        <ul className="mt-2 ml-5 list-decimal">
          <li>Follow a simple program with guranteed results</li>
          <li>Get fit, healthy, strong and shredded</li>
          <li>Learn more about gym, training and technique</li>
          <li>Become a lifetime gym bro 💛</li>
        </ul>
      </div>
      <div className="mt-10">
        <h3 className="font-bold text-3xl">The rules</h3>
        <p className="mt-2">
          To complete this program, you <strong>MUST</strong> follow these 3
          simple rules:
        </p>
        <div className="mt-2 ml-5">
          <div className="flex gap-5">
            <p className="font-bold">Rest</p>
            <p>Ensure that you are taking rest days when necessary</p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold">Reps</p>
            <p>Every rep is a pause rep following 2 - 2 - 2 tempo</p>
          </div>
          <div className="flex gap-5">
            <p className="font-bold">Weight*</p>
            <p>
              Select the maximum weight that allows you to complete the set with
              good form
            </p>
          </div>
        </div>
        <p className="mt-2 text-sm">
          *The first and second set should be at 75% and 85% of you working
          weight used for the last two sets.
        </p>
      </div>
      <div className="mt-10">
        <h3 className="font-bold text-3xl">The Training Plan</h3>
        <p className="mt-2">
          This training plan uses a structure know as the Bro Split, and follows
          this rotation 🔽
        </p>
        <p className="my-2">
          <i className="font-bold">Push</i> →{" "}
          <i className="font-bold"> Pull </i>→ <i className="font-bold">Legs</i>{" "}
          → <i className="font-bold">Repeat</i>
        </p>
        <p>
          Complete all of the workouts below and track your progress along the
          way ✅
        </p>
      </div>
    </>
  );
}

export default Header;
