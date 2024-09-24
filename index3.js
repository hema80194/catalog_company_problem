// Sample JSON data included in the code for two test cases
const testCases = [
    {
        "keys": {
            "n": 9,
            "k": 6
        },
        "1": {
            "base": "10",
            "value": "28735619723837"
        },
        "2": {
            "base": "16",
            "value": "1A228867F0CA"
        },
        "3": {
            "base": "12",
            "value": "32811A4AA0B7B"
        },
        "4": {
            "base": "11",
            "value": "917978721331A"
        },
        "5": {
            "base": "16",
            "value": "1A22886782E1"
        },
        "6": {
            "base": "10",
            "value": "28735619654702"
        },
        "7": {
            "base": "14",
            "value": "71AB5070CC4B"
        },
        "8": {
            "base": "9",
            "value": "122662581541670"
        },
        "9": {
            "base": "8",
            "value": "642121030037605"
        }
    },
    {
        "keys": {
            "n": 4,
            "k": 3
        },
        "1": {
            "base": "10",
            "value": "4"
        },
        "2": {
            "base": "2",
            "value": "111"
        },
        "3": {
            "base": "10",
            "value": "12"
        },
        "6": {
            "base": "4",
            "value": "213"
        }
    }
];

// Function to convert a value from a given base to a decimal number
function convertToDecimal(value, base) {
    // Using BigInt for handling large values
    return BigInt(parseInt(value, base));
}

// Function to perform Lagrange interpolation to find the constant term
function lagrangeInterpolation(points) {
    let constantTerm = BigInt(0);
    const k = points.length;

    for (let i = 0; i < k; i++) {
        let numerator = BigInt(points[i].y);
        let denominator = BigInt(1);

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                numerator *= BigInt(-points[j].x);
                denominator *= BigInt(points[i].x - points[j].x);
            }
        }

        // Calculate the term contribution
        const term = numerator / denominator;
        constantTerm += term;
    }

    return constantTerm;
}

// Function to process each test case
function processTestCase(jsonData) {
    try {
        // Extract n and k values from the JSON data
        const n = jsonData.keys.n;
        const k = jsonData.keys.k;

        const points = [];

        // Extract (x, y) points from JSON data
        for (const key in jsonData) {
            if (key !== "keys") {
                const x = parseInt(key); // x is the key converted to an integer
                const base = parseInt(jsonData[key].base); // Get the base as an integer
                const valueStr = jsonData[key].value; // Get the value string

                // Convert valueStr from the given base to decimal
                const y = convertToDecimal(valueStr, base);

                // Add the point (x, y) to the list of points
                points.push({ x, y });
            }
        }

        // Ensure we have at least 'k' points
        if (points.length < k) {
            console.error("Insufficient points to solve the polynomial.");
            return;
        }

        // Select only the first 'k' points since we only need a minimum of 'k' points for interpolation
        const selectedPoints = points.slice(0, k);

        // Calculate the constant term using Lagrange interpolation
        const constantTerm = lagrangeInterpolation(selectedPoints);

        // Output the constant term
        console.log("The constant term (c) of the polynomial is:", constantTerm.toString());
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Main function to run all test cases
function main() {
    testCases.forEach((testCase, index) => {
        console.log(`Processing Test Case ${index + 1}:`);
        processTestCase(testCase);
        console.log(); // For better readability
    });
}

// Run the main function
main();