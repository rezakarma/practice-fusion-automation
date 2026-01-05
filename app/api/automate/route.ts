import { userValidationSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import { isString } from "puppeteer-core";
import { delay } from "puppeteer-core/lib/esm/third_party/rxjs/rxjs.js";
import z from "zod";
const saveButtonSelector = 'button[data-element="btn-save-transcript"]';
const SELECTORS = {
  subjective:
    '[data-element="subjective-section"] [data-element="rich-text-editor"]',
  objective:
    '[data-element="objective-section"] [data-element="rich-text-editor"]',
  // Add other sections here as you find them
  assessment:
    '[data-element="assessment-section"] [data-element="rich-text-editor"]',
  plan: '[data-element="plan-section"] [data-element="rich-text-editor"]',
  sharedViaPHR:
    '[data-element="plan-care-plan"] [data-element="rich-text-editor"]',
};

export async function POST(req: NextRequest) {
  try {
    const data: z.infer<typeof userValidationSchema> = await req.json();

    const result = userValidationSchema.safeParse(data);
    if (!result.success) {
      return NextResponse.json({ error: "the provided data is not correct!" });
    }

    const browser = await puppeteer.launch({
      headless: false, // Set to false if you want to watch it happen
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Path depends on your OS
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1530, height: 900 });

    // 1. Navigate to the third-party site
    await page.goto(
      "file:///C:/Users/Lenovo/Downloads/Practice%20Fusion.mhtml"
    );

    // 2. Fill the fields using CSS selectors

    for (const [key, text] of Object.entries(data)) {
      const selector = SELECTORS[key as keyof typeof SELECTORS];

      if (selector) {
        // 1. Wait for the specific section to be visible
        await page.waitForSelector(selector);

        // 2. Click the specific box
        await page.click(selector);

        // 3. Clear existing content (Optional but recommended)
        await page.evaluate((sel) => {
          const el = document.querySelector(sel);
          if (el) el.innerHTML = "";
        }, selector);

        // 4. Type the new content
        if (typeof text === "string") await page.type(selector, text);

        // Small pause between sections so you can watch the transition
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    // await page.type("#remote-email-input", email);

    await page.waitForSelector(saveButtonSelector);

    await page.click(saveButtonSelector);

    await new Promise((r) => setTimeout(r, 10000));

    // 4. Wait for a success indicator
    // await page.waitForNavigation();

    await browser.close();

    return NextResponse.json({
      success: true,
      message: "External form filled!",
    });
  } catch (error) {
    console.error("Automation error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
