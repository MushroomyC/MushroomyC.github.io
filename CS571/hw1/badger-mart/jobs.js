function submitApplication(e) {
    e.preventDefault(); // You can ignore this; prevents the default form submission!

    const jobList = document.getElementsByName("job");
    let formChecked = false;
    for (let i = 0; i < jobList.length; i++) {
        if (jobList[i].checked === true) {
            alert("Thank you for applying to be a " + jobList[i].value + "!");
            formChecked = true;
        }
    }
    if (formChecked === false) {
        alert("Please select a job!");
    }
}