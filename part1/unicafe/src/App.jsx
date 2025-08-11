import { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const StatsDisplay = (props) => (
  <p>
    {props.text} {props.value}
  </p>
);

const Statistics = ({ stats }) => (
  <div>
    {stats.map((item, index) => (
      <StatsDisplay key={index} text={item.text} value={item.value} />
    ))}
  </div>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  const total = good + neutral + bad;

  const stats = [
    { text: "good", value: good },
    { text: "neutral", value: neutral },
    { text: "bad", value: bad },
    { text: "total", value: total },
    {
      text: "average",
      value: total > 0 ? (good * 1 + bad * -1) / total : 0,
    },
    {
      text: "good %",
      value: total > 0 ? (good / total) * 100 + "%" : "0%",
    },
  ];

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={addGood} text="good" />
      <Button onClick={addNeutral} text="neutral" />
      <Button onClick={addBad} text="bad" />

      <h2>statistics</h2>
      {total > 0 ? <Statistics stats={stats} /> : <p>No feedback given</p>}
    </div>
  );
};

export default App;
