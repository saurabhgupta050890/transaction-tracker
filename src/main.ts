import "./style.css";
import { getTransactionInfo } from "transaction-sms-parser";

// element Refs
const inputTextArea = document.getElementById(
  "sms-input"
) as HTMLTextAreaElement;
const parseButton = document.getElementById("process-btn") as HTMLButtonElement;
const parsedOutputContainer = document.getElementById("parsed-data");
const copyButton = document.getElementById("copy-btn") as HTMLButtonElement;
const tooltip = document.getElementById("copy-tooltip");
const copyIcon = document.getElementById("copy-icon");
const copiedIcon = document.getElementById("copied-icon");
const lightModeInput = document.getElementById(
  "light-mode"
) as HTMLInputElement;
const darkModeInput = document.getElementById("dark-mode") as HTMLInputElement;

// Init theme
// By default theme is picked from system settings (prefers-color-scheme)
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  lightModeInput.checked = savedTheme === "light";
  darkModeInput.checked = savedTheme === "dark";
} else {
  // If no theme is saved then set the correct toggle based on system settings
  const lightThemeMq = window.matchMedia("(prefers-color-scheme: light)");
  lightModeInput.checked = lightThemeMq.matches;
  darkModeInput.checked = !lightThemeMq.matches;
}

const parseSMS = () => {
  const sms = (inputTextArea.value ?? "").trim();
  if (sms) {
    const parsedData = getTransactionInfo(sms);
    if (parsedOutputContainer) {
      parsedOutputContainer.textContent = JSON.stringify(parsedData, null, 2);
    }
  } else {
    alert("No SMS entered");
  }
};

const copyParsedData = () => {
  const data = parsedOutputContainer?.textContent;
  if (data) {
    navigator.clipboard.writeText(data);
    copyIcon?.classList.add("hidden");
    copiedIcon?.classList.remove("hidden");
    tooltip?.setAttribute("data-tip", "copied");
    setTimeout(() => {
      copyIcon?.classList.remove("hidden");
      copiedIcon?.classList.add("hidden");
      tooltip?.setAttribute("data-tip", "copy");
    }, 1000);
  }
};

parseButton.addEventListener("click", parseSMS);
copyButton?.addEventListener("click", copyParsedData);
lightModeInput.addEventListener("change", () => {
  if (lightModeInput.checked) {
    localStorage.setItem("theme", "light");
    darkModeInput.checked = false;
  } else {
    localStorage.setItem("theme", "dark");
    darkModeInput.checked = true;
  }
});
