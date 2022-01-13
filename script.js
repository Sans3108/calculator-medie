function randomBg() {
  let body = document.getElementById('body');
  body.className = Math.random() < 0.5 ? 'night' : 'day';
}

const isFloat = x => !!(x % 1);

const roundToTwo = n => Math.floor(n * 100) / 100;

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
  let m = document.getElementById('mean');
  m.innerText = ``;
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

  let formulaString = makeFormulaString(gradeArr, thesis);

  calc.innerHTML = `${preText} ${formulaString}`;
  let data = calculateMean(gradeArr, thesis);

  let m = document.getElementById('mean');
  if (data.subDisplay !== 0) {
    m.innerText = `(${data.subDisplay})`;
  } else m.innerText = ``;

  result.innerText = `${data.display}`;
  effect(true, data);

  console.log(`Grade Array:`);
  console.log(gradeArr);
  console.log(`Thesis:`);
  console.log(thesis);
  console.log(`Result:`);
  console.log(data);
  console.log('-------------------------------------------------');
}

function thesisToggle(s = false) {
  let toggleBtn = document.getElementById('toggleBtn');
  let grid = document.getElementById('thesisGrid');

  if (s) {
    toggleBtn.innerText = 'Nu'
    toggleBtn.className = 'thesis-btn-red';
    grid.className = 'thesis-grid hidden'
    thesis = 0;
  } else {
    toggleBtn.innerText = toggleBtn.innerText === 'Da' ? 'Nu' : 'Da';
    toggleBtn.className = toggleBtn.innerText === 'Da' ? 'thesis-btn-green' : 'thesis-btn-red';
    grid.className = grid.className === 'thesis-grid hidden' ? 'thesis-grid' : 'thesis-grid hidden'
    if (toggleBtn.innerText === 'Nu') thesis = 0;
  }
  update();
}

function setThesis(g) {
  thesis = g;
  update();
}

function _mean(grades) {
  let value = 0;
  grades.forEach(i => value += i);
  return value / grades.length; // un-rounded
}

function _meanThesis(mean, thesis) {
  return (mean * 3 + thesis) / 4;
}

function calculateMean(grades, thesis) {
  if (!grades[0] && thesis !== 0) return { display: thesis, subDisplay: 0 };
  if (grades.length === 1 && thesis === 0) return { display: grades[0], subDisplay: 0 };

  let rawG = _mean(grades);
  let twoG = roundToTwo(rawG);
  let intG = Math.round(twoG);

  if (thesis === 0 && grades.length > 1) return { display: intG, subDisplay: isFloat(twoG) ? twoG : 0, raw: rawG };

  let rawT = _meanThesis(twoG, thesis);
  let twoT = roundToTwo(rawT);
  let intT = Math.round(twoT);

  return { display: intT, subDisplay: isFloat(twoT) ? twoT : 0, raw: rawT };
}

function makeFormulaString(grd, t) {
  if (t === 0) {
    if (grd[1]) return `(${grd.map(g => `<span class="grade-num">${g}</span>`).join(' + ')}) / <span class="grade-count">${grd.length}</span> =`;
    return '';
  }

  if (!grd[0] && t !== 0) return '';

  if (grd[1]) return `((${grd.map(g => `<span class="grade-num">${g}</span>`).join(' + ')}) / <span class="grade-count">${grd.length}</span> * 3 + <span class="thesis-num">${t}</span>) / 4 =`;
  return `(<span class="grade-num">${grd[0]}</span> / <span class="grade-count">${grd.length}</span> * 3 + <span class="thesis-num">${t}</span>) / 4 =`;
}

function effect(s = true, data) {
  let result = document.getElementById('result');

  if (!s) {
    result.className = '';
    return;
  }

  let mean = data.display;

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