export function initCopyCodeButtons(): void {
  const copyButtonLabel = "📋";
  
  // Use event delegation for better performance
  document.addEventListener("click", async (event: Event) => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains("copy-code")) return;
    
    const codeBlock = target.closest("pre");
    if (!codeBlock) return;
    
    await copyCode(codeBlock, target);
  });
  
  addCopyCodeButtons();
}

async function copyCode(codeBlock: HTMLPreElement, copyButton: HTMLElement): Promise<void> {
  const codeText = codeBlock.innerText;
  const buttonText = copyButton.innerText;
  const textToCopy = codeText.replace(buttonText, "");

  try {
    await navigator.clipboard.writeText(textToCopy);
    copyButton.innerText = "✅";
    
    setTimeout(() => {
      copyButton.innerText = "📋";
    }, 2000);
  } catch (error) {
    console.error("Failed to copy code:", error);
    copyButton.innerText = "❌";
    
    setTimeout(() => {
      copyButton.innerText = "📋";
    }, 2000);
  }
}

function addCopyCodeButtons(): void {
  const codeBlocks = document.querySelectorAll("pre:not([data-copy-button-added])");

  codeBlocks.forEach((codeBlock: HTMLPreElement) => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";

    const copyButton = document.createElement("button");
    copyButton.innerText = "📋";
    copyButton.classList.add("copy-code");
    copyButton.setAttribute("aria-label", "Copy code to clipboard");

    codeBlock.setAttribute("tabindex", "0");
    codeBlock.setAttribute("data-copy-button-added", "true");
    codeBlock.appendChild(copyButton);

    codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(codeBlock);
  });
}