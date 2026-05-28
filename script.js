var employees = [
  {
    id: "EMP101",
    name: "Arun",
    dob: "1999-02-15",
    gender: "Male",
    department: "Software Development",
    role: "Frontend Developer",
    email: "arunkumar@example.com",
    status: "Present"
  },
  {
    id: "EMP102",
    name: "Priya",
    dob: "1998-07-22",
    gender: "Female",
    department: "Web Development",
    role: "UI/UX Designer",
    email: "priyanair@example.com",
    status: "Present"
  },
  {
    id: "EMP103",
    name: "Karthik",
    dob: "1997-11-10",
    gender: "Male",
    department: "Cyber Security",
    role: "Security Analyst",
    email: "karthikraj@example.com",
    status: "Present"
  },
  {
    id: "EMP104",
    name: "Divya",
    dob: "2000-04-03",
    gender: "Female",
    department: "Data Science",
    role: "Data Analyst",
    email: "divyamani@example.com",
    status: "Present"
  },
  {
    id: "EMP105",
    name: "Surya",
    dob: "1996-09-18",
    gender: "Male",
    department: "Cloud Computing",
    role: "Cloud Engineer",
    email: "suryaprakash@example.com",
    status: "On Permission"
  },
  {
    id: "EMP106",
    name: "Keerthi",
    dob: "1999-01-27",
    gender: "Female",
    department: "Artificial Intelligence",
    role: "ML Engineer",
    email: "keerthivarun@example.com",
    status: "Present"
  },
  {
    id: "EMP107",
    name: "Vignesh",
    dob: "1998-06-05",
    gender: "Male",
    department: "IT Support",
    role: "System Administrator",
    email: "vigneshkumar@example.com",
    status: "Present"
  },
  {
    id: "EMP108",
    name: "Nisha",
    dob: "2001-12-14",
    gender: "Female",
    department: "Mobile App Development",
    role: "Android Developer",
    email: "nishatamil@example.com",
    status: "Present"
  },
  {
    id: "EMP109",
    name: "Hari",
    dob: "1997-08-29",
    gender: "Male",
    department: "DevOps",
    role: "DevOps Engineer",
    email: "haribalan@example.com",
    status: "On Leave"
  },
  {
    id: "EMP110",
    name: "Aishwarya",
    dob: "2000-03-11",
    gender: "Female",
    department: "Database Management",
    role: "Database Administrator",
    email: "aishwaryadevi@example.com",
    status: "Present"
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
    var parts = emp.dob.split("-");
    var formattedDOB = parts[2] + "-" + parts[1] + "-" + parts[0];
    var badgeClass = "";
    if (emp.status === "Present") {
      badgeClass = "badge active";
    } else if (emp.status === "On Permission") {
      badgeClass = "badge on-permission";
    } else if (emp.status === "On Leave") {
      badgeClass = "badge on-leave";
    } else {
      badgeClass = "badge";
    }
    html += "<tr>" +
      "<td>" + emp.id + "</td>" +
      "<td>" + emp.name + "</td>" +
      "<td>" + formattedDOB + "</td>" +
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
  var selectedRole = document.getElementById("filterRole").value;
  var selectedGender = document.getElementById("filterGender").value;
  var selectedStatus = document.getElementById("filterStatus").value;

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

    var matchRole = false;
    if (selectedRole === "" || emp.role === selectedRole) {
      matchRole = true;
    }

    var matchGender = false;
    if (selectedGender === "" || emp.gender === selectedGender) {
      matchGender = true;
    }

    var matchStatus = false;
    if (selectedStatus === "" || emp.status === selectedStatus) {
      matchStatus = true;
    }

    if (matchName && matchDept && matchRole && matchGender && matchStatus) {
      filtered.push(emp);
    }
  }

  showTable(filtered);
}

function clearFilters() {
  document.getElementById("searchName").value = "";
  document.getElementById("filterDept").value = "";
  document.getElementById("filterRole").value = "";
  document.getElementById("filterGender").value = "";
  document.getElementById("filterStatus").value = "";
  showTable(employees);
}

document.getElementById("searchName").addEventListener("input", applyFilters);
document.getElementById("filterDept").addEventListener("change", applyFilters);
document.getElementById("filterRole").addEventListener("change", applyFilters);
document.getElementById("filterGender").addEventListener("change", applyFilters);
document.getElementById("filterStatus").addEventListener("change", applyFilters);
document.getElementById("clearBtn").addEventListener("click", clearFilters);

showTable(employees);
