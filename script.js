function roundToTwo(n) {
  return +(Math.round(n + "e+2") + "e-2");
}
const maxLen = 10;
let gradeArr = [];
let thesis = 0;

function addGrade(g) {
  if (gradeArr.length >= maxLen) {
    return alert(`De unde atatea note prietene? Hai las-o incolo de activitate...`)
  }
  gradeArr.push(g);
  update();
}

function reset() {
  gradeArr = [];
  thesis = 0;
  update();
  effect(false);
  thesisToggle(true);
}

function update() {
  let calc = document.getElementById('calc');
  let result = document.getElementById('result');

  if (!gradeArr[0] && thesis === 0) {
    calc.innerText = 'Notele tale vor aparea aici si vor fi puse in formula';
    result.innerText = 'Iar media va fi afisata aici';
    return;
  }

  let preText = `Media ta este:`;

  calc.innerText = `${preText} ${makeFormulaString(gradeArr, thesis)}`;
  result.innerText = calculateMean(gradeArr, thesis);
  effect();
}

function thesisToggle(s = false) {
  let toggleBtn = document.getElementById('toggleBtn');
  let grid = document.getElementById('gradeGrid');

  if (s) {
    toggleBtn.innerText = 'Nu'
    toggleBtn.className = 'thesis-btn-red';
    grid.className = 'grade-grid hidden'
    thesis = 0;
  } else {
    toggleBtn.innerText = toggleBtn.innerText === 'Da' ? 'Nu' : 'Da';
    toggleBtn.className = toggleBtn.innerText === 'Da' ? 'thesis-btn-green' : 'thesis-btn-red';
    grid.className = grid.className === 'grade-grid hidden' ? 'grade-grid' : 'grade-grid hidden'
    if (toggleBtn.innerText === 'Nu') thesis = 0;
  }
  update();
}

function setThesis(g) {
  thesis = g;
  update();
}

function calculateMean(grd, t) {
  if (!grd[0]) {
    if (t !== 0) return t;
  }

  let val = 0;
  grd.forEach(i => val += i);

  let mean = roundToTwo(val / grd.length);

  if (t !== 0) mean = Math.round(roundToTwo(((mean * 3) + t) / 4));
  return mean;
}

function makeFormulaString(grd, t) {
  if (t === 0) {
    if (grd[1]) return `(${grd.join(' + ')}) / ${grd.length} =`;
    return '';
  }

  if (!grd[0] && t !== 0) return '';

  if (grd[1]) return `((${grd.join(' + ')}) / ${grd.length} * 3 + ${t}) / 4 =`;
  return `(${grd[0]} / ${grd.length} * 3 + ${t}) / 4 =`;
}

function effect(s = true) {
  let result = document.getElementById('result');
  let mean = calculateMean(gradeArr, thesis);

  if (!s) {
    result.className = '';
    return;
  }

  if (mean < 5) {
    result.className = 'effect-red';
    return;
  }
  if (mean >= 5 && mean < 6) {
    result.className = 'effect-yellow';
    return;
  }
  if (mean >= 6 && mean < 9) {
    result.className = 'effect-blue';
    return;
  }
  if (mean >= 9 && mean < 10) {
    result.className = 'effect-green';
    return;
  }
  result.className = 'effect-rainbow';
  return;
}