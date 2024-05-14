const puppeteer = require("puppeteer");

(async () => {
  // Launch a new browser instance
  const browser = await puppeteer.launch({ headless: false });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to the provided link
  await page.goto(
    "https://www.google.com/localservices/prolist?g2lbs=AOHF13mkH56KEQEc5LOSVp7Ny4fJIb8hiWPH2r1culf-2nz_ACxrgRJ77-FoxGUS0apCx_MFTh_81BdPRSKA8JU2AcXY5Q5F_MZLwku-lUJ4yB2eR8t6o60%3D&hl=en-NZ&gl=nz&ssta=1&oq=estate%20agent%20watford&src=2&sa=X&ved=2ahUKEwijhejmxouGAxUDdmwGHSYpCiwQjGp6BAgiEAE&scp=CgASABoAKgA%3D&q=&slp=MgBAAVIECAIgAIgBAJoBBgoCFxkQAA%3D%3D"
  );

  // Click on the input element with ID 'qjZKOb'
  await page.click("#qjZKOb");

  // Type 'Estate Agent Watford' in the input field and press Enter
  await page.type("#qjZKOb", "Property Sales Watford", { delay: 100 }); // Adjust delay if necessary
  await page.keyboard.press("Enter");

  // Wait for the search results to load
  await page.waitForSelector(".rgnuSb.xYjf2e");

  // Get the text content of all elements with class "rgnuSb xYjf2e"
  const textArray = await page.evaluate(() => {
    const textContainer = document.getElementsByClassName("rgnuSb xYjf2e");
    const textArray = [];
    for (let i = 0; i < textContainer.length; i++) {
      const text = textContainer[i].textContent.trim();
      textArray.push(text);
    }
    return textArray;
  });

  // Keyword to search
  const keyword = "Coopers Estate Agents";

  // Search for the keyword in the input field
  const inputFieldValue = await page.$eval("#qjZKOb", (input) => input.value);
  const keywordPositionInInput = inputFieldValue.includes(keyword)
    ? "Input field"
    : "Not found in input field";

  // Search for the keyword in the textArray
  const position = textArray.findIndex((text) => text.includes(keyword));

  if (position !== -1) {
    console.log(`${keyword}" -> ${position + 1}`);
  } else {
    console.log(`"${keyword}" not found!`);
  }

  console.log(`Keyword "${keyword}" ${keywordPositionInInput}`);

  // Close the browser
  await browser.close();
})();
