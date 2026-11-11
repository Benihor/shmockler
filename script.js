const amount = document.querySelector("#amount");
const years = document.querySelector("#years");
const rate = document.querySelector("#rate");
const amountOut = document.querySelector("#amountOut");
const yearsOut = document.querySelector("#yearsOut");
const rateOut = document.querySelector("#rateOut");
const monthlyOut = document.querySelector("#monthly");
const totalOut = document.querySelector("#total");
const calcWa = document.querySelector("#calcWa");
const number = new Intl.NumberFormat("he-IL");

function paintRange(input) {
  const progress = ((input.value - input.min) / (input.max - input.min)) * 100;
  input.style.background = `linear-gradient(to left, var(--gold) ${progress}%, #ddd ${progress}%)`;
}

function calculateMortgage() {
  const principal = Number(amount.value);
  const termYears = Number(years.value);
  const annualRate = Number(rate.value);
  const months = termYears * 12;
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment =
    monthlyRate === 0
      ? principal / months
      : principal * (monthlyRate * (1 + monthlyRate) ** months) /
        ((1 + monthlyRate) ** months - 1);
  const totalPayment = monthlyPayment * months;

  amountOut.textContent = `${number.format(principal)} ₪`;
  yearsOut.textContent = `${termYears} שנים`;
  rateOut.textContent = `${annualRate.toFixed(1)}%`;
  monthlyOut.textContent = `₪${number.format(Math.round(monthlyPayment))}`;
  totalOut.textContent = `סך החזר משוער: ₪${number.format(Math.round(totalPayment))}`;

  const message = [
    "היי אוריה, חישבתי באתר אומדן למשכנתא:",
    `סכום: ${number.format(principal)} ₪`,
    `תקופה: ${termYears} שנים`,
    `ריבית משוערת: ${annualRate.toFixed(1)}%`,
    `החזר חודשי משוער: ${number.format(Math.round(monthlyPayment))} ₪`,
    "אשמח לבדיקה מקצועית."
  ].join("\n");
  calcWa.href = `https://wa.me/972502080108?text=${encodeURIComponent(message)}`;

  [amount, years, rate].forEach(paintRange);
}

[amount, years, rate].forEach((input) => {
  input.addEventListener("input", calculateMortgage);
});
calculateMortgage();

const menuButton = document.querySelector(".menu");
const navigation = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".service, .steps article, .reviews article").forEach((element) => {
  element.classList.add("reveal");
  observer.observe(element);
});
