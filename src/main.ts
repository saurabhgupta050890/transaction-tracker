import "./style.css";
import { getTransactionInfo } from "transaction-sms-parser";

// element Refs
const inputTextArea = document.getElementById(
  "sms-input"
) as HTMLTextAreaElement;
const parseButton = document.getElementById("process-btn") as HTMLButtonElement;
const parsedOutputContainer = document.getElementById("parsed-data");
const copyButton = document.getElementById("copy-btn");
const tooltip = document.getElementById("copy-tooltip");
const copyIcon = document.getElementById("copy-icon");
const copiedIcon = document.getElementById("copied-icon");

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
