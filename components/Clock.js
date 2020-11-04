import { useStore } from "effector-react/ssr";
import { $light, $timeString } from "../src/model";

const Clock = () => {
  const light = useStore($light);
  const timeString = useStore($timeString);
  return (
    <div className={light ? "light" : ""}>
      {timeString}
      <style jsx>{`
        div {
          padding: 15px;
          color: #82fa58;
          display: inline-block;
          font: 50px menlo, monaco, monospace;
          background-color: #000;
        }

        .light {
          background-color: #999;
        }
      `}</style>
    </div>
  );
};
export default Clock;
