let step = 1;
let recommendation = null;
const $ = id => document.getElementById(id);
const steps = [...document.querySelectorAll(".step")];
const choices = [...document.querySelectorAll(".choice")];

function showError(message="") {
  $("error").textContent = message;
  $("error").classList.toggle("hidden", !message);
}
function render() {
  steps.forEach(s => s.classList.toggle("active", Number(s.dataset.step) === step));
  $("stepText").textContent = `Step ${step} of 4`;
  $("bar").style.width = `${step * 25}%`;
  $("back").classList.toggle("hidden", step === 1 || step === 4);
  $("next").classList.toggle("hidden", step === 4);
  showError();
}
choices.forEach(btn => btn.addEventListener("click", () => {
  choices.forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  $("category").value = btn.dataset.value;
}));
$("goal").addEventListener("input", e => $("count").textContent = `${e.target.value.length} / 1200`);

function validate() {
  if (step === 1 && !$("category").value) return "Choose a project type to continue.";
  if (step === 2 && $("goal").value.trim().length < 15) return "Tell us a little more about the outcome you want.";
  if (step === 3) {
    if (!$("budget").value || !$("timeline").value) return "Select a budget and target timeline.";
    if (!$("name").value.trim()) return "Enter your name.";
    if (!$("email").checkValidity()) return "Enter a valid work email.";
  }
  return "";
}
$("next").addEventListener("click", async () => {
  const error = validate();
  if (error) return showError(error);
  if (step < 3) { step++; render(); return; }
  step = 4; render();
  $("loading").classList.remove("hidden");
  try {
    const payload = {
      category: $("category").value,
      goal: $("goal").value.trim(),
      budget: $("budget").value,
      timeline: $("timeline").value
    };
    const res = await fetch("/api/recommend", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    recommendation = data;
    await new Promise(r => setTimeout(r, 650));
    $("resultTitle").textContent = `${data.category} • ${data.complexity} delivery`;
    $("blueprint").textContent = data.blueprint;
    $("complexity").textContent = data.complexity;
    $("services").innerHTML = data.services.map(s => `<span class="tag">${s}</span>`).join("");
    $("loading").classList.add("hidden");
    $("result").classList.remove("hidden");
  } catch (e) {
    $("loading").classList.add("hidden");
    showError(e.message || "Something went wrong. Please try again.");
    step = 3; render();
  }
});
$("back").addEventListener("click", () => { if (step > 1) { step--; render(); }});

$("submitInquiry").addEventListener("click", async () => {
  $("submitInquiry").disabled = true;
  $("submitInquiry").textContent = "Submitting…";
  try {
    const payload = {
      name: $("name").value.trim(), email: $("email").value.trim(),
      category: $("category").value, goal: $("goal").value.trim(),
      budget: $("budget").value, timeline: $("timeline").value,
      recommendation
    };
    const res = await fetch("/api/inquiries", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    $("success").innerHTML = `<strong>Brief captured.</strong> Your prototype inquiry reference is <strong>${data.ref}</strong>.`;
    $("success").classList.remove("hidden");
    $("submitInquiry").textContent = "Submitted ✓";
  } catch(e) {
    $("submitInquiry").disabled = false;
    $("submitInquiry").textContent = "Submit discovery brief →";
    showError(e.message);
  }
});
render();