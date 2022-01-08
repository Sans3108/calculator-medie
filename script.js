function roundToTwo(n) {
  return +(Math.round(n + "e+2") + "e-2");
}

let gradeArr = [];

function addGrade(g) {
  gradeArr.push(g);
  update();
}

function reset() {
  gradeArr = [];
  update();
}

function update() {
  let calc = document.getElementById('calc');
  let result = document.getElementById('result');

  if (!gradeArr[0]) {
    calc.innerText = 'Formula: suma notelor / numarul de note (rotunjit la 2 decimale)\nNotele tale vor aparea aici, aplicate in formula';
    result.innerText = 'Si media va fi afisata aici';
    return;
  }

  let formulaText = `Formula: suma notelor / numarul de note (rotunjit la 2 decimale)\nMedia ta este:`;
  let formula = formulaText + ` (${gradeArr.join(' + ')}) / ${gradeArr.length} =`;

  if (gradeArr.length === 1) {
    calc.innerText = formulaText;
    result.innerText = `${gradeArr[0]}`;
    return;
  }

  calc.innerText = formula;

  let val = 0;

  gradeArr.forEach(grade => {
    val += grade;
  });

  result.innerText = roundToTwo(val / gradeArr.length);
}