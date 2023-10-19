export const ProgressBar = ({ progress }: { progress: number }) => {
  const progressBarStyle = {
    width: "100%",
    height: "30px",
    position: "fixed",
    top: "0",
    left: "0",
    background:
      "linear-gradient(to right, #e5405e 0%, #ffdb3a 25%, #ffdb3a 50%, #ffdb3a 50%, #3fffa2 100%)",
  };

  const percentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontWeight: "bold",
  };

  const lineStyle = {
    height: "100%",
    backgroundColor: "#76768BCE",
    width: "100%",
    transform: `translate(${progress}%, 0)`,
    transition: "transform 0.5s ease-in-out",
  };
  return (
    <div style={progressBarStyle}>
      <div style={lineStyle}></div>
      <div style={percentStyle}>{`${progress}%`}</div>
    </div>
  );
};
