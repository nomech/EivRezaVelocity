const customData = [
  { option: "Fuel type", answer: ["Petrol", "Diesel", "Electric", "Hybrid"], selected: null },
  { option: "Engine size", answer: ["350hp", "450hp", "600hp"],selected: null },
  { option: "Transmission", answer: ["Automatic", "Manual"],selected: null },
  { option: "Color", answer: ["Red", "Blue", "Black", "White"],selected: null  },
  {
    option: "Interior",
    answer: ["White lather", "Red Synthetic leather", "Black fabric"],
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

option.innerText = customData[currentQuestion].option;
option.className = "order-section__option";
orderForm.appendChild(option);

customData[currentQuestion].answer.forEach((data, index) => {
  const inputField = createInputElement(
    "quiz__input",
    "radio",
    "answer",
    index,
    data
  );

  const label = createLabelElement("quiz__label", data, data);

  orderForm.appendChild(inputField);
  orderForm.appendChild(label);
});

nextButton.addEventListener("click", () => {
    customData[currentQuestion].selected = document.querySelector('input[name="answer"]:checked').value;
    console.log(customData)


    currentQuestion++;
    orderForm.innerHTML = "";

    option.innerText = customData[currentQuestion].option;
    orderForm.appendChild(option);

    customData[currentQuestion].answer.forEach((data, index) => {
      const inputField = createInputElement(
        "quiz__input",
        "radio",
        "answer",
        index,
        data
      );

      const label = createLabelElement("quiz__label", data, data);

      orderForm.appendChild(inputField);
      orderForm.appendChild(label);
    });
    if (customData.length - 1 === currentQuestion) {
        nextButton.addEventListener("click", submitAnswer);
    
      }  
});


const submitAnswer = () => {
    const orderSection = document.querySelector('.order-section');
    orderSection.innerHTML = '';
    const orderSummary = document.createElement('div');
    orderSummary.className = 'order-section__summary';
    orderSection.appendChild(orderSummary);
    customData.forEach((data) => {
        const selectedAnswer = document.createElement('p');
        selectedAnswer.innerText = `${data.option}: ${data.answer[data.selected]}`;
        orderSummary.appendChild(selectedAnswer);
    });
    const orderButton = document.createElement('button');
    orderButton.className = 'button button--submit';
    orderButton.innerText = 'Order';
    orderButton.addEventListener('click', () => {
        alert('Order has been placed');
    });
    orderSection.appendChild(orderButton);

};