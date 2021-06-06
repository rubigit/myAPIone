document.addEventListener("DOMContentLoaded", function () {
	console.log(`Ready`)

	const pictures = [
		{ picName: `Broken_heart.png`, alt: `Brokenheart` },
		{ picName: `emptyheart.png`, alt: `empty heart` },
		{ picName: `happyheart.png`, alt: `happy heart` },
		{ picName: `shappyheart.png`, alt: `super happy heart` }
	]

	const loveForm = document.querySelector(`#loveForm`)
	const fname = document.querySelector(`#fname`)
	const sname = document.querySelector(`#sname`)
	const newCalc = document.querySelector(`#newLoveCalc`)
	const loveResult = document.querySelector(`#resultPanel`)

	const clearForm = () => {
		fname.value = ""
		sname.value = ""
	}

	const toggleLoader = function () {
		const lder = document.querySelector(`#loader`)
		lder.classList.toggle(`hide`)
		lder.classList.toggle(`loader`)
	}
	const toggleResult = function () {
		loveResult.classList.toggle(`hide`)
		loveResult.classList.toggle(`resultPanel`)
	}
	const toggleForms = function () {
		loveForm.classList.toggle(`hide`)
		loveForm.classList.toggle(`loveForm`)
		fname.classList.remove(`alert`)
		sname.classList.remove(`alert`)

	}

	function printLoveResult(fname, sname, per, res) {
		toggleLoader()
		let srcpic = ""
		let altpic = ""

		if (per <= 30) {
			srcpic = pictures[0].picName
			altpic = pictures[0].alt
		} else if (per <= 50) {
			srcpic = pictures[1].picName
			altpic = pictures[1].alt
		} else if (per <= 80) {
			srcpic = pictures[2].picName
			altpic = pictures[2].alt
		} else {
			srcpic = pictures[3].picName
			altpic = pictures[3].alt
		}

		loveResult.innerHTML = `
		<p class="pgraphResult"><span>Percentage of love between:</span><span><b>${fname.toUpperCase()}</b> and <b>${sname.toUpperCase()}</b></span><span class="percent">${per}%</span></p>
		<div class="heartContainer">
		<p>${res}</p>
		<img class="heart" src="./img/${srcpic}" alt="${altpic}">
		</div>
		`
		const newLoveCalc = document.createElement(`button`)
		newLoveCalc.classList.add(`newLoveCalc`)
		newLoveCalc.setAttribute(`id`, `newLoveCalc`)
		newLoveCalc.innerHTML = `Make another calculation`
		newLoveCalc.addEventListener(`click`, function () { toggleForms(), toggleResult(), clearForm() })
		loveResult.appendChild(newLoveCalc)
	}

	function calculateLove() {

		fetch(`https://love-calculator.p.rapidapi.com/getPercentage?fname=${fname.value}&sname=${sname.value}`, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "0b168600abmsh79f9a6cdaf4fc2ep120417jsn341f4e4f7d29",
				"x-rapidapi-host": "love-calculator.p.rapidapi.com"
			}
		})
			.then((response) => response.json())
			.then(response => {
				printLoveResult(response.fname, response.sname, Number(response.percentage), response.result)
			})
			.catch(err => {
				console.error(err)
			});
	}

	function runPreLoader() {
		let timing = ``
		toggleLoader()
		toggleForms()
		timing = setTimeout(function () { toggleResult() }, 1000);
	}

	function makeAlert() {
		fname.classList.add(`alert`)
		sname.classList.add(`alert`)
		fname.placeholder = `*Enter your name`
		sname.placeholder = `*Enter your crush name`

	}

	loveForm.addEventListener("submit", function (event) {
		event.preventDefault()
		if (fname.value && sname.value) {
			runPreLoader()
			calculateLove()
			// toggleForms()
		} else {
			makeAlert()
		}

	})

})