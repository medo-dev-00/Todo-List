import { useState } from "react";

export default function Pomodoro() {
  const [timerState, setTimerState] = useState("start");
  const [timer, setTimer] = useState("00:25:00");

  function countDown() {
    let [hours, minutes, seconds] = [0, 25, 0];
    seconds = 60;
    minutes = 24;
    let count = setInterval(() => {
      if (timerState === "start") {
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        let one = String(hours).padStart(2, "0");
        let two = String(minutes).padStart(2, "0");
        let three = String(seconds).padStart(2, "0");
        setTimer(`${one}:${two}:${three}`);
        if (seconds < 1 && minutes < 1) {
          clearInterval(count);
          setTimer(`${one}:${two}:${three}`);
          setTimerState("stop");
        }
      }
    }, 1);
  }
  return (
    <section>
      <h1 className="text-4xl font-semibold w-fit mx-auto mt-20">المؤقت</h1>
      <div className="text-8xl font-bold mx-auto w-fit mt-15">{timer}</div>
      <div className="flex justify-center items-center gap-4 mt-5">
        <button
          onClick={() => {
            countDown();
          }}
          className="bg-gray-600 text-white px-2 py-1 rounded-sm cursor-pointer"
        >
          {timerState === "start" ? "تشغيل" : "إيقاف"}
        </button>
        <button className="bg-gray-600 text-white px-2 py-1 rounded-sm  cursor-pointer">
          بدء من جديد
        </button>
      </div>
    </section>
  );
}
