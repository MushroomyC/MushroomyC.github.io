let stuData;
const stuHTML = document.getElementById("students");

fetch("https://cs571api.cs.wisc.edu/rest/s25/hw2/students", {
	headers: {
		"X-CS571-ID": CS571.getBadgerId()
	}
})
	.then(response => {
		console.log(response.status, response.statusText);
		if (response.status === 200) {
			return response.json();
		} else {
			throw new Error();
		}
	})
	.then(data => {
		stuData = data;
		console.log(data);

		document.getElementById("num-results").innerText = data.length;

		for (let student of data) {
			buildStudents(student);
		}

	})
	.catch(err => console.error(err))


function buildStudents(studs) {
	// TODO This function is just a suggestion! I would suggest calling it after
	//      fetching the data or performing a search. It should populate the
	//      index.html with student data by using createElement and appendChild.

	const cols = document.createElement("div");
	cols.className = "col-12 col-md-6 col-lg-4 col-xl-3";

	const stuName = document.createElement("h2");
	const stuMajor = document.createElement("p");
	const stuDescrip = document.createElement("p");
	const stuInterests = document.createElement("ul");

	stuName.innerText = `${studs.name.first} ${studs.name.last}`;
	stuMajor.innerText = studs.major;
	stuDescrip.innerText = `${studs.name.first} is taking ${studs.numCredits} credits and is `;
	if (studs.fromWisconsin) {
		stuDescrip.innerText += "from Wisconsin.";
	} else {
		stuDescrip.innerText += "not from Wisconsin.";
	}

	if (studs.interests) {
		stuInterests.innerText = `They have ${studs.interests.length} interests including...`;
		for (let interest of studs.interests) {
			const intrst = document.createElement("li");
			intrst.innerText = interest;
			stuInterests.appendChild(intrst);

			const clickableIntrst = document.querySelectorAll("ul li");
			clickableIntrst.forEach(intrst => {
				intrst.addEventListener("click", (e) => {
					const selectedText = e.target.innerText;
					document.getElementById("search-name").value = "";
					document.getElementById("search-major").value = "";
					document.getElementById("search-interest").value = selectedText;
					handleSearch();
				});
			});
		}
	} else {
		stuInterests.innerText = "They have no interests!";
	}

	stuHTML.appendChild(cols);
	cols.appendChild(stuName);
	cols.appendChild(stuMajor);
	cols.appendChild(stuDescrip);
	cols.appendChild(stuInterests);
}

function handleSearch(e) {
	e?.preventDefault(); // You can ignore this; prevents the default form submission!

	const srchName = document.getElementById("search-name").value.toLowerCase().trim();
	const srchMajor = document.getElementById("search-major").value.toLowerCase().trim();
	const srchInterest = document.getElementById("search-interest").value.toLowerCase().trim();


	const srchResults = stuData.filter(stud => {
		const fullName = `${stud.name.first} ${stud.name.last}`.toLowerCase();
		const majors = stud.major.toLowerCase();
		const intrsts = stud.interests;

		if (srchName && !fullName.includes(srchName)) {
			return false;
		}

		if (srchMajor && !majors.includes(srchMajor)) {
			return false;
		}

		if (srchInterest && !intrsts.some(intrst => intrst.toLowerCase().includes(srchInterest))) {
			return false;
		}
		return true;
	});

	document.getElementById("num-results").innerText = srchResults.length;
	stuHTML.innerHTML = "";
	for (let result of srchResults) {
		buildStudents(result);
	}
}

document.getElementById("search-btn").addEventListener("click", handleSearch);
