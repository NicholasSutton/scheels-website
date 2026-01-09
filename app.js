/*  Config  */
const config = {
  range: {
    min: 1,
    max: 100
  }
};

let rules = [
  { divisor: 3, text: "Scheels" },
  { divisor: 5, text: ".com" }
];

/*  Range  */
function updateRange() {
  const min = Number(minInput.value);
  const max = Number(maxInput.value);

  if (Number.isNaN(min) || Number.isNaN(max) || min > max) {
    alert("Invalid range");
    return;
  }

  config.range.min = min;
  config.range.max = max;
}

/*  Output  */
function getOutputValue(number) {
  let result = "";

  rules.forEach(rule => {
    if (number % rule.divisor === 0) {
      result += rule.text;
    }
  });

  return result || number;
}

function runProgram() {
  output.innerHTML = "";
  output.style.display = "block";

  for (let i = config.range.min; i <= config.range.max; i++) {
    const line = document.createElement("div");
    line.textContent = getOutputValue(i);
    output.appendChild(line);
  }
}

function resetProgram() {
  output.innerHTML = "";
  output.style.display = "none";
}

/*  Rules  */
function addRule() {
  const divisor = Number(divisorInput.value);
  const text = textInput.value.trim();

  if (!divisor || !text) return;

  rules.push({ divisor, text });
  divisorInput.value = "";
  textInput.value = "";

  renderRules();
}

function removeRule(index) {
  rules.splice(index, 1);
  renderRules();
}

function renderRules() {
  rulesList.innerHTML = "";

  rules.forEach((rule, index) => {
    const row = document.createElement("div");
    row.className = "rule";

    const divisorInput = document.createElement("input");
    divisorInput.type = "number";
    divisorInput.value = rule.divisor;
    divisorInput.onchange = e => {
      rules[index].divisor = Number(e.target.value);
    };

    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = rule.text;
    textInput.onchange = e => {
      rules[index].text = e.target.value.trim();
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeRule(index);

    row.append(divisorInput, textInput, removeBtn);
    rulesList.appendChild(row);
  });
}

/*  Events  */
updateRangeBtn.onclick = updateRange;
addRuleBtn.onclick = addRule;
runBtn.onclick = runProgram;
resetBtn.onclick = resetProgram;

renderRules();

