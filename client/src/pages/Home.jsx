import React, { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios/index.js";
import Table from "react-bootstrap/Table";

function Home() {
  const { response, error, loading, fetchData } = useAxios();
  const [score, setScore] = useState([]);

  const getScore = async () => {
    const token = localStorage.getItem("token");

    await fetchData({
      url: "game/score",
      method: "GET",
      headers: { authorization: token },
    });
  };

  useEffect(() => {
    getScore();
  }, []);

  useEffect(() => {
    if (response) {
      //console.log("scores", response);
      setScore(response.data);
    }
  }, [response]);
  return (
    <>
      <div>
        <h1>Home</h1>
        <h4>Score greater than 45 is win</h4>
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
              <th>Result</th>
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
                  <td>{data.result}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
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

export default Home;
