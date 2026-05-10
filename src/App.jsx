import { useState } from "react";
import "./App.css";

function App() {
  const questions = [
    "Ваше ім’я:",
    "Яка ваша улюблена мова програмування?",
    "Який тип застосунків вам цікавіше розробляти?",
    "Що для вас найважливіше в інтерфейсі користувача?",
    "Ваш коментар або побажання:"
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [saved, setSaved] = useState(false);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
    setSaved(false);
  };

  const clearForm = () => {
    setAnswers(Array(questions.length).fill(""));
    setSaved(false);
  };

  const saveAnswersToFile = () => {
    const currentDate = new Date().toLocaleString("uk-UA");

    let fileContent = "Результати опитування\n";
    fileContent += `Дата проходження: ${currentDate}\n`;
    fileContent += "-----------------------------------\n\n";

    questions.forEach((question, index) => {
      fileContent += `${index + 1}. ${question}\n`;
      fileContent += `Відповідь: ${answers[index] || "Не вказано"}\n\n`;
    });

    const blob = new Blob([fileContent], {
      type: "text/plain;charset=utf-8"
    });

    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = "survey_answers.txt";
    link.click();

    URL.revokeObjectURL(fileUrl);
    setSaved(true);
  };

  const isFormEmpty = answers.every((answer) => answer.trim() === "");

  return (
    <div className="app">
      <main className="survey-card">
        <header className="survey-header">
          <p className="subtitle">React Application</p>
          <h1>Форма опитування</h1>
          <p className="description">
            Заповніть відповіді на питання. Після натискання кнопки результати
            буде збережено у текстовий файл.
          </p>
        </header>

        <section className="questions-list">
          {questions.map((question, index) => (
            <div className="question-block" key={index}>
              <label htmlFor={`question-${index}`}>
                {index + 1}. {question}
              </label>

              {index === questions.length - 1 ? (
                <textarea
                  id={`question-${index}`}
                  value={answers[index]}
                  onChange={(event) =>
                    handleAnswerChange(index, event.target.value)
                  }
                  placeholder="Введіть вашу відповідь..."
                  rows="4"
                />
              ) : (
                <input
                  id={`question-${index}`}
                  type="text"
                  value={answers[index]}
                  onChange={(event) =>
                    handleAnswerChange(index, event.target.value)
                  }
                  placeholder="Введіть вашу відповідь..."
                />
              )}
            </div>
          ))}
        </section>

        <div className="buttons">
          <button
            className="primary-button"
            onClick={saveAnswersToFile}
            disabled={isFormEmpty}
          >
            Зберегти відповіді у файл
          </button>

          <button className="secondary-button" onClick={clearForm}>
            Очистити форму
          </button>
        </div>

        {saved && (
          <p className="success-message">
            Відповіді сформовано та збережено у файл.
          </p>
        )}
      </main>
    </div>
  );
}

export default App;