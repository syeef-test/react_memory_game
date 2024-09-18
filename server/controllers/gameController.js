import { Score } from "../models/scoreModel.js";
import { HighScore } from "../models/highScoreModel.js";

export const saveResult = async (req, res, next) => {
  try {
    if (
      !req.body.email ||
      !req.body.userId ||
      !req.body.fullname ||
      !req.body.score ||
      !req.body.moves ||
      !req.body.result
    ) {
      res.status(400).send({ message: "Send all required fields" });
    }

    const newScore = {
      score: req.body.score,
      moves: req.body.moves,
      result: req.body.result,
      full_name: req.body.fullname,
      user_id: req.body.userId,
      email: req.body.email,
    };

    const response = await Score.create(newScore);

    if (!response) {
      return res.status(500).send({ message: "Failed to save score" });
    }

    if (response) {
      if (req.body.score > 45 && req.body.result === "win") {
        const highScore = {
          score: req.body.score,
          moves: req.body.moves,
          full_name: req.body.fullname,
          user_id: req.body.userId,
          email: req.body.email,
        };
        const response2 = await HighScore.create(highScore);
        console.log(response2);
      }
    }

    return res.status(200).send(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getScore = async (req, res, next) => {
  try {
    //console.log(req.user._id);
    const response = await Score.find({
      user_id: req.user._id,
      status: true,
    });

    if (!response.length) {
      return res
        .status(404)
        .send({ message: "No score data found in database" });
    }
    return res
      .status(200)
      .send({ message: "Score data found in database", data: response });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const getHighScore = async (req, res, next) => {
  try {
    const response = await HighScore.find().sort({ createdAt: -1 }).limit(10);

    if (!response.length) {
      return res
        .status(404)
        .send({ message: "No high score data found in database" });
    }
    return res
      .status(200)
      .send({ message: "High score data found in database", data: response });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};
