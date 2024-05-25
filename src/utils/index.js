const mapAksaraToModel = ({
  id,
  number,
  label,
  img_url,
  inserted_at,
  updated_at,
}) => ({
  id,
  number,
  label,
  imgUrl: img_url,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

const mapQuizToModel = ({
  id,
  question,
  img_url,
  has_img,
  correct_answer,
  incorrect_answer1,
  incorrect_answer2,
  incorrect_answer3,
  inserted_at,
  updated_at,
}) => ({
  id,
  question,
  imgUrl: img_url,
  hasImg: has_img,
  correctAnswer: correct_answer,
  incorrectAnswer1: incorrect_answer1,
  incorrectAnswer2: incorrect_answer2,
  incorrectAnswer3: incorrect_answer3,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

module.exports = { mapAksaraToModel, mapQuizToModel };
