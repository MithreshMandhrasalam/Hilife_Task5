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

function calculateAge(dob) {
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age = age - 1;
  }
  return age;
}

function buildTableRows(employeeList) {
  var html = "";
  for (var i = 0; i < employeeList.length; i++) {
    var emp = employeeList[i];
    var age = calculateAge(emp.dob);
    var badgeClass = "";
    if (emp.status === "Active") {
      badgeClass = "badge active";
    } else {
      badgeClass = "badge inactive";
    }
    html += "<tr>" +
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
  }
  return html;
}

function showTable(filteredList) {
  var tableBody = document.getElementById("tableBody");
  var noResult = document.getElementById("noResult");
  var resultCount = document.getElementById("resultCount");

  resultCount.textContent = filteredList.length;

  if (filteredList.length === 0) {
    tableBody.innerHTML = "";
    noResult.classList.remove("hidden");
  } else {
    tableBody.innerHTML = buildTableRows(filteredList);
    noResult.classList.add("hidden");
  }
}

function applyFilters() {
  var searchText = document.getElementById("searchName").value.toLowerCase().trim();
  var selectedDept = document.getElementById("filterDept").value;
  var selectedDOB = document.getElementById("filterDOB").value;
  var selectedGender = document.getElementById("filterGender").value;

  var filtered = [];
  for (var i = 0; i < employees.length; i++) {
    var emp = employees[i];

    var matchName = false;
    if (emp.name.toLowerCase().indexOf(searchText) !== -1 || emp.id.toLowerCase().indexOf(searchText) !== -1) {
      matchName = true;
    }

    var matchDept = false;
    if (selectedDept === "" || emp.department === selectedDept) {
      matchDept = true;
    }

    var matchDOB = false;
    if (selectedDOB === "" || emp.dob === selectedDOB) {
      matchDOB = true;
    }

    var matchGender = false;
    if (selectedGender === "" || emp.gender === selectedGender) {
      matchGender = true;
    }

    if (matchName && matchDept && matchDOB && matchGender) {
      filtered.push(emp);
    }
  }

  showTable(filtered);
}

function clearFilters() {
  document.getElementById("searchName").value = "";
  document.getElementById("filterDept").value = "";
  document.getElementById("filterDOB").value = "";
  document.getElementById("filterGender").value = "";
  showTable(employees);
}

document.getElementById("searchName").addEventListener("input", applyFilters);
document.getElementById("filterDept").addEventListener("change", applyFilters);
document.getElementById("filterDOB").addEventListener("change", applyFilters);
document.getElementById("filterGender").addEventListener("change", applyFilters);
document.getElementById("clearBtn").addEventListener("click", clearFilters);

showTable(employees);
