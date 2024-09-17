import { Score } from "../models/scoreModel.js";

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
    //console.log(req.body);
    //       {
    //   score: 55,
    //   moves: 68,
    //   result: 'win',
    //   userId: '66e990dcfb66ec8d2c8a2838',
    //   fullname: 'Kazi',
    //   email: 'kazisyeef@gmail.com'
    // }

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

    return res.status(200).send(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};
