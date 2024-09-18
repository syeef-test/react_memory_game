import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios/index.js";
import Table from "react-bootstrap/Table";

function Leadboard() {
  const { response, error, loading, fetchData } = useAxios();
  const [score, setScore] = useState([]);

  const getHighScore = async () => {
    const token = localStorage.getItem("token");

    await fetchData({
      url: "game/high_score",
      method: "GET",
      headers: { authorization: token },
    });
  };

  useEffect(() => {
    getHighScore();
  }, []);

  useEffect(() => {
    if (response) {
      console.log("high_scores", response);
      setScore(response.data);
    }
  }, [response]);

  return (
    <>
      <div>
        <h1>Leadboard</h1>
        <h4>Score greater than 55 is high score</h4>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Score</th>
              <th>Moves</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {score.length > 0 ? (
              score.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.full_name}</td>
                  <td>{data.score}</td>
                  <td>{data.moves}</td>
                  <td>{new Date(data.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Leadboard;
