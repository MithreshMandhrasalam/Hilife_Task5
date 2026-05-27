// =============================================
//  HiLife Employee Directory - script.js
//  Uses .map() to build table rows from data
// =============================================


// ---- Step 1: Employee Data Array ----
// Each employee is an object with their details
var employees = [
  {
    id: "EMP001",
    name: "John Smith",
    dob: "1990-03-15",
    gender: "Male",
    department: "Cardiology",
    role: "Senior Doctor",
    email: "john.smith@hilife.com",
    status: "Active"
  },
  {
    id: "EMP002",
    name: "Priya Sharma",
    dob: "1995-07-22",
    gender: "Female",
    department: "Neurology",
    role: "Nurse",
    email: "priya.sharma@hilife.com",
    status: "Active"
  },
  {
    id: "EMP003",
    name: "David Lee",
    dob: "1988-11-05",
    gender: "Male",
    department: "Radiology",
    role: "Radiologist",
    email: "david.lee@hilife.com",
    status: "Inactive"
  },
  {
    id: "EMP004",
    name: "Ananya Patel",
    dob: "1993-01-30",
    gender: "Female",
    department: "Pediatrics",
    role: "Pediatrician",
    email: "ananya.patel@hilife.com",
    status: "Active"
  },
  {
    id: "EMP005",
    name: "Michael Brown",
    dob: "1985-06-18",
    gender: "Male",
    department: "HR",
    role: "HR Manager",
    email: "michael.brown@hilife.com",
    status: "Active"
  },
  {
    id: "EMP006",
    name: "Sara Wilson",
    dob: "1998-09-09",
    gender: "Female",
    department: "Cardiology",
    role: "Cardiologist",
    email: "sara.wilson@hilife.com",
    status: "Active"
  },
  {
    id: "EMP007",
    name: "Rajan Mehta",
    dob: "1991-12-25",
    gender: "Male",
    department: "Neurology",
    role: "Neurologist",
    email: "rajan.mehta@hilife.com",
    status: "Inactive"
  },
  {
    id: "EMP008",
    name: "Kavya Nair",
    dob: "1996-04-14",
    gender: "Female",
    department: "HR",
    role: "Recruiter",
    email: "kavya.nair@hilife.com",
    status: "Active"
  },
  {
    id: "EMP009",
    name: "Thomas George",
    dob: "1983-08-02",
    gender: "Male",
    department: "Pediatrics",
    role: "Senior Nurse",
    email: "thomas.george@hilife.com",
    status: "Active"
  },
  {
    id: "EMP010",
    name: "Divya Reddy",
    dob: "1994-02-20",
    gender: "Female",
    department: "Radiology",
    role: "Lab Technician",
    email: "divya.reddy@hilife.com",
    status: "Active"
  }
];


// ---- Step 2: Helper - Calculate Age from DOB ----
function calculateAge(dob) {
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();

  // Check if birthday has passed this year
  var monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age = age - 1;
  }

  return age;
}


// ---- Step 3: Build One Table Row Using .map() ----
// .map() is used here to convert each employee object
// into an HTML table row string

function buildTableRows(employeeList) {

  // .map() goes through each employee and returns a row string
  var rowsArray = employeeList.map(function(emp) {

    // Calculate age for this employee
    var age = calculateAge(emp.dob);

    // Choose badge class based on status
    var badgeClass = emp.status === "Active" ? "badge active" : "badge inactive";

    // Return the HTML for one <tr> row
    return "<tr>" +
      "<td>" + emp.id + "</td>" +
      "<td>" + emp.name + "</td>" +
      "<td>" + emp.dob + "</td>" +
      "<td>" + age + "</td>" +
      "<td>" + emp.gender + "</td>" +
      "<td>" + emp.department + "</td>" +
      "<td>" + emp.role + "</td>" +
      "<td>" + emp.email + "</td>" +
      "<td><span class='" + badgeClass + "'>" + emp.status + "</span></td>" +
    "</tr>";
  });

  // .join("") combines all the row strings into one big string
  return rowsArray.join("");
}


// ---- Step 4: Show Filtered Results in Table ----
function showTable(filteredList) {

  var tableBody = document.getElementById("tableBody");
  var noResult = document.getElementById("noResult");
  var resultCount = document.getElementById("resultCount");

  // Update result count
  resultCount.textContent = filteredList.length;

  // If no employees match, show the "no result" message
  if (filteredList.length === 0) {
    tableBody.innerHTML = "";
    noResult.classList.remove("hidden");
  } else {
    // Build and insert rows
    tableBody.innerHTML = buildTableRows(filteredList);
    noResult.classList.add("hidden");
  }
}


// ---- Step 5: Filter Logic ----
function applyFilters() {

  // Get values from all filter inputs
  var searchText = document.getElementById("searchName").value.toLowerCase().trim();
  var selectedDept = document.getElementById("filterDept").value;
  var selectedDOB = document.getElementById("filterDOB").value;
  var selectedGender = document.getElementById("filterGender").value;

  // Filter the employees array step by step
  var filtered = employees.filter(function(emp) {

    // Check name or ID match
    var matchName = emp.name.toLowerCase().includes(searchText) ||
                    emp.id.toLowerCase().includes(searchText);

    // Check department match
    var matchDept = selectedDept === "" || emp.department === selectedDept;

    // Check date of birth match
    var matchDOB = selectedDOB === "" || emp.dob === selectedDOB;

    // Check gender match
    var matchGender = selectedGender === "" || emp.gender === selectedGender;

    // Employee must match ALL filters to be shown
    return matchName && matchDept && matchDOB && matchGender;
  });

  // Show the filtered results in the table
  showTable(filtered);
}


// ---- Step 6: Clear All Filters ----
function clearFilters() {
  document.getElementById("searchName").value = "";
  document.getElementById("filterDept").value = "";
  document.getElementById("filterDOB").value = "";
  document.getElementById("filterGender").value = "";

  // Show all employees again
  showTable(employees);
}


// ---- Step 7: Attach Event Listeners ----
// Whenever any filter changes, run applyFilters()
document.getElementById("searchName").addEventListener("input", applyFilters);
document.getElementById("filterDept").addEventListener("change", applyFilters);
document.getElementById("filterDOB").addEventListener("change", applyFilters);
document.getElementById("filterGender").addEventListener("change", applyFilters);

// Clear button resets everything
document.getElementById("clearBtn").addEventListener("click", clearFilters);


// ---- Step 8: Load Table on Page Load ----
// Show all employees when the page first opens
showTable(employees);
