import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const StatsDisplay = (props) => (
  <p>
    {props.text} {props.value}
  </p>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);

  const addNeutral = () => setNeutral(neutral + 1);

  const addBad = () => setBad(bad + 1);

  const total = good + neutral + bad;

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={addGood} text="good" />
      <Button onClick={addNeutral} text="neutral" />
      <Button onClick={addBad} text="bad" />

      <h2>statistics</h2>
      <StatsDisplay text="good" value={good} />
      <StatsDisplay text="neutral" value={neutral} />
      <StatsDisplay text="bad" value={bad} />
      <StatsDisplay text="all" value={total} />
      <StatsDisplay
        text="average"
        value={total > 0 ? (good * 1 + neutral * 0 + bad * -1) / total : 0}
      />
      <StatsDisplay
        text="percentage %"
        value={`${total > 0 ? (good / total) * 100 : 0}%`}
      />
    </div>
  );
};

export default App;
