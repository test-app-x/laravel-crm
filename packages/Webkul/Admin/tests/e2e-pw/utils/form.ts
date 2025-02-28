import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get Random Image File.
 */
function getRandomImageFile(
    directory = path.resolve(__dirname, "../data/images/")
) {
    if (! fs.existsSync(directory)) {
        throw new Error(`Directory does not exist: ${directory}`);
    }

    const files = fs.readdirSync(directory);
    const imageFiles = files.filter((file) =>
        /\.(gif|jpeg|jpg|png|svg|webp)$/i.test(file)
    );

    if (! imageFiles.length) {
        throw new Error("No image files found in the directory.");
    }

    const randomIndex = Math.floor(Math.random() * imageFiles.length);

    return path.join(directory, imageFiles[randomIndex]);
}

/**
 * Test Form for error messages and flash messages.
 */
const testForm = async (page) => {
    const getError = await page
        .waitForSelector(".text-xs.italic.text-red-600", { timeout: 2000 })
        .catch(() => null);
    var message = "";

    if (getError) {
        const errors = await page.$$(".text-xs.italic.text-red-600");

        for (let error of errors) {
            message = await error.evaluate((el) => el.innerText);
        }

        return null;
    } else {
        const iconExists = await page
            .waitForSelector(
                ".flex.flex-col.gap-1.5 > .flex.items-center.break-all.text-sm",
                { timeout: 5000 }
            )
            .catch(() => null);

        if (! iconExists) {
            return page.url();
        }

        const messages = await page.$$(".flex.flex-col.gap-1.5 > .flex.items-center.break-all.text-sm");

        const icons = await page.$$(".flex.flex-col.gap-1.5 + .relative.ml-4.inline-flex.rounded-full.bg-white.p-1.5.text-gray-400");

        message = await messages[0].evaluate(
            (el) => el.parentNode.innerText
        );

        await icons[0].click();

        return null;
    }
};

/**
 * Form Data.
 */
const form = {
    firstName: `Test${Math.random().toString(36).substring(7)}`,
    lastName: `User${Math.random().toString(36).substring(7)}`,
    email: `test${Math.random().toString(36).substring(7)}@example.com`,
    phone: `555${Math.floor(Math.random() * 10000000)
        .toString()
        .padStart(7, "0")}`,
};

/**
 * 
 * Generate Random Password.
 */
function generateRandomPassword(minLength, maxLength) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const length =
        Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let password = "";

    for (let i = 0; i < length; i++) {
        password += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }

    return password;
}

/**
 * Generate Random String with Spaces.
 */
function generateRandomStringWithSpaces(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        if (Math.random() < 0.1) {
            result += " ";
        } else {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
    }

    return result;
}

/**
 * Generate Random Product Name.
 */
function generateRandomProductName() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";

    for (let i = 1; i < 3; i++) {
        if (Math.random() < 0.1) {
            result += " ";
        } else {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
    }

    return result;
}

/**
 * Generate Random HTML Content.
 */
function generateRandomHtmlContent() {
    const elements = ["span", "a", "em", "strong", "b", "i", "u"];
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    const randomText = Math.random().toString(36).substring(7);
    const randomHref = `https://example.com/${Math.random()
        .toString(36)
        .substring(7)}`;

    switch (randomElement) {
        case "a":
            return `<a href="${randomHref}">${randomText}</a>`;
        case "span":
            return `<span>${randomText}</span>`;
        case "em":
            return `<em>${randomText}</em>`;
        case "strong":
            return `<strong>${randomText}</strong>`;
        case "b":
            return `<b>${randomText}</b>`;
        case "i":
            return `<i>${randomText}</i>`;
        case "u":
            return `<u>${randomText}</u>`;
        default:
            return `<span>${randomText}</span>`;
    }
}

/**
 * Fill Paragraph with Random HTML.
 */
async function fillParagraphWithRandomHtml(multi) {
    const randomHtmlContent = new Array(multi)
        .fill("")
        .map(() => generateRandomHtmlContent())
        .join(" ");

    return randomHtmlContent;
}

/**
 * Generate Random URL.
 */
function generateRandomUrl() {
    const protocols = ["http", "https"];
    const domain = `example${Math.random().toString(36).substring(7)}.com`;
    const path = `/${Math.random().toString(36).substring(7)}`;
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];

    return `${protocol}://${domain}${path}`;
}

/**
 * Generate Random Date Time Range.
 */
function generateRandomDateTimeRange() {
    // Generate valid "from" and "to" dates
    const fromDate = new Date(2024, 9, 29, 12, 0, 0); // Start: 2024-10-29 12:00:00
    const toDate = new Date(2024, 10, 29, 12, 0, 0); // End: 2024-11-29 12:00:00

    // Randomize within the range
    const randomFrom = new Date(
        fromDate.getTime() +
            Math.random() * (toDate.getTime() - fromDate.getTime() - 86400000)
    ); // Ensure `to` is at least 1 day ahead
    const randomTo = new Date(
        randomFrom.getTime() +
            Math.random() * (toDate.getTime() - randomFrom.getTime())
    );

    return {
        from: randomFrom.toISOString().replace("T", " ").split(".")[0],
        to: randomTo.toISOString().replace("T", " ").split(".")[0],
    };
}

export {
    form,
    getRandomImageFile,
    testForm,
    generateRandomPassword,
    generateRandomStringWithSpaces,
    fillParagraphWithRandomHtml,
    generateRandomProductName,
    generateRandomUrl,
    generateRandomDateTimeRange,
};