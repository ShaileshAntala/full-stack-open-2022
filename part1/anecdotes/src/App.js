import { useEffect, useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});
  const [mostVoted, setMostVoted] = useState();

  useEffect(() => {
    let max = 0;
    let anecdote = 0;
    for (const vote in votes) {
      if (votes[vote] > max) {
        max = votes[vote];
        anecdote = vote;
        setMostVoted(anecdote);
      }
    }
  }, [votes]);

  const handleNextAnecdote = () => {
    const randomAnecdote = Math.ceil(Math.random() * 5 + 1);
    //making sure if selected is same as random anecdote still anecdote change on click
    if (selected === randomAnecdote) {
      setSelected(randomAnecdote - 1);
    } else {
      setSelected(randomAnecdote);
    }
  };

  const handleVoteClick = () => {
    const votedAnecdote = {
      [selected]: votes[selected] === undefined ? 1 : (votes[selected] += 1),
    };
    setVotes({ ...votes, ...votedAnecdote });
  };

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <p>has {votes[selected] ? votes[selected] : 0} votes</p>
      <br />
      <button onClick={() => handleVoteClick(selected)}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {mostVoted && (
        <>
          <p>{anecdotes[mostVoted]}</p>
          <p>has {votes[mostVoted]} votes</p>
        </>
      )}
    </div>
  );
};

export default App;
