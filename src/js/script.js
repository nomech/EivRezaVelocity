const customData = [
  {
    option: "Fuel type",
    answer: ["Petrol", "Diesel", "Electric", "Hybrid"],
    image: "../assets/images/step1.png",
    selected: null,
  },
  {
    option: "Engine size",
    answer: ["350hp", "450hp", "600hp"],
    image: "../assets/images/step2.png",
    selected: null,
  },
  {
    option: "Transmission",
    answer: ["Automatic", "Manual"],
    image: "../assets/images/step3.png",
    selected: null,
  },
  {
    option: "Color",
    answer: ["Red", "Blue", "Black", "White"],
    image: "../assets/images/step4.png",
    selected: null,
  },
  {
    option: "Interior",
    answer: ["White lather", "Red Synthetic leather", "Black fabric"],
    image: "../assets/images/step5.png",
    selected: null,
  },
];

let currentQuestion = 0;

const nextButton = document.querySelector(".order-section__button");

const createInputElement = (className, type, name, value, id) => {
  const input = document.createElement("input");
  input.className = className;
  input.setAttribute("type", type);
  input.setAttribute("name", name);
  input.id = id;
  input.setAttribute("value", value);

  return input;
};

const createLabelElement = (className, name, text) => {
  const label = document.createElement("label");
  label.className = className;
  label.setAttribute("for", name);
  label.innerText = text;

  return label;
};

const orderForm = document.querySelector(".order-section__form");
const option = document.createElement("h3");
const orderImage = document.querySelector(".order-section__image");
orderImage.src = customData[currentQuestion].image;
option.innerText = customData[currentQuestion].option;
option.className = "order-section__option";
orderForm.appendChild(option);

customData[currentQuestion].answer.forEach((data, index) => {
  const inputField = createInputElement(
    "order__input",
    "radio",
    "answer",
    index,
    data
  );

  const label = createLabelElement("order__label", data, data);

  orderForm.appendChild(inputField);
  orderForm.appendChild(label);
});

nextButton.addEventListener("click", () => {
  customData[currentQuestion].selected = document.querySelector(
    'input[name="answer"]:checked'
  ).value;

  currentQuestion++;
  orderImage.src = customData[currentQuestion].image;
  orderForm.innerHTML = "";

  option.innerText = customData[currentQuestion].option;
  orderForm.appendChild(option);

  customData[currentQuestion].answer.forEach((data, index) => {
    const inputField = createInputElement(
      "order__input",
      "radio",
      "answer",
      index,
      data
    );

    const label = createLabelElement("order__label", data, data);

    orderForm.appendChild(inputField);
    orderForm.appendChild(label);
  });
  if (customData.length - 1 === currentQuestion) {
    nextButton.addEventListener("click", submitAnswer);
  }
});

const submitAnswer = () => {
  const orderSection = document.querySelector(".order-section");
  orderSection.innerHTML = "";
  const orderSummary = document.createElement("div");
  orderSummary.className = "order-section__summary";
  orderSection.appendChild(orderSummary);
  customData.forEach((data) => {
    const selectedAnswer = document.createElement("p");
    selectedAnswer.className = "order-section__answer";
    selectedAnswer.innerText = `${data.answer[data.selected]}`;

    const selectedTitle = document.createElement("h3");
    selectedTitle.className = "order-section__option";
    selectedTitle.innerText = data.option;
    orderSummary.appendChild(selectedTitle);
    orderSummary.appendChild(selectedAnswer);
  });
  const orderButton = document.createElement("button");
  orderButton.className = "button button--submit";
  orderButton.innerText = "Order";
  orderButton.addEventListener("click", () => {
    alert("Order has been placed");
  });
  orderSection.appendChild(orderButton);
};
