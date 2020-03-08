document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  trackerCount();
  fetchIssues();
  e.preventDefault();

  
  // document.getElementById("totalIssue").innerText = issues.length;
  // document.getElementById("openIssue").innerText = issues.length;
}

const closeIssue = id => {
  // console.log( typeof id, " ", id);
  const issues = JSON.parse(localStorage.getItem('issues'));
  // console.log(typeof issues[0], " ", issues[0]);
  // console.log(typeof issues[0].id, " ", issues[0].id);
  const currentIssue = issues.find(issue => issue.id == id);
  // console.log(currentIssue);
  currentIssue.status = 'Closed';
  currentIssue.description = "<del>" + currentIssue.description +"</del>"
  localStorage.setItem('issues', JSON.stringify(issues));
  
  // document.getElementById(id).innerHTML = 'onclick = "return false"'
  // $('#'+id).css("pointer-events", "none");
  // document.getElementById("closeBtn").attributes["disabled"] = "disabled";

  trackerCount();
  fetchIssues();
}

const deleteIssue = id => {
  // console.log(typeof id, " ", id);
  const issues = JSON.parse(localStorage.getItem('issues'));
  // console.log(typeof issues[0], " ", issues[0]);
  const remainingIssues = issues.filter(issue => issue.id != id );
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  trackerCount();
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a id="closeBtn" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
// setStatusClosed

// document.getElementById("addBtn").addEventListener("click", function(){
//   const issues = JSON.parse(localStorage.getItem('issues'));
//   document.getElementById("totalIssue").innerText = issues.length;
// });

trackerCount();

function trackerCount() {
  const issues = JSON.parse(localStorage.getItem('issues'));
  let countStatus = 0;
  for (let i = 0; i < issues.length; i++) {
    if ("Open" === issues[i].status) {
      countStatus++;
    }
  }
  // console.log(countStatus);
  document.getElementById("totalIssue").innerText = issues.length;
  document.getElementById("openIssue").innerText = countStatus;
}
