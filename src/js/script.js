const customData = [
  {
    option: "Fuel type",
    answer: [
      {
        type: "Petrol",
        price: 30000,
      },
      {
        type: "Diesel",
        price: 40000,
      },
      {
        type: "Electric",
        price: 50000,
      },
      {
        type: "Hybrid",
        price: 60000,
      },
    ],
    image: "../assets/images/step1.png",
    selected: { type: null, price: null },
  },
  {
    option: "Engine size",
    answer: [
      { type: "350hp", price: 30000 },
      { type: "500hp", price: 40000 },
      { type: "750hp", price: 50000 },
    ],
    image: "../assets/images/step2.png",
    selected: { type: null, price: null },
  },
  {
    option: "Transmission",
    answer: [
      { type: "Manual", price: 30000 },
      { type: "Automatic", price: 40000 },
    ],
    image: "../assets/images/step3.png",
    selected: { type: null, price: null },
  },
  {
    option: "Color",
    answer: [
      { type: "Red", price: 30000 },
      { type: "Blue", price: 40000 },
      { type: "Black", price: 50000 },
    ],
    image: "../assets/images/step4.png",
    selected: { type: null, price: null },
  },
  {
    option: "Interior",
    answer: [
      { type: "Leather", price: 30000 },
      { type: "Fabric", price: 40000 },
    ],
    image: "../assets/images/step5.png",
    selected: { type: null, price: null },
  },
];

let currentQuestion = 0;
let basePrice = 120000;

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
orderForm.before(option);

customData[currentQuestion].answer.forEach((data, index) => {
  const inputField = createInputElement(
    "order__input",
    "radio",
    "answer",
    index,
    data.type
  );

  const label = createLabelElement("order__label", data.type, data.type);

  orderForm.appendChild(inputField);
  orderForm.appendChild(label);
});

nextButton.addEventListener("click", () => {
  let selectedAnswerIndex = document.querySelector(
    'input[name="answer"]:checked'
  ).value;
  let sekectedPrice =
    customData[currentQuestion].answer[selectedAnswerIndex].price;

  customData[currentQuestion].selected.type = selectedAnswerIndex;
  customData[currentQuestion].selected.price = sekectedPrice;

  currentQuestion++;

  orderImage.src = customData[currentQuestion].image;
  orderForm.innerHTML = "";

  option.innerText = customData[currentQuestion].option;
  orderForm.before(option);

  customData[currentQuestion].answer.forEach((data, index) => {
    const inputField = createInputElement(
      "order__input",
      "radio",
      "answer",
      index,
      data.type
    );

    const label = createLabelElement("order__label", data.type, data.type);

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

  orderSection.classList.add("column");

  const orderImg = document.createElement("img");
  orderImg.className = "order-section__summary-image";
  orderImg.src = "../assets/images/iris-8.png";
  orderSection.appendChild(orderImg);

  const orderSummary = document.createElement("div");
  orderSummary.className = "order-section__summary";
  orderSection.appendChild(orderSummary);

  customData.forEach((data) => {
    const selectedAnswer = document.createElement("p");
    selectedAnswer.className = "order-section__answer";

    console.log(data);
    console.log(data.selected.type);
    console.log(data.answer[data.selected.type]);
    selectedAnswer.innerText = `${data.answer[data.selected.type].type}`;

    const selectedTitle = document.createElement("h3");
    selectedTitle.className = "order-section__option";
    selectedTitle.innerText = data.option;
    orderSummary.appendChild(selectedTitle);
    orderSummary.appendChild(selectedAnswer);
  });

  const orderSummaryCta = document.createElement("div");
  orderSummaryCta.className = "order-section__cta";
  orderSummary.appendChild(orderSummaryCta);

  let price = customData.reduce((acc, data) => {
    return acc + data.selected.price;
  }, basePrice);

  const totalPrice = document.createElement("p");
  totalPrice.className = "order-section__price";
  totalPrice.innerText = `Total price 
  ${(10 * price).toLocaleString()} NOK`;
  orderSummaryCta.appendChild(totalPrice);

  const orderButton = document.createElement("button");
  orderButton.className = "button button--submit";
  orderButton.innerText = "Order";
  orderButton.addEventListener("click", () => {
    alert("Order has been placed");
  });

  orderSummaryCta.appendChild(orderButton);
};
