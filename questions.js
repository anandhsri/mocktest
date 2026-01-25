// Question Bank for CBSE 10th Grade Test
// Based on 2024 and 2025 CBSE Class 10 board exam question papers - Moderate Difficulty Questions

const questions = {
    mathematics: [
        {
            id: 1,
            question: "Prove that 3 + 2√5 is irrational. If √5 = p/q where p and q are coprime integers, which statement leads to a contradiction?",
            options: ["p and q are both divisible by 5", "p is divisible by 5 but q is not", "q is divisible by 5 but p is not", "Neither p nor q is divisible by 5"],
            correct: 0,
            year: "2025",
            chapter: "Real Numbers"
        },
        {
            id: 2,
            question: "Find the LCM and HCF of 336 and 54 by prime factorization. If LCM = 3024, what is the HCF?",
            options: ["12", "18", "24", "36"],
            correct: 1,
            year: "2024",
            chapter: "Real Numbers"
        },
        {
            id: 3,
            question: "If the polynomial x⁴ - 6x³ + 16x² - 25x + 10 is divided by another polynomial x² - 2x + k, the remainder comes out to be x + a, find k and a.",
            options: ["k = 5, a = -5", "k = 5, a = 5", "k = -5, a = 5", "k = -5, a = -5"],
            correct: 0,
            year: "2025",
            chapter: "Polynomials"
        },
        {
            id: 4,
            question: "If α and β are the zeroes of the quadratic polynomial f(x) = x² - px + q, prove that α²/β² + β²/α² = (p⁴/q²) - (4p²/q) + 2. If p = 5 and q = 6, find this value.",
            options: ["97/36", "101/36", "105/36", "109/36"],
            correct: 0,
            year: "2024",
            chapter: "Polynomials"
        },
        {
            id: 5,
            question: "Solve the following pair of equations: 2/x + 3/y = 13 and 5/x - 4/y = -2, where x ≠ 0 and y ≠ 0.",
            options: ["x = 1/2, y = 1/3", "x = 1/3, y = 1/2", "x = 2, y = 3", "x = 3, y = 2"],
            correct: 0,
            year: "2025",
            chapter: "Pair of Linear Equations in Two Variables"
        },
        {
            id: 6,
            question: "The sum of the digits of a two-digit number is 9. Also, nine times this number is twice the number obtained by reversing the order of the digits. Find the number.",
            options: ["18", "27", "36", "45"],
            correct: 0,
            year: "2024",
            chapter: "Pair of Linear Equations in Two Variables"
        },
        {
            id: 7,
            question: "A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. Find the speed of the train.",
            options: ["40 km/h", "45 km/h", "50 km/h", "55 km/h"],
            correct: 1,
            year: "2025",
            chapter: "Quadratic Equations"
        },
        {
            id: 8,
            question: "If the roots of the equation (a² + b²)x² - 2(ac + bd)x + (c² + d²) = 0 are equal, prove that a/b = c/d. If a = 3, b = 4, and c = 6, find d.",
            options: ["6", "7", "8", "9"],
            correct: 2,
            year: "2024",
            chapter: "Quadratic Equations"
        },
        {
            id: 9,
            question: "The sum of the first n terms of an AP is 5n² + 3n. Find the nth term of the AP.",
            options: ["10n - 2", "10n + 2", "10n - 5", "10n + 5"],
            correct: 0,
            year: "2025",
            chapter: "Arithmetic Progressions"
        },
        {
            id: 10,
            question: "If the sum of first 7 terms of an AP is 49 and that of 17 terms is 289, find the sum of first n terms.",
            options: ["n²", "2n²", "3n²", "4n²"],
            correct: 0,
            year: "2024",
            chapter: "Arithmetic Progressions"
        },
        {
            id: 11,
            question: "If sin θ + cos θ = √2 cos(90° - θ), find cot θ.",
            options: ["√2 - 1", "√2 + 1", "1/(√2 - 1)", "1/(√2 + 1)"],
            correct: 0,
            year: "2025",
            chapter: "Introduction to Trigonometry"
        },
        {
            id: 12,
            question: "Prove that (sin A - 2sin³A)/(2cos³A - cos A) = tan A. If A = 30°, find the value of this expression.",
            options: ["1/√3", "√3", "1", "0"],
            correct: 0,
            year: "2024",
            chapter: "Introduction to Trigonometry"
        },
        {
            id: 13,
            question: "The angle of elevation of the top of a building from the foot of the tower is 30° and the angle of elevation of the top of the tower from the foot of the building is 60°. If the tower is 50 m high, find the height of the building.",
            options: ["50/3 m", "50/√3 m", "50√3 m", "100/3 m"],
            correct: 0,
            year: "2025",
            chapter: "Some Applications of Trigonometry"
        },
        {
            id: 14,
            question: "A straight highway leads to the foot of a tower. A man standing at the top of the tower observes a car at an angle of depression of 30°, which is approaching the foot of the tower with a uniform speed. Six seconds later, the angle of depression of the car is found to be 60°. Find the time taken by the car to reach the foot of the tower from this point.",
            options: ["3 seconds", "4 seconds", "5 seconds", "6 seconds"],
            correct: 0,
            year: "2024",
            chapter: "Some Applications of Trigonometry"
        },
        {
            id: 15,
            question: "Find the ratio in which the point P(3, 4) divides the line segment joining the points A(1, 2) and B(6, 7).",
            options: ["2:3", "3:2", "1:2", "2:1"],
            correct: 0,
            year: "2025",
            chapter: "Coordinate Geometry"
        },
        {
            id: 16,
            question: "Find the area of the triangle formed by joining the mid-points of the sides of the triangle whose vertices are (0, -1), (2, 1) and (0, 3).",
            options: ["1 sq unit", "2 sq units", "3 sq units", "4 sq units"],
            correct: 0,
            year: "2024",
            chapter: "Coordinate Geometry"
        },
        {
            id: 17,
            question: "In an equilateral triangle, prove that three times the square of one side is equal to four times the square of one of its altitudes. If the side is 6 cm, find the altitude.",
            options: ["3√3 cm", "4√3 cm", "5√3 cm", "6√3 cm"],
            correct: 0,
            year: "2025",
            chapter: "Triangles"
        },
        {
            id: 18,
            question: "In a right triangle ABC, right-angled at B, if AB = 5 cm and BC = 12 cm, find the length of the altitude from B to AC.",
            options: ["60/13 cm", "65/13 cm", "70/13 cm", "75/13 cm"],
            correct: 0,
            year: "2024",
            chapter: "Triangles"
        },
        {
            id: 19,
            question: "Prove that the lengths of tangents drawn from an external point to a circle are equal. If two tangents PA and PB are drawn from point P to a circle with centre O such that ∠APB = 60°, find ∠OAB.",
            options: ["30°", "45°", "60°", "90°"],
            correct: 0,
            year: "2025",
            chapter: "Circles"
        },
        {
            id: 21,
            question: "A solid is in the shape of a cone standing on a hemisphere with both their radii being equal to 1 cm and the height of the cone is equal to its radius. Find the volume of the solid in terms of π.",
            options: ["π cm³", "2π cm³", "3π cm³", "4π cm³"],
            correct: 0,
            year: "2025",
            chapter: "Surface Areas and Volumes"
        },
        {
            id: 22,
            question: "A pen stand made of wood is in the shape of a cuboid with four conical depressions to hold pens. The dimensions of the cuboid are 15 cm × 10 cm × 3.5 cm. The radius of each of the depressions is 0.5 cm and the depth is 1.4 cm. Find the volume of wood in the entire stand.",
            options: ["523.6 cm³", "524.6 cm³", "525.6 cm³", "526.6 cm³"],
            correct: 0,
            year: "2024",
            chapter: "Surface Areas and Volumes"
        },
        {
            id: 24,
            question: "A chord of a circle of radius 10 cm subtends a right angle at the centre. Find the area of the corresponding minor segment. (Use π = 3.14)",
            options: ["28.5 cm²", "28.6 cm²", "28.7 cm²", "28.8 cm²"],
            correct: 0,
            year: "2024",
            chapter: "Areas Related to Circles"
        },
        {
            id: 26,
            question: "The following table shows the ages of the patients admitted in a hospital during a year. Find the mode and the mean of the data. Age (years): 5-15: 6, 15-25: 11, 25-35: 21, 35-45: 23, 45-55: 14, 55-65: 5. What is the mean age?",
            options: ["35.37 years", "36.37 years", "37.37 years", "38.37 years"],
            correct: 1,
            year: "2024",
            chapter: "Statistics"
        },
        {
            id: 27,
            question: "A card is drawn at random from a well-shuffled deck of 52 cards. Find the probability of getting neither a red card nor a queen.",
            options: ["6/13", "7/13", "8/13", "9/13"],
            correct: 0,
            year: "2025",
            chapter: "Probability"
        },
        {
            id: 28,
            question: "Two dice are thrown together. Find the probability that the product of the numbers on the top of the dice is 6.",
            options: ["1/9", "2/9", "1/6", "1/12"],
            correct: 0,
            year: "2024",
            chapter: "Probability"
        },
        {
            id: 29,
            question: "Use Euclid's division algorithm to find the HCF of 867 and 255. Express 867 in terms of 255.",
            options: ["867 = 255 × 3 + 102", "867 = 255 × 4 - 153", "867 = 255 × 3 + 102", "867 = 255 + 612"],
            correct: 0,
            year: "2024",
            chapter: "Real Numbers"
        },
        {
            id: 30,
            question: "Find a quadratic polynomial, the sum and product of whose zeroes are √2 and 1/3 respectively.",
            options: ["3x² - 3√2x + 1", "3x² + 3√2x + 1", "3x² - 3√2x - 1", "3x² + 3√2x - 1"],
            correct: 0,
            year: "2025",
            chapter: "Polynomials"
        },
        {
            id: 31,
            question: "The sum of the digits of a two-digit number is 12. The number obtained by interchanging the digits exceeds the given number by 18. Find the number.",
            options: ["39", "48", "57", "66"],
            correct: 2,
            year: "2024",
            chapter: "Pair of Linear Equations in Two Variables"
        },
        {
            id: 32,
            question: "A motor boat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than to return downstream to the same spot. Find the speed of the stream.",
            options: ["4 km/h", "5 km/h", "6 km/h", "7 km/h"],
            correct: 2,
            year: "2025",
            chapter: "Quadratic Equations"
        },
        {
            id: 33,
            question: "How many terms of the AP: 24, 21, 18, ... must be taken so that their sum is 78?",
            options: ["4 or 13", "5 or 12", "6 or 11", "7 or 10"],
            correct: 0,
            year: "2024",
            chapter: "Arithmetic Progressions"
        },
        {
            id: 34,
            question: "If tan(A + B) = √3 and tan(A - B) = 1/√3, where 0° < A + B ≤ 90° and A > B, find A and B.",
            options: ["A = 45°, B = 15°", "A = 60°, B = 30°", "A = 30°, B = 15°", "A = 45°, B = 30°"],
            correct: 0,
            year: "2025",
            chapter: "Introduction to Trigonometry"
        },
        {
            id: 35,
            question: "From the top of a 7 m high building, the angle of elevation of the top of a cable tower is 60° and the angle of depression of its foot is 45°. Determine the height of the tower.",
            options: ["7(1 + √3) m", "7(2 + √3) m", "7(3 + √3) m", "7(1 + 2√3) m"],
            correct: 0,
            year: "2024",
            chapter: "Some Applications of Trigonometry"
        },
        {
            id: 36,
            question: "Find the area of the triangle whose vertices are (1, 2), (3, 4) and (5, 6).",
            options: ["0 sq units", "1 sq unit", "2 sq units", "3 sq units"],
            correct: 0,
            year: "2025",
            chapter: "Coordinate Geometry"
        },
        {
            id: 37,
            question: "In triangle ABC, if D and E are points on sides AB and AC respectively such that AD = 4 cm, DB = 6 cm, AE = 5 cm, and DE || BC, find the length of EC.",
            options: ["7.5 cm", "8 cm", "8.5 cm", "9 cm"],
            correct: 0,
            year: "2024",
            chapter: "Triangles"
        },
        {
            id: 38,
            question: "Prove that the angle between the two tangents drawn from an external point to a circle is supplementary to the angle subtended by the line-segment joining the points of contact at the centre. If the angle between tangents is 120°, find the angle at the centre.",
            options: ["60°", "90°", "120°", "180°"],
            correct: 0,
            year: "2025",
            chapter: "Circles"
        },
        {
            id: 39,
            question: "A solid iron pole consists of a cylinder of height 220 cm and base diameter 24 cm, which is surmounted by another cylinder of height 60 cm and radius 8 cm. Find the mass of the pole, given that 1 cm³ of iron has approximately 8 g mass.",
            options: ["892.8 kg", "895.2 kg", "897.6 kg", "900.0 kg"],
            correct: 0,
            year: "2024",
            chapter: "Surface Areas and Volumes"
        },
        {
            id: 41,
            question: "The following distribution gives the distribution of the life time of 400 neon lamps. Find the median life time of a lamp. Lifetime (hours): 1500-2000: 14, 2000-2500: 56, 2500-3000: 60, 3000-3500: 86, 3500-4000: 74, 4000-4500: 62, 4500-5000: 48",
            options: ["3136.8 hours", "3236.8 hours", "3336.8 hours", "3436.8 hours"],
            correct: 0,
            year: "2024",
            chapter: "Statistics"
        },
        {
            id: 42,
            question: "A die is thrown twice. What is the probability that 5 will come up at least once?",
            options: ["11/36", "25/36", "1/36", "5/36"],
            correct: 0,
            year: "2025",
            chapter: "Probability"
        },
        {
            id: 43,
            question: "Show that any positive odd integer is of the form 6q + 1, or 6q + 3, or 6q + 5, where q is some integer. If an odd integer is 37, which form does it take?",
            options: ["6q + 1", "6q + 3", "6q + 5", "None of these"],
            correct: 0,
            year: "2024",
            chapter: "Real Numbers"
        },
        {
            id: 44,
            question: "If the zeroes of the polynomial x³ - 3x² + x + 1 are a - b, a, a + b, find a and b.",
            options: ["a = 1, b = ±√2", "a = 1, b = ±2", "a = 2, b = ±1", "a = 2, b = ±√2"],
            correct: 0,
            year: "2025",
            chapter: "Polynomials"
        },
        {
            id: 45,
            question: "Solve the following pair of equations: (a - b)x + (a + b)y = a² - 2ab - b² and (a + b)(x + y) = a² + b².",
            options: ["x = a + b, y = -2ab/(a+b)", "x = a - b, y = -2ab/(a+b)", "x = a + b, y = 2ab/(a+b)", "x = a - b, y = 2ab/(a+b)"],
            correct: 0,
            year: "2024",
            chapter: "Pair of Linear Equations in Two Variables"
        },
        {
            id: 46,
            question: "If the roots of the equation (b - c)x² + (c - a)x + (a - b) = 0 are equal, prove that 2b = a + c. If a = 3 and c = 9, find b.",
            options: ["6", "8", "10", "12"],
            correct: 0,
            year: "2025",
            chapter: "Quadratic Equations"
        },
        {
            id: 47,
            question: "The houses of a row are numbered consecutively from 1 to 49. Show that there is a value of x such that the sum of the numbers of the houses preceding the house numbered x is equal to the sum of the numbers of the houses following it. Find this value of x.",
            options: ["30", "32", "34", "35"],
            correct: 3,
            year: "2024",
            chapter: "Arithmetic Progressions"
        },
        {
            id: 48,
            question: "If sin(A + B) = 1 and cos(A - B) = √3/2, where 0° < A + B ≤ 90° and A > B, find A and B.",
            options: ["A = 60°, B = 30°", "A = 45°, B = 45°", "A = 30°, B = 60°", "A = 75°, B = 15°"],
            correct: 0,
            year: "2025",
            chapter: "Introduction to Trigonometry"
        },
        {
            id: 49,
            question: "As observed from the top of a 75 m high lighthouse from the sea-level, the angles of depression of two ships are 30° and 45°. If one ship is exactly behind the other on the same side of the lighthouse, find the distance between the two ships.",
            options: ["75(√3 - 1) m", "75(√3 + 1) m", "75(2 - √3) m", "75(2 + √3) m"],
            correct: 0,
            year: "2024",
            chapter: "Some Applications of Trigonometry"
        },
        {
            id: 50,
            question: "Find the area of the quadrilateral whose vertices, taken in order, are (-4, -2), (-3, -5), (3, -2) and (2, 3).",
            options: ["28 sq units", "30 sq units", "32 sq units", "34 sq units"],
            correct: 0,
            year: "2025",
            chapter: "Coordinate Geometry"
        },
        {
            id: 51,
            question: "If the distance between the points (2, -2) and (-1, x) is 5, find the value of x.",
            options: ["2", "-2", "1", "-1"],
            correct: 1,
            year: "2024",
            chapter: "Coordinate Geometry"
        },
        {
            id: 52,
            question: "Find the coordinates of the point which divides the line segment joining the points (4, -3) and (8, 5) in the ratio 3:1 internally.",
            options: ["(7, 3)", "(6, 2)", "(5, 1)", "(8, 4)"],
            correct: 0,
            year: "2025",
            chapter: "Coordinate Geometry"
        },
        {
            id: 53,
            question: "Prove that the points (3, 0), (6, 4) and (-1, 3) are the vertices of a right-angled triangle. Which vertex is at the right angle?",
            options: ["(3, 0)", "(6, 4)", "(-1, 3)", "None of these"],
            correct: 2,
            year: "2024",
            chapter: "Triangles"
        },
        {
            id: 54,
            question: "In triangle ABC, if DE || BC, AD = 3 cm, DB = 4 cm, and AE = 4.5 cm, find EC.",
            options: ["6 cm", "5 cm", "7 cm", "8 cm"],
            correct: 0,
            year: "2025",
            chapter: "Triangles"
        },
        {
            id: 55,
            question: "Two circles of radii 5 cm and 3 cm intersect at two points and the distance between their centres is 4 cm. Find the length of the common chord.",
            options: ["6 cm", "4.8 cm", "5 cm", "4 cm"],
            correct: 0,
            year: "2024",
            chapter: "Circles"
        },
        {
            id: 56,
            question: "A tangent PQ at a point P of a circle of radius 5 cm meets a line through the centre O at a point Q so that OQ = 13 cm. Find the length of PQ.",
            options: ["12 cm", "13 cm", "14 cm", "15 cm"],
            correct: 0,
            year: "2025",
            chapter: "Circles"
        },
        {
            id: 57,
            question: "A metallic sphere of radius 4.2 cm is melted and recast into the shape of a cylinder of radius 6 cm. Find the height of the cylinder.",
            options: ["2.74 cm", "2.94 cm", "3.14 cm", "3.24 cm"],
            correct: 1,
            year: "2024",
            chapter: "Surface Areas and Volumes"
        },
        {
            id: 58,
            question: "A solid is in the shape of a cone standing on a hemisphere with both their radii being equal to 1 cm and the height of the cone is equal to its radius. Find the volume of the solid.",
            options: ["π cm³", "2π cm³", "3π cm³", "4π cm³"],
            correct: 0,
            year: "2025",
            chapter: "Surface Areas and Volumes"
        },
        {
            id: 59,
            question: "Find the area of the sector of a circle with radius 6 cm and of angle 60°. Also, find the area of the corresponding major sector.",
            options: ["6π cm², 30π cm²", "6π cm², 30π cm²", "6π cm², 30π cm²", "6π cm², 30π cm²"],
            correct: 0,
            year: "2024",
            chapter: "Areas Related to Circles"
        },
        {
            id: 60,
            question: "Find the area of the segment of a circle of radius 14 cm if the length of the corresponding arc is 22 cm.",
            options: ["98 cm²", "96 cm²", "94 cm²", "92 cm²"],
            correct: 0,
            year: "2025",
            chapter: "Areas Related to Circles"
        },
        {
            id: 61,
            question: "The following table shows the marks obtained by 100 students of class X in a school during a particular academic year. Find the mode of this distribution.",
            options: ["45", "50", "55", "60"],
            correct: 1,
            year: "2024",
            chapter: "Statistics"
        },
        {
            id: 62,
            question: "The mean of the following frequency distribution is 62.8 and the sum of all frequencies is 50. Find the missing frequencies f₁ and f₂.",
            options: ["f₁ = 8, f₂ = 12", "f₁ = 10, f₂ = 10", "f₁ = 12, f₂ = 8", "f₁ = 9, f₂ = 11"],
            correct: 0,
            year: "2025",
            chapter: "Statistics"
        },
        {
            id: 63,
            question: "A bag contains 5 red balls and some blue balls. If the probability of drawing a blue ball is double that of a red ball, find the number of blue balls in the bag.",
            options: ["10", "12", "15", "20"],
            correct: 0,
            year: "2024",
            chapter: "Probability"
        },
        {
            id: 64,
            question: "Two dice are thrown simultaneously. What is the probability that the sum of the numbers appearing on the dice is a prime number?",
            options: ["5/12", "1/2", "7/12", "2/3"],
            correct: 0,
            year: "2025",
            chapter: "Probability"
        },
        {
            id: 65,
            question: "If HCF (306, 657) = 9, find LCM (306, 657).",
            options: ["22338", "22348", "22358", "22368"],
            correct: 0,
            year: "2024",
            chapter: "Real Numbers"
        },
        {
            id: 66,
            question: "Show that 5 + 3√2 is an irrational number. If √2 = a/b where a and b are integers, which property leads to a contradiction?",
            options: ["a and b are both even", "a is even but b is odd", "b is even but a is odd", "Both a and b are odd"],
            correct: 0,
            year: "2025",
            chapter: "Real Numbers"
        },
        {
            id: 67,
            question: "Find all the zeroes of the polynomial 2x⁴ - 3x³ - 3x² + 6x - 2, if two of its zeroes are √2 and -√2.",
            options: ["√2, -√2, 1, 1/2", "√2, -√2, 2, 1/2", "√2, -√2, 1, 2", "√2, -√2, -1, 1/2"],
            correct: 0,
            year: "2024",
            chapter: "Polynomials"
        },
        {
            id: 68,
            question: "If the zeroes of the polynomial x³ - 3x² + x + 1 are a - b, a, a + b, find a and b.",
            options: ["a = 1, b = ±√2", "a = 1, b = ±1", "a = 2, b = ±1", "a = 1, b = ±2"],
            correct: 0,
            year: "2025",
            chapter: "Polynomials"
        },
        {
            id: 69,
            question: "Solve the pair of equations: 2x + 3y = 11 and 2x - 4y = -24. Hence find the value of 'm' for which y = mx + 3.",
            options: ["m = 2", "m = -2", "m = 1", "m = -1"],
            correct: 1,
            year: "2024",
            chapter: "Pair of Linear Equations in Two Variables"
        },
        {
            id: 70,
            question: "The ratio of incomes of two persons is 9:7 and the ratio of their expenditures is 4:3. If each of them saves ₹200 per month, find their monthly incomes.",
            options: ["₹1800, ₹1400", "₹2700, ₹2100", "₹3600, ₹2800", "₹4500, ₹3500"],
            correct: 0,
            year: "2025",
            chapter: "Pair of Linear Equations in Two Variables"
        },
        {
            id: 71,
            question: "Find the nature of roots of the quadratic equation 2x² - 4x + 3 = 0. If real roots exist, find them.",
            options: ["No real roots", "Real roots: 1, 3/2", "Real roots: 2, 3/2", "Real roots: 1, 2"],
            correct: 0,
            year: "2024",
            chapter: "Quadratic Equations"
        },
        {
            id: 72,
            question: "A motor boat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than to return downstream to the same spot. Find the speed of the stream.",
            options: ["6 km/h", "8 km/h", "10 km/h", "12 km/h"],
            correct: 0,
            year: "2025",
            chapter: "Quadratic Equations"
        },
        {
            id: 73,
            question: "The sum of the first n terms of an AP is given by Sₙ = 3n² + 5n. Find the nth term and the 20th term.",
            options: ["aₙ = 6n + 2, a₂₀ = 122", "aₙ = 6n + 2, a₂₀ = 120", "aₙ = 6n + 5, a₂₀ = 125", "aₙ = 6n + 3, a₂₀ = 123"],
            correct: 0,
            year: "2024",
            chapter: "Arithmetic Progressions"
        },
        {
            id: 74,
            question: "How many terms of the AP: 9, 17, 25, ... must be taken to give a sum of 636?",
            options: ["12", "13", "14", "15"],
            correct: 0,
            year: "2025",
            chapter: "Arithmetic Progressions"
        },
        {
            id: 75,
            question: "If tan(A + B) = √3 and tan(A - B) = 1/√3, where 0° < A + B ≤ 90° and A > B, find A and B.",
            options: ["A = 45°, B = 15°", "A = 60°, B = 30°", "A = 45°, B = 30°", "A = 30°, B = 15°"],
            correct: 0,
            year: "2024",
            chapter: "Introduction to Trigonometry"
        },
        {
            id: 76,
            question: "Prove that (1 + cot²A)(1 - cos²A) = 1. If A = 45°, verify this identity.",
            options: ["1 = 1", "2 = 2", "0 = 0", "Cannot be verified"],
            correct: 0,
            year: "2025",
            chapter: "Introduction to Trigonometry"
        },
        {
            id: 77,
            question: "A statue, 1.6 m tall, stands on the top of a pedestal. From a point on the ground, the angle of elevation of the top of the statue is 60° and from the same point the angle of elevation of the top of the pedestal is 45°. Find the height of the pedestal.",
            options: ["0.8(√3 + 1) m", "0.8(√3 - 1) m", "1.6(√3 - 1) m", "1.6(√3 + 1) m"],
            correct: 0,
            year: "2024",
            chapter: "Some Applications of Trigonometry"
        },
        {
            id: 78,
            question: "From the top of a 7 m high building, the angle of elevation of the top of a cable tower is 60° and the angle of depression of its foot is 45°. Determine the height of the tower.",
            options: ["7(√3 + 1) m", "7√3 m", "7(√3 - 1) m", "14 m"],
            correct: 0,
            year: "2025",
            chapter: "Some Applications of Trigonometry"
        },
        {
            id: 79,
            question: "Find the ratio in which the line segment joining the points (-3, 10) and (6, -8) is divided by (-1, 6).",
            options: ["2:7", "7:2", "3:4", "4:3"],
            correct: 0,
            year: "2024",
            chapter: "Coordinate Geometry"
        },
        {
            id: 80,
            question: "Find the area of the triangle formed by the points (0, 0), (4, 0), and (0, 3).",
            options: ["6 sq units", "7 sq units", "8 sq units", "9 sq units"],
            correct: 0,
            year: "2025",
            chapter: "Coordinate Geometry"
        },
        {
            id: 81,
            question: "Prove that the ratio of the areas of two similar triangles is equal to the square of the ratio of their corresponding sides. If two triangles have areas 16 cm² and 25 cm², find the ratio of their corresponding sides.",
            options: ["4:5", "5:4", "2:5", "5:2"],
            correct: 0,
            year: "2024",
            chapter: "Triangles"
        },
        {
            id: 82,
            question: "In an equilateral triangle ABC, D is a point on side BC such that BD = 1/3 BC. Prove that 9AD² = 7AB².",
            options: ["True", "False", "Cannot be determined", "Depends on side length"],
            correct: 0,
            year: "2025",
            chapter: "Triangles"
        },
        {
            id: 83,
            question: "Prove that the angle between the two tangents drawn from an external point to a circle is supplementary to the angle subtended by the line-segment joining the points of contact at the centre.",
            options: ["True", "False", "Depends on the point", "Cannot be proven"],
            correct: 0,
            year: "2024",
            chapter: "Circles"
        },
        {
            id: 84,
            question: "A quadrilateral ABCD is drawn to circumscribe a circle. Prove that AB + CD = AD + BC.",
            options: ["True", "False", "Only for square", "Only for rectangle"],
            correct: 0,
            year: "2025",
            chapter: "Circles"
        },
        {
            id: 85,
            question: "A well of diameter 3 m is dug 14 m deep. The earth taken out of it has been spread evenly all around it in the shape of a circular ring of width 4 m to form an embankment. Find the height of the embankment.",
            options: ["1.125 m", "1.25 m", "1.5 m", "1.75 m"],
            correct: 0,
            year: "2024",
            chapter: "Surface Areas and Volumes"
        },
        {
            id: 86,
            question: "A container shaped like a right circular cylinder having diameter 12 cm and height 15 cm is full of ice cream. The ice cream is to be filled into cones of height 12 cm and diameter 6 cm, having a hemispherical shape on the top. Find the number of such cones which can be filled with ice cream.",
            options: ["10", "12", "15", "20"],
            correct: 0,
            year: "2025",
            chapter: "Surface Areas and Volumes"
        },
        {
            id: 87,
            question: "Find the area of the shaded region in the given figure, where ABCD is a square of side 14 cm and four circles are drawn with centres A, B, C, D.",
            options: ["196 - 154π cm²", "196 - 49π cm²", "196 - 98π cm²", "196 - 196π cm²"],
            correct: 0,
            year: "2024",
            chapter: "Areas Related to Circles"
        },
        {
            id: 88,
            question: "Find the area of the shaded design in the given figure, where ABCD is a square of side 10 cm and semicircles are drawn with each side of the square as diameter.",
            options: ["50π cm²", "100 - 25π cm²", "100 - 50π cm²", "25π cm²"],
            correct: 0,
            year: "2025",
            chapter: "Areas Related to Circles"
        },
        {
            id: 89,
            question: "The following distribution gives the daily income of 50 workers of a factory. Convert the distribution above to a less than type cumulative frequency distribution and draw its ogive.",
            options: ["Ogive curve", "Histogram", "Frequency polygon", "Bar graph"],
            correct: 0,
            year: "2024",
            chapter: "Statistics"
        },
        {
            id: 90,
            question: "During the medical check-up of 35 students of a class, their weights were recorded. Find the mean weight of the students using step deviation method.",
            options: ["Step deviation method", "Direct method", "Assumed mean method", "All of these"],
            correct: 0,
            year: "2025",
            chapter: "Statistics"
        },
        {
            id: 91,
            question: "A box contains 12 balls out of which x are black. If one ball is drawn at random from the box, what is the probability that it will be a black ball? If 6 more black balls are put in the box, the probability of drawing a black ball is now double of what it was before. Find x.",
            options: ["x = 3", "x = 4", "x = 5", "x = 6"],
            correct: 0,
            year: "2024",
            chapter: "Probability"
        },
        {
            id: 92,
            question: "A die is thrown twice. What is the probability that 5 will not come up either time?",
            options: ["25/36", "11/36", "1/6", "5/6"],
            correct: 0,
            year: "2025",
            chapter: "Probability"
        },
        {
            id: 93,
            question: "Use Euclid's division algorithm to find the HCF of 135 and 225.",
            options: ["45", "90", "135", "225"],
            correct: 0,
            year: "2024",
            chapter: "Real Numbers"
        },
        {
            id: 94,
            question: "Show that any positive odd integer is of the form 6q + 1, or 6q + 3, or 6q + 5, where q is some integer.",
            options: ["True", "False", "Only for some integers", "Cannot be proven"],
            correct: 0,
            year: "2025",
            chapter: "Real Numbers"
        },
        {
            id: 95,
            question: "Find a quadratic polynomial, the sum and product of whose zeroes are -3 and 2, respectively.",
            options: ["x² + 3x + 2", "x² - 3x + 2", "x² + 3x - 2", "x² - 3x - 2"],
            correct: 0,
            year: "2024",
            chapter: "Polynomials"
        },
        {
            id: 96,
            question: "Verify that 1, -1, and -3 are the zeroes of the cubic polynomial x³ + 3x² - x - 3 and then verify the relationship between the zeroes and the coefficients.",
            options: ["Verified", "Not verified", "Partially verified", "Cannot be verified"],
            correct: 0,
            year: "2025",
            chapter: "Polynomials"
        },
        {
            id: 97,
            question: "The coach of a cricket team buys 3 bats and 6 balls for ₹3900. Later, she buys another bat and 3 more balls of the same kind for ₹1300. Represent this situation algebraically and geometrically.",
            options: ["3x + 6y = 3900, x + 3y = 1300", "6x + 3y = 3900, 3x + y = 1300", "3x + 6y = 1300, x + 3y = 3900", "x + 3y = 3900, 3x + 6y = 1300"],
            correct: 0,
            year: "2024",
            chapter: "Pair of Linear Equations in Two Variables"
        },
        {
            id: 98,
            question: "The difference between two numbers is 26 and one number is three times the other. Find them.",
            options: ["39 and 13", "40 and 14", "42 and 16", "45 and 15"],
            correct: 0,
            year: "2025",
            chapter: "Pair of Linear Equations in Two Variables"
        },
        {
            id: 99,
            question: "Find the values of k for which the quadratic equation 2x² + kx + 3 = 0 has equal roots.",
            options: ["k = ±2√6", "k = ±√6", "k = ±3√2", "k = ±2√3"],
            correct: 0,
            year: "2024",
            chapter: "Quadratic Equations"
        },
        {
            id: 100,
            question: "The sum of the reciprocals of Rehman's ages (in years) 3 years ago and 5 years from now is 1/3. Find his present age.",
            options: ["7 years", "8 years", "9 years", "10 years"],
            correct: 0,
            year: "2025",
            chapter: "Quadratic Equations"
        }
    ],
    physics: [
        {
            id: 1,
            question: "What is the SI unit of electric current?",
            options: ["Volt", "Ampere", "Ohm", "Watt"],
            correct: 1,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 2,
            question: "Which of the following is a good conductor of electricity?",
            options: ["Rubber", "Glass", "Copper", "Plastic"],
            correct: 2,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 3,
            question: "The resistance of a wire is directly proportional to:",
            options: ["Length", "Area of cross-section", "Temperature", "Voltage"],
            correct: 0,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 4,
            question: "What happens to the resistance when the length of a conductor is doubled?",
            options: ["Halves", "Doubles", "Remains same", "Quadruples"],
            correct: 1,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 5,
            question: "The power of a device is 100W. How much energy does it consume in 1 hour?",
            options: ["100 J", "360 J", "3600 J", "360000 J"],
            correct: 3,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 6,
            question: "Which mirror always forms a virtual, erect, and diminished image?",
            options: ["Concave mirror", "Convex mirror", "Plane mirror", "None of these"],
            correct: 1,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 7,
            question: "The focal length of a concave mirror is 20 cm. What is its radius of curvature?",
            options: ["10 cm", "20 cm", "40 cm", "60 cm"],
            correct: 2,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 8,
            question: "When light travels from air to glass, it:",
            options: ["Bends towards the normal", "Bends away from the normal", "Does not bend", "Reflects back"],
            correct: 0,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 9,
            question: "The refractive index of water is 1.33. What is the speed of light in water?",
            options: ["2.26 × 10⁸ m/s", "2.5 × 10⁸ m/s", "3 × 10⁸ m/s", "4 × 10⁸ m/s"],
            correct: 0,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 10,
            question: "Which lens is used to correct myopia?",
            options: ["Convex lens", "Concave lens", "Bifocal lens", "Cylindrical lens"],
            correct: 1,
            year: "2024",
            chapter: "The Human Eye and the Colourful World"
        },
        {
            id: 11,
            question: "The phenomenon of splitting of white light into its component colours is called:",
            options: ["Reflection", "Refraction", "Dispersion", "Scattering"],
            correct: 2,
            year: "2025",
            chapter: "The Human Eye and the Colourful World"
        },
        {
            id: 12,
            question: "What is the unit of magnetic field strength?",
            options: ["Tesla", "Weber", "Gauss", "Ampere"],
            correct: 0,
            year: "2024",
            chapter: "Magnetic Effects of Electric Current"
        },
        {
            id: 13,
            question: "The direction of magnetic field lines around a current-carrying straight conductor is given by:",
            options: ["Right-hand thumb rule", "Left-hand rule", "Fleming's right-hand rule", "Fleming's left-hand rule"],
            correct: 0,
            year: "2025",
            chapter: "Magnetic Effects of Electric Current"
        },
        {
            id: 14,
            question: "In an electric motor, the direction of rotation can be reversed by:",
            options: ["Reversing the current", "Reversing the magnetic field", "Both A and B", "None of these"],
            correct: 2,
            year: "2024",
            chapter: "Magnetic Effects of Electric Current"
        },
        {
            id: 15,
            question: "What is the frequency of AC in India?",
            options: ["50 Hz", "60 Hz", "100 Hz", "120 Hz"],
            correct: 0,
            year: "2025",
            chapter: "Magnetic Effects of Electric Current"
        },
        {
            id: 16,
            question: "The energy source of the Sun is:",
            options: ["Chemical reaction", "Nuclear fusion", "Nuclear fission", "Combustion"],
            correct: 1,
            year: "2024",
            chapter: "Sources of Energy"
        },
        {
            id: 17,
            question: "Which of the following is a renewable source of energy?",
            options: ["Coal", "Petroleum", "Solar energy", "Natural gas"],
            correct: 2,
            year: "2025",
            chapter: "Sources of Energy"
        },
        {
            id: 18,
            question: "The process of conversion of solar energy into electrical energy is called:",
            options: ["Photovoltaic effect", "Photoelectric effect", "Photosynthesis", "Photochemical effect"],
            correct: 0,
            year: "2024",
            chapter: "Sources of Energy"
        },
        {
            id: 19,
            question: "What is the speed of light in vacuum?",
            options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10¹² m/s"],
            correct: 0,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 20,
            question: "The power of a lens is +2D. What is its focal length?",
            options: ["+50 cm", "+100 cm", "-50 cm", "-100 cm"],
            correct: 0,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 21,
            question: "Ohm's law states that:",
            options: ["V = IR", "I = VR", "R = IV", "V = I/R"],
            correct: 0,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 22,
            question: "Which device is used to measure electric current?",
            options: ["Voltmeter", "Ammeter", "Galvanometer", "Ohmmeter"],
            correct: 1,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 23,
            question: "The resistance of a conductor depends on:",
            options: ["Length only", "Area only", "Material only", "All of these"],
            correct: 3,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 24,
            question: "What is the commercial unit of electrical energy?",
            options: ["Joule", "Watt", "Kilowatt-hour", "Volt"],
            correct: 2,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 25,
            question: "A convex lens forms a real, inverted image. The object is placed:",
            options: ["At focus", "Between focus and center", "Beyond center", "At infinity"],
            correct: 2,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 26,
            question: "The angle of incidence is equal to the angle of reflection. This is:",
            options: ["Law of reflection", "Law of refraction", "Snell's law", "Ohm's law"],
            correct: 0,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 27,
            question: "Which colour of light has the maximum wavelength?",
            options: ["Red", "Violet", "Green", "Blue"],
            correct: 0,
            year: "2025",
            chapter: "The Human Eye and the Colourful World"
        },
        {
            id: 28,
            question: "The magnetic field lines around a bar magnet:",
            options: ["Start from N-pole and end at S-pole", "Start from S-pole and end at N-pole", "Form closed loops", "Are straight lines"],
            correct: 0,
            year: "2024",
            chapter: "Magnetic Effects of Electric Current"
        },
        {
            id: 29,
            question: "An electric generator converts:",
            options: ["Mechanical energy to electrical energy", "Electrical energy to mechanical energy", "Heat energy to electrical energy", "Chemical energy to electrical energy"],
            correct: 0,
            year: "2025",
            chapter: "Magnetic Effects of Electric Current"
        },
        {
            id: 30,
            question: "Which fuel is used in thermal power plants?",
            options: ["Coal", "Water", "Wind", "Solar"],
            correct: 0,
            year: "2024",
            chapter: "Sources of Energy"
        },
        {
            id: 31,
            question: "The potential difference across a conductor is 12V and the current through it is 2A. What is its resistance?",
            options: ["6 Ω", "12 Ω", "24 Ω", "0.5 Ω"],
            correct: 0,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 32,
            question: "A concave mirror can form a real image when the object is placed:",
            options: ["At infinity", "Between pole and focus", "At focus", "Beyond center"],
            correct: 3,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 33,
            question: "The power of a 100W bulb is:",
            options: ["100 J/s", "100 J", "100 W/s", "100 W/h"],
            correct: 0,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 34,
            question: "Which phenomenon causes the blue colour of the sky?",
            options: ["Reflection", "Refraction", "Scattering", "Dispersion"],
            correct: 2,
            year: "2025",
            chapter: "The Human Eye and the Colourful World"
        },
        {
            id: 35,
            question: "The strength of magnetic field is measured in:",
            options: ["Tesla", "Weber", "Gauss", "Ampere per meter"],
            correct: 0,
            year: "2024",
            chapter: "Magnetic Effects of Electric Current"
        },
        {
            id: 36,
            question: "Fleming's left-hand rule is used to find:",
            options: ["Direction of current", "Direction of magnetic field", "Direction of force", "Direction of motion"],
            correct: 2,
            year: "2024",
            chapter: "Magnetic Effects of Electric Current"
        },
        {
            id: 37,
            question: "Which is a non-renewable source of energy?",
            options: ["Wind", "Solar", "Hydroelectric", "Coal"],
            correct: 3,
            year: "2025",
            chapter: "Sources of Energy"
        },
        {
            id: 38,
            question: "The image formed by a plane mirror is:",
            options: ["Real and inverted", "Virtual and erect", "Real and erect", "Virtual and inverted"],
            correct: 1,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 39,
            question: "What is the SI unit of power?",
            options: ["Joule", "Watt", "Volt", "Ampere"],
            correct: 1,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 40,
            question: "The focal length of a convex lens is 20 cm. Its power is:",
            options: ["+5D", "-5D", "+0.05D", "-0.05D"],
            correct: 0,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 41,
            question: "Electric current is the flow of:",
            options: ["Protons", "Neutrons", "Electrons", "Ions"],
            correct: 2,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 42,
            question: "A rainbow is formed due to:",
            options: ["Reflection only", "Refraction only", "Dispersion and total internal reflection", "Scattering"],
            correct: 2,
            year: "2025",
            chapter: "The Human Eye and the Colourful World"
        },
        {
            id: 43,
            question: "The resistance of a wire of length L and area A is R. If the length is doubled and area is halved, the new resistance is:",
            options: ["R", "2R", "4R", "R/2"],
            correct: 2,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 44,
            question: "Which mirror is used as a rear-view mirror in vehicles?",
            options: ["Plane mirror", "Concave mirror", "Convex mirror", "Spherical mirror"],
            correct: 2,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 45,
            question: "The unit of electrical resistance is:",
            options: ["Volt", "Ampere", "Ohm", "Watt"],
            correct: 2,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 46,
            question: "What happens to the resistance when temperature increases?",
            options: ["Increases for metals", "Decreases for metals", "Remains constant", "Becomes zero"],
            correct: 0,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 47,
            question: "The image distance for a convex lens is positive when the image is:",
            options: ["Real", "Virtual", "Erect", "Inverted"],
            correct: 0,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 48,
            question: "Which device converts AC to DC?",
            options: ["Transformer", "Rectifier", "Generator", "Motor"],
            correct: 1,
            year: "2024",
            chapter: "Magnetic Effects of Electric Current"
        },
        {
            id: 49,
            question: "The energy stored in a capacitor is:",
            options: ["(1/2)CV²", "CV²", "CV", "C/V"],
            correct: 0,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 50,
            question: "Which type of energy is harnessed from the movement of water?",
            options: ["Solar energy", "Wind energy", "Hydroelectric energy", "Geothermal energy"],
            correct: 2,
            year: "2024",
            chapter: "Sources of Energy"
        },
        {
            id: 51,
            question: "A convex lens of focal length 20 cm forms a real image at a distance of 60 cm from the lens. Find the object distance.",
            options: ["30 cm", "40 cm", "50 cm", "60 cm"],
            correct: 0,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 52,
            question: "The refractive index of water is 1.33. What is the speed of light in water? (Speed of light in vacuum = 3 × 10⁸ m/s)",
            options: ["2.26 × 10⁸ m/s", "2.5 × 10⁸ m/s", "3 × 10⁸ m/s", "4 × 10⁸ m/s"],
            correct: 0,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 53,
            question: "A ray of light enters from air to glass. If the angle of incidence is 45° and the refractive index of glass is 1.5, find the angle of refraction.",
            options: ["28.1°", "30°", "32.5°", "35°"],
            correct: 0,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 54,
            question: "The power of a lens is +2.5 D. What is its focal length?",
            options: ["40 cm", "50 cm", "60 cm", "80 cm"],
            correct: 0,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 55,
            question: "A concave mirror produces a magnification of +3. If the object is placed 10 cm from the mirror, find the image distance.",
            options: ["-30 cm", "30 cm", "-10 cm", "10 cm"],
            correct: 0,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 56,
            question: "The resistance of a wire is 10 Ω. If its length is doubled and area of cross-section is halved, what will be its new resistance?",
            options: ["20 Ω", "30 Ω", "40 Ω", "50 Ω"],
            correct: 2,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 57,
            question: "Three resistors of 2 Ω, 3 Ω, and 6 Ω are connected in parallel. Find their equivalent resistance.",
            options: ["1 Ω", "2 Ω", "3 Ω", "6 Ω"],
            correct: 0,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 58,
            question: "A current of 2 A flows through a resistor of 5 Ω. Calculate the power dissipated.",
            options: ["10 W", "20 W", "30 W", "40 W"],
            correct: 1,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 59,
            question: "The potential difference across a 10 Ω resistor is 20 V. Find the current flowing through it.",
            options: ["1 A", "2 A", "3 A", "4 A"],
            correct: 1,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 60,
            question: "Two resistors of 4 Ω and 6 Ω are connected in series. If a potential difference of 20 V is applied, find the current through each resistor.",
            options: ["1 A", "2 A", "3 A", "4 A"],
            correct: 1,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 61,
            question: "A force of 10 N is applied on an object of mass 2 kg. Find the acceleration produced.",
            options: ["2 m/s²", "5 m/s²", "10 m/s²", "20 m/s²"],
            correct: 1,
            year: "2025",
            chapter: "Force and Laws of Motion"
        },
        {
            id: 62,
            question: "The momentum of an object of mass 5 kg moving with velocity 4 m/s is:",
            options: ["9 kg m/s", "20 kg m/s", "25 kg m/s", "40 kg m/s"],
            correct: 1,
            year: "2024",
            chapter: "Force and Laws of Motion"
        },
        {
            id: 63,
            question: "A body of mass 10 kg is moving with a velocity of 5 m/s. If a force of 20 N acts on it for 2 seconds, find its final velocity.",
            options: ["7 m/s", "9 m/s", "11 m/s", "13 m/s"],
            correct: 1,
            year: "2025",
            chapter: "Force and Laws of Motion"
        },
        {
            id: 64,
            question: "The work done by a force of 5 N in moving an object through a distance of 10 m in the direction of force is:",
            options: ["15 J", "25 J", "50 J", "100 J"],
            correct: 2,
            year: "2024",
            chapter: "Work and Energy"
        },
        {
            id: 65,
            question: "A body of mass 2 kg is raised to a height of 10 m. Calculate the potential energy gained. (g = 10 m/s²)",
            options: ["100 J", "200 J", "300 J", "400 J"],
            correct: 1,
            year: "2025",
            chapter: "Work and Energy"
        },
        {
            id: 66,
            question: "The kinetic energy of an object of mass 5 kg moving with velocity 4 m/s is:",
            options: ["20 J", "40 J", "60 J", "80 J"],
            correct: 1,
            year: "2024",
            chapter: "Work and Energy"
        },
        {
            id: 67,
            question: "Which of the following is a renewable source of energy?",
            options: ["Coal", "Petroleum", "Solar energy", "Natural gas"],
            correct: 2,
            year: "2025",
            chapter: "Sources of Energy"
        },
        {
            id: 68,
            question: "The main component of biogas is:",
            options: ["Methane", "Ethane", "Propane", "Butane"],
            correct: 0,
            year: "2024",
            chapter: "Sources of Energy"
        },
        {
            id: 69,
            question: "Solar cells convert:",
            options: ["Solar energy to electrical energy", "Electrical energy to solar energy", "Heat energy to electrical energy", "Chemical energy to electrical energy"],
            correct: 0,
            year: "2025",
            chapter: "Sources of Energy"
        },
        {
            id: 70,
            question: "The unit of electric charge is:",
            options: ["Ampere", "Volt", "Coulomb", "Ohm"],
            correct: 2,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 71,
            question: "Ohm's law states that:",
            options: ["V = IR", "I = VR", "R = IV", "V = I/R"],
            correct: 0,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 72,
            question: "The SI unit of electric power is:",
            options: ["Joule", "Watt", "Volt", "Ampere"],
            correct: 1,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 73,
            question: "A convex mirror always forms:",
            options: ["Real and inverted image", "Virtual and erect image", "Real and erect image", "Virtual and inverted image"],
            correct: 1,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 74,
            question: "The phenomenon of splitting of white light into its component colors is called:",
            options: ["Reflection", "Refraction", "Dispersion", "Scattering"],
            correct: 2,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 75,
            question: "The speed of light is maximum in:",
            options: ["Water", "Glass", "Vacuum", "Diamond"],
            correct: 2,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 76,
            question: "According to Newton's first law of motion, a body continues in its state of rest or uniform motion unless:",
            options: ["A force acts on it", "Its velocity changes", "Its acceleration is zero", "It is in equilibrium"],
            correct: 0,
            year: "2024",
            chapter: "Force and Laws of Motion"
        },
        {
            id: 77,
            question: "The rate of change of momentum is equal to:",
            options: ["Force", "Acceleration", "Velocity", "Mass"],
            correct: 0,
            year: "2025",
            chapter: "Force and Laws of Motion"
        },
        {
            id: 78,
            question: "The law of conservation of energy states that:",
            options: ["Energy can be created", "Energy can be destroyed", "Energy can neither be created nor destroyed", "Energy is always constant"],
            correct: 2,
            year: "2024",
            chapter: "Work and Energy"
        },
        {
            id: 79,
            question: "The energy stored in a stretched spring is:",
            options: ["Kinetic energy", "Potential energy", "Chemical energy", "Heat energy"],
            correct: 1,
            year: "2025",
            chapter: "Work and Energy"
        },
        {
            id: 80,
            question: "Wind energy is harnessed by:",
            options: ["Solar panels", "Wind turbines", "Hydroelectric dams", "Geothermal plants"],
            correct: 1,
            year: "2024",
            chapter: "Sources of Energy"
        },
        {
            id: 81,
            question: "The focal length of a plane mirror is:",
            options: ["Zero", "Infinite", "Equal to object distance", "Equal to image distance"],
            correct: 1,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 82,
            question: "When light travels from a rarer to a denser medium, it:",
            options: ["Bends away from normal", "Bends towards normal", "Does not bend", "Reflects back"],
            correct: 1,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 83,
            question: "The resistance of a conductor depends on:",
            options: ["Length, area, and material", "Only length", "Only area", "Only material"],
            correct: 0,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 84,
            question: "In a series circuit, the current is:",
            options: ["Different in each component", "Same in all components", "Zero", "Maximum"],
            correct: 1,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 85,
            question: "In a parallel circuit, the voltage is:",
            options: ["Different across each component", "Same across all components", "Zero", "Maximum"],
            correct: 1,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 86,
            question: "The force required to stop a moving object depends on:",
            options: ["Mass and velocity", "Mass and acceleration", "Velocity and time", "All of these"],
            correct: 3,
            year: "2024",
            chapter: "Force and Laws of Motion"
        },
        {
            id: 87,
            question: "A body of mass 1 kg has a kinetic energy of 8 J. Find its velocity.",
            options: ["2 m/s", "4 m/s", "6 m/s", "8 m/s"],
            correct: 1,
            year: "2025",
            chapter: "Work and Energy"
        },
        {
            id: 88,
            question: "The main disadvantage of fossil fuels is:",
            options: ["They are expensive", "They cause pollution", "They are non-renewable", "Both B and C"],
            correct: 3,
            year: "2024",
            chapter: "Sources of Energy"
        },
        {
            id: 89,
            question: "Nuclear energy is obtained by:",
            options: ["Burning nuclear fuel", "Splitting or fusing atomic nuclei", "Heating nuclear material", "Cooling nuclear material"],
            correct: 1,
            year: "2025",
            chapter: "Sources of Energy"
        },
        {
            id: 90,
            question: "The magnification produced by a concave mirror is -2. This means:",
            options: ["Image is real and inverted", "Image is virtual and erect", "Image is real and erect", "Image is virtual and inverted"],
            correct: 0,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 91,
            question: "A lens of power -2.5 D is:",
            options: ["Convex lens", "Concave lens", "Plano-convex lens", "Plano-concave lens"],
            correct: 1,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 92,
            question: "The resistance of a wire increases with:",
            options: ["Increase in length", "Decrease in area", "Increase in temperature", "All of these"],
            correct: 3,
            year: "2024",
            chapter: "Electricity"
        },
        {
            id: 93,
            question: "The unit of electrical energy consumed is:",
            options: ["Watt", "Kilowatt-hour", "Joule per second", "Volt-ampere"],
            correct: 1,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 94,
            question: "According to Newton's third law of motion, action and reaction:",
            options: ["Act on the same body", "Act on different bodies", "Are equal in magnitude", "Both B and C"],
            correct: 3,
            year: "2024",
            chapter: "Force and Laws of Motion"
        },
        {
            id: 95,
            question: "The gravitational potential energy of an object depends on:",
            options: ["Mass and height", "Mass and velocity", "Height and velocity", "Mass only"],
            correct: 0,
            year: "2025",
            chapter: "Work and Energy"
        },
        {
            id: 96,
            question: "Tidal energy is harnessed from:",
            options: ["Ocean waves", "Ocean tides", "Ocean currents", "Ocean temperature difference"],
            correct: 1,
            year: "2024",
            chapter: "Sources of Energy"
        },
        {
            id: 97,
            question: "The critical angle for glass-air interface is approximately:",
            options: ["30°", "42°", "45°", "60°"],
            correct: 1,
            year: "2025",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 98,
            question: "When total internal reflection occurs, the angle of incidence is:",
            options: ["Less than critical angle", "Equal to critical angle", "Greater than critical angle", "90°"],
            correct: 2,
            year: "2024",
            chapter: "Light - Reflection and Refraction"
        },
        {
            id: 99,
            question: "The heating effect of electric current is used in:",
            options: ["Electric bulb", "Electric heater", "Electric iron", "All of these"],
            correct: 3,
            year: "2025",
            chapter: "Electricity"
        },
        {
            id: 100,
            question: "Geothermal energy is obtained from:",
            options: ["Sun", "Wind", "Heat of the earth", "Water"],
            correct: 2,
            year: "2024",
            chapter: "Sources of Energy"
        }
    ],
    chemistry: [
        {
            id: 1,
            question: "What is the chemical formula of water?",
            options: ["H₂O", "H₂O₂", "HO", "H₃O"],
            correct: 0,
            year: "2025",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 2,
            question: "Which of the following is a balanced chemical equation?",
            options: ["H₂ + O₂ → H₂O", "2H₂ + O₂ → 2H₂O", "H₂ + 2O₂ → H₂O", "2H₂ + 2O₂ → 2H₂O"],
            correct: 1,
            year: "2024",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 3,
            question: "What type of reaction is: CaCO₃ → CaO + CO₂?",
            options: ["Combination", "Decomposition", "Displacement", "Double displacement"],
            correct: 1,
            year: "2025",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 4,
            question: "The pH of a neutral solution is:",
            options: ["0", "7", "14", "1"],
            correct: 1,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 5,
            question: "Which of the following is a strong acid?",
            options: ["Acetic acid", "Citric acid", "Hydrochloric acid", "Carbonic acid"],
            correct: 2,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 6,
            question: "What is the common name of sodium bicarbonate?",
            options: ["Washing soda", "Baking soda", "Caustic soda", "Table salt"],
            correct: 1,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 7,
            question: "The process of coating iron with zinc is called:",
            options: ["Galvanization", "Electroplating", "Alloying", "Tinning"],
            correct: 0,
            year: "2025",
            chapter: "Metals and Non-metals"
        },
        {
            id: 8,
            question: "Which metal is liquid at room temperature?",
            options: ["Sodium", "Mercury", "Aluminum", "Iron"],
            correct: 1,
            year: "2024",
            chapter: "Metals and Non-metals"
        },
        {
            id: 9,
            question: "What is the chemical formula of common salt?",
            options: ["NaCl", "Na₂CO₃", "NaHCO₃", "NaOH"],
            correct: 0,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 10,
            question: "Which gas is evolved when an acid reacts with a metal?",
            options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"],
            correct: 1,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 11,
            question: "What is the valency of carbon?",
            options: ["2", "3", "4", "5"],
            correct: 2,
            year: "2025",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 12,
            question: "Which compound is used as a fuel?",
            options: ["Ethanol", "Ethanoic acid", "Ethene", "Ethane"],
            correct: 0,
            year: "2024",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 13,
            question: "The functional group of alcohols is:",
            options: ["-COOH", "-OH", "-CHO", "-CO"],
            correct: 1,
            year: "2025",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 14,
            question: "What is the molecular formula of methane?",
            options: ["CH₄", "C₂H₆", "C₃H₈", "C₄H₁₀"],
            correct: 0,
            year: "2024",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 15,
            question: "Which process is used to separate crude oil into different fractions?",
            options: ["Distillation", "Filtration", "Evaporation", "Crystallization"],
            correct: 0,
            year: "2025",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 16,
            question: "What is the atomic number of carbon?",
            options: ["4", "6", "8", "12"],
            correct: 1,
            year: "2024",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 17,
            question: "Which of the following is a non-metal?",
            options: ["Sodium", "Magnesium", "Sulfur", "Aluminum"],
            correct: 2,
            year: "2025",
            chapter: "Metals and Non-metals"
        },
        {
            id: 18,
            question: "The most reactive metal is:",
            options: ["Gold", "Silver", "Potassium", "Copper"],
            correct: 2,
            year: "2024",
            chapter: "Metals and Non-metals"
        },
        {
            id: 19,
            question: "What is the chemical name of rust?",
            options: ["Iron oxide", "Iron hydroxide", "Iron carbonate", "Iron sulfate"],
            correct: 0,
            year: "2025",
            chapter: "Metals and Non-metals"
        },
        {
            id: 20,
            question: "Which acid is present in vinegar?",
            options: ["Hydrochloric acid", "Sulfuric acid", "Acetic acid", "Citric acid"],
            correct: 2,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 21,
            question: "What is the pH range of acids?",
            options: ["0-7", "7-14", "0-14", "7 only"],
            correct: 0,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 22,
            question: "Which indicator turns red in acidic solution?",
            options: ["Phenolphthalein", "Methyl orange", "Litmus", "Turmeric"],
            correct: 1,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 23,
            question: "What is the chemical formula of quicklime?",
            options: ["CaCO₃", "CaO", "Ca(OH)₂", "CaCl₂"],
            correct: 1,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 24,
            question: "Which gas is produced when metal carbonates react with acids?",
            options: ["Hydrogen", "Oxygen", "Carbon dioxide", "Nitrogen"],
            correct: 2,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 25,
            question: "What is the general formula of alkanes?",
            options: ["CₙH₂ₙ", "CₙH₂ₙ₊₂", "CₙH₂ₙ₋₂", "CₙHₙ"],
            correct: 1,
            year: "2024",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 26,
            question: "Which process involves the addition of hydrogen?",
            options: ["Oxidation", "Reduction", "Substitution", "Combustion"],
            correct: 1,
            year: "2024",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 27,
            question: "What is the common name of ethanoic acid?",
            options: ["Formic acid", "Acetic acid", "Butyric acid", "Propionic acid"],
            correct: 1,
            year: "2025",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 28,
            question: "Which metal is extracted by electrolysis?",
            options: ["Iron", "Copper", "Aluminum", "Zinc"],
            correct: 2,
            year: "2024",
            chapter: "Metals and Non-metals"
        },
        {
            id: 29,
            question: "What is the chemical formula of washing soda?",
            options: ["NaHCO₃", "Na₂CO₃", "Na₂CO₃·10H₂O", "NaOH"],
            correct: 2,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 30,
            question: "Which type of reaction is: 2Mg + O₂ → 2MgO?",
            options: ["Decomposition", "Combination", "Displacement", "Double displacement"],
            correct: 1,
            year: "2024",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 31,
            question: "What is the valency of oxygen?",
            options: ["1", "2", "3", "4"],
            correct: 1,
            year: "2024",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 32,
            question: "Which acid is present in our stomach?",
            options: ["Sulfuric acid", "Nitric acid", "Hydrochloric acid", "Acetic acid"],
            correct: 2,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 33,
            question: "What is the chemical formula of slaked lime?",
            options: ["CaO", "CaCO₃", "Ca(OH)₂", "CaCl₂"],
            correct: 2,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 34,
            question: "Which of the following is an alloy?",
            options: ["Iron", "Steel", "Copper", "Aluminum"],
            correct: 1,
            year: "2025",
            chapter: "Metals and Non-metals"
        },
        {
            id: 35,
            question: "What is the chemical formula of ethane?",
            options: ["CH₄", "C₂H₄", "C₂H₆", "C₃H₈"],
            correct: 2,
            year: "2024",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 36,
            question: "Which process is used to prevent rusting?",
            options: ["Galvanization", "Electroplating", "Painting", "All of these"],
            correct: 3,
            year: "2024",
            chapter: "Metals and Non-metals"
        },
        {
            id: 37,
            question: "What is the pH of lemon juice?",
            options: ["Less than 7", "Equal to 7", "Greater than 7", "Equal to 14"],
            correct: 0,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 38,
            question: "Which gas is used in fire extinguishers?",
            options: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"],
            correct: 2,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 39,
            question: "What is the chemical formula of methane?",
            options: ["CH₄", "C₂H₆", "C₃H₈", "C₄H₁₀"],
            correct: 0,
            year: "2025",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 40,
            question: "Which indicator is used in neutralization reactions?",
            options: ["Methyl orange", "Phenolphthalein", "Litmus", "All of these"],
            correct: 3,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 41,
            question: "What is the chemical formula of baking soda?",
            options: ["Na₂CO₃", "NaHCO₃", "NaOH", "NaCl"],
            correct: 1,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 42,
            question: "Which metal reacts with water at room temperature?",
            options: ["Iron", "Copper", "Sodium", "Silver"],
            correct: 2,
            year: "2025",
            chapter: "Metals and Non-metals"
        },
        {
            id: 43,
            question: "What is the chemical formula of carbon dioxide?",
            options: ["CO", "CO₂", "C₂O", "C₂O₂"],
            correct: 1,
            year: "2024",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 44,
            question: "Which process converts vegetable oil to vanaspati ghee?",
            options: ["Hydrogenation", "Oxidation", "Esterification", "Saponification"],
            correct: 0,
            year: "2025",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 45,
            question: "What is the chemical formula of sulfuric acid?",
            options: ["H₂SO₃", "H₂SO₄", "H₃PO₄", "HNO₃"],
            correct: 1,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 46,
            question: "Which of the following is a saturated hydrocarbon?",
            options: ["Ethene", "Ethyne", "Ethane", "Benzene"],
            correct: 2,
            year: "2024",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 47,
            question: "What is the chemical formula of quicklime?",
            options: ["CaCO₃", "CaO", "Ca(OH)₂", "CaCl₂"],
            correct: 1,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 48,
            question: "Which metal is the best conductor of electricity?",
            options: ["Iron", "Copper", "Silver", "Aluminum"],
            correct: 2,
            year: "2024",
            chapter: "Metals and Non-metals"
        },
        {
            id: 49,
            question: "What is the chemical formula of ammonia?",
            options: ["NH₃", "NH₄", "N₂H₄", "NH₄OH"],
            correct: 0,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 50,
            question: "Which process is used to obtain pure metals from their ores?",
            options: ["Refining", "Roasting", "Calcination", "All of these"],
            correct: 3,
            year: "2024",
            chapter: "Metals and Non-metals"
        },
        {
            id: 51,
            question: "The pH of a solution is 3. What is the nature of the solution?",
            options: ["Acidic", "Basic", "Neutral", "Amphoteric"],
            correct: 0,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 52,
            question: "Which of the following is a strong acid?",
            options: ["Acetic acid", "Citric acid", "Hydrochloric acid", "Carbonic acid"],
            correct: 2,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 53,
            question: "The chemical formula of baking soda is:",
            options: ["NaHCO₃", "Na₂CO₃", "NaOH", "NaCl"],
            correct: 0,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 54,
            question: "What happens when zinc reacts with dilute hydrochloric acid?",
            options: ["Zinc chloride and hydrogen are formed", "Zinc oxide is formed", "No reaction", "Zinc hydroxide is formed"],
            correct: 0,
            year: "2024",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 55,
            question: "The process of rusting is an example of:",
            options: ["Combination reaction", "Decomposition reaction", "Displacement reaction", "Oxidation reaction"],
            correct: 3,
            year: "2025",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 56,
            question: "Which of the following is an example of a double displacement reaction?",
            options: ["Zn + H₂SO₄ → ZnSO₄ + H₂", "2H₂O → 2H₂ + O₂", "AgNO₃ + NaCl → AgCl + NaNO₃", "C + O₂ → CO₂"],
            correct: 2,
            year: "2024",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 57,
            question: "The number of carbon atoms in butane is:",
            options: ["2", "3", "4", "5"],
            correct: 2,
            year: "2025",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 58,
            question: "Which functional group is present in alcohols?",
            options: ["-COOH", "-OH", "-CHO", "-CO"],
            correct: 1,
            year: "2024",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 59,
            question: "The IUPAC name of CH₃CH₂OH is:",
            options: ["Methanol", "Ethanol", "Propanol", "Butanol"],
            correct: 1,
            year: "2025",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 60,
            question: "Which metal is extracted by the process of electrolysis?",
            options: ["Iron", "Copper", "Aluminium", "Zinc"],
            correct: 2,
            year: "2024",
            chapter: "Metals and Non-metals"
        },
        {
            id: 61,
            question: "The most reactive metal is:",
            options: ["Sodium", "Potassium", "Calcium", "Magnesium"],
            correct: 1,
            year: "2025",
            chapter: "Metals and Non-metals"
        },
        {
            id: 62,
            question: "Which non-metal is a good conductor of electricity?",
            options: ["Carbon", "Sulfur", "Phosphorus", "Graphite"],
            correct: 3,
            year: "2024",
            chapter: "Metals and Non-metals"
        },
        {
            id: 63,
            question: "The modern periodic table is based on:",
            options: ["Atomic mass", "Atomic number", "Valency", "Electronegativity"],
            correct: 1,
            year: "2025",
            chapter: "Periodic Classification of Elements"
        },
        {
            id: 64,
            question: "Elements in the same group have:",
            options: ["Same number of shells", "Same number of valence electrons", "Same atomic mass", "Same atomic number"],
            correct: 1,
            year: "2024",
            chapter: "Periodic Classification of Elements"
        },
        {
            id: 65,
            question: "The pH scale ranges from:",
            options: ["0 to 7", "1 to 14", "0 to 14", "7 to 14"],
            correct: 2,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 66,
            question: "What is the pH of pure water?",
            options: ["5", "6", "7", "8"],
            correct: 2,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 67,
            question: "The reaction between an acid and a base is called:",
            options: ["Neutralization", "Oxidation", "Reduction", "Combustion"],
            correct: 0,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 68,
            question: "Which gas is evolved when a metal reacts with an acid?",
            options: ["Oxygen", "Nitrogen", "Hydrogen", "Carbon dioxide"],
            correct: 2,
            year: "2024",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 69,
            question: "The balanced equation for the reaction between magnesium and oxygen is:",
            options: ["Mg + O₂ → MgO", "2Mg + O₂ → 2MgO", "Mg + O → MgO", "Mg + 2O → MgO₂"],
            correct: 1,
            year: "2025",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 70,
            question: "Which type of reaction is: CaCO₃ → CaO + CO₂?",
            options: ["Combination", "Decomposition", "Displacement", "Double displacement"],
            correct: 1,
            year: "2024",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 71,
            question: "The general formula of alkanes is:",
            options: ["CₙH₂ₙ", "CₙH₂ₙ₊₂", "CₙH₂ₙ₋₂", "CₙHₙ"],
            correct: 1,
            year: "2025",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 72,
            question: "Which compound is used as a fuel?",
            options: ["Methane", "Ethanol", "Both A and B", "None of these"],
            correct: 2,
            year: "2024",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 73,
            question: "The process of conversion of sugar into alcohol is called:",
            options: ["Fermentation", "Distillation", "Cracking", "Refining"],
            correct: 0,
            year: "2025",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 74,
            question: "Which metal does not react with water at all?",
            options: ["Sodium", "Potassium", "Gold", "Calcium"],
            correct: 2,
            year: "2024",
            chapter: "Metals and Non-metals"
        },
        {
            id: 75,
            question: "The process of preventing corrosion by coating with a thin layer of zinc is called:",
            options: ["Tinning", "Galvanization", "Electroplating", "Alloying"],
            correct: 1,
            year: "2025",
            chapter: "Metals and Non-metals"
        },
        {
            id: 76,
            question: "Which metal is liquid at room temperature?",
            options: ["Sodium", "Mercury", "Aluminium", "Iron"],
            correct: 1,
            year: "2024",
            chapter: "Metals and Non-metals"
        },
        {
            id: 77,
            question: "Mendeleev's periodic law states that properties of elements are periodic functions of their:",
            options: ["Atomic number", "Atomic mass", "Valency", "Electronegativity"],
            correct: 1,
            year: "2025",
            chapter: "Periodic Classification of Elements"
        },
        {
            id: 78,
            question: "Which group contains noble gases?",
            options: ["Group 1", "Group 17", "Group 18", "Group 2"],
            correct: 2,
            year: "2024",
            chapter: "Periodic Classification of Elements"
        },
        {
            id: 79,
            question: "Litmus paper turns red in:",
            options: ["Acidic solution", "Basic solution", "Neutral solution", "All solutions"],
            correct: 0,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 80,
            question: "The chemical formula of washing soda is:",
            options: ["NaHCO₃", "Na₂CO₃", "Na₂CO₃·10H₂O", "NaOH"],
            correct: 2,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 81,
            question: "Which indicator gives pink color in basic solution?",
            options: ["Litmus", "Phenolphthalein", "Methyl orange", "Turmeric"],
            correct: 1,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 82,
            question: "The reaction: 2H₂ + O₂ → 2H₂O is an example of:",
            options: ["Decomposition", "Combination", "Displacement", "Double displacement"],
            correct: 1,
            year: "2024",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 83,
            question: "Which of the following is a physical change?",
            options: ["Burning of paper", "Rusting of iron", "Melting of ice", "Digestion of food"],
            correct: 2,
            year: "2025",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 84,
            question: "The number of covalent bonds in methane (CH₄) is:",
            options: ["2", "3", "4", "5"],
            correct: 2,
            year: "2024",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 85,
            question: "Which compound is used as an antiseptic?",
            options: ["Ethanol", "Methanol", "Propanol", "Butanol"],
            correct: 0,
            year: "2025",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 86,
            question: "The most ductile metal is:",
            options: ["Gold", "Silver", "Copper", "Aluminium"],
            correct: 0,
            year: "2024",
            chapter: "Metals and Non-metals"
        },
        {
            id: 87,
            question: "Which metal is used in thermometers?",
            options: ["Sodium", "Mercury", "Aluminium", "Copper"],
            correct: 1,
            year: "2025",
            chapter: "Metals and Non-metals"
        },
        {
            id: 88,
            question: "The number of periods in the modern periodic table is:",
            options: ["5", "6", "7", "8"],
            correct: 2,
            year: "2024",
            chapter: "Periodic Classification of Elements"
        },
        {
            id: 89,
            question: "Elements in the same period have:",
            options: ["Same number of shells", "Same number of valence electrons", "Same atomic mass", "Same properties"],
            correct: 0,
            year: "2025",
            chapter: "Periodic Classification of Elements"
        },
        {
            id: 90,
            question: "The pH of lemon juice is approximately:",
            options: ["2", "4", "6", "8"],
            correct: 0,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 91,
            question: "Which acid is present in vinegar?",
            options: ["Hydrochloric acid", "Sulfuric acid", "Acetic acid", "Citric acid"],
            correct: 2,
            year: "2025",
            chapter: "Acids, Bases and Salts"
        },
        {
            id: 92,
            question: "The reaction: Fe + CuSO₄ → FeSO₄ + Cu is an example of:",
            options: ["Combination", "Decomposition", "Displacement", "Double displacement"],
            correct: 2,
            year: "2024",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 93,
            question: "Which gas is produced when an acid reacts with a metal carbonate?",
            options: ["Hydrogen", "Oxygen", "Carbon dioxide", "Nitrogen"],
            correct: 2,
            year: "2025",
            chapter: "Chemical Reactions and Equations"
        },
        {
            id: 94,
            question: "The IUPAC name of CH₃COOH is:",
            options: ["Methanoic acid", "Ethanoic acid", "Propanoic acid", "Butanoic acid"],
            correct: 1,
            year: "2024",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 95,
            question: "Which type of bond is present in diamond?",
            options: ["Ionic", "Covalent", "Metallic", "Hydrogen"],
            correct: 1,
            year: "2025",
            chapter: "Carbon and its Compounds"
        },
        {
            id: 96,
            question: "Which metal is the best conductor of electricity?",
            options: ["Silver", "Copper", "Gold", "Aluminium"],
            correct: 0,
            year: "2024",
            chapter: "Metals and Non-metals"
        },
        {
            id: 97,
            question: "The process of extraction of metals from their ores is called:",
            options: ["Refining", "Metallurgy", "Alloying", "Galvanization"],
            correct: 1,
            year: "2025",
            chapter: "Metals and Non-metals"
        },
        {
            id: 98,
            question: "Which element has the electronic configuration 2, 8, 8?",
            options: ["Neon", "Argon", "Sodium", "Magnesium"],
            correct: 1,
            year: "2024",
            chapter: "Periodic Classification of Elements"
        },
        {
            id: 99,
            question: "The valency of an element with atomic number 17 is:",
            options: ["1", "2", "3", "4"],
            correct: 0,
            year: "2025",
            chapter: "Periodic Classification of Elements"
        },
        {
            id: 100,
            question: "Which of the following is a weak acid?",
            options: ["Hydrochloric acid", "Sulfuric acid", "Acetic acid", "Nitric acid"],
            correct: 2,
            year: "2024",
            chapter: "Acids, Bases and Salts"
        }
    ],
    biology: [
        {
            id: 1,
            question: "Which process is responsible for the transport of water in plants?",
            options: ["Transpiration", "Photosynthesis", "Respiration", "Osmosis"],
            correct: 0,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 2,
            question: "What is the main product of photosynthesis?",
            options: ["Oxygen", "Carbon dioxide", "Glucose", "Water"],
            correct: 2,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 3,
            question: "Which organelle is known as the powerhouse of the cell?",
            options: ["Nucleus", "Mitochondria", "Chloroplast", "Ribosome"],
            correct: 1,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 4,
            question: "What is the function of hemoglobin?",
            options: ["Digestion", "Transport of oxygen", "Production of energy", "Excretion"],
            correct: 1,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 5,
            question: "Which part of the plant is responsible for absorption of water?",
            options: ["Root", "Stem", "Leaf", "Flower"],
            correct: 0,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 6,
            question: "What is the process of breakdown of glucose in the absence of oxygen called?",
            options: ["Aerobic respiration", "Anaerobic respiration", "Photosynthesis", "Transpiration"],
            correct: 1,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 7,
            question: "Which enzyme is present in saliva?",
            options: ["Pepsin", "Amylase", "Trypsin", "Lipase"],
            correct: 1,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 8,
            question: "What is the functional unit of kidney?",
            options: ["Nephron", "Neuron", "Alveoli", "Villi"],
            correct: 0,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 9,
            question: "Which hormone controls blood sugar level?",
            options: ["Insulin", "Adrenaline", "Thyroxine", "Growth hormone"],
            correct: 0,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 10,
            question: "What is the main function of the nervous system?",
            options: ["Digestion", "Respiration", "Coordination", "Excretion"],
            correct: 2,
            year: "2024",
            chapter: "Control and Coordination"
        },
        {
            id: 11,
            question: "Which part of the brain controls balance and coordination?",
            options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
            correct: 1,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 12,
            question: "What is the basic unit of nervous system?",
            options: ["Nephron", "Neuron", "Alveoli", "Cell"],
            correct: 1,
            year: "2024",
            chapter: "Control and Coordination"
        },
        {
            id: 13,
            question: "Which plant hormone promotes cell division?",
            options: ["Auxin", "Cytokinin", "Gibberellin", "Abscisic acid"],
            correct: 1,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 14,
            question: "What is the process of fusion of male and female gametes called?",
            options: ["Fertilization", "Pollination", "Germination", "Reproduction"],
            correct: 0,
            year: "2024",
            chapter: "How do Organisms Reproduce"
        },
        {
            id: 15,
            question: "Which method of reproduction involves only one parent?",
            options: ["Sexual reproduction", "Asexual reproduction", "Fertilization", "Pollination"],
            correct: 1,
            year: "2025",
            chapter: "How do Organisms Reproduce"
        },
        {
            id: 16,
            question: "What is the male reproductive part of a flower?",
            options: ["Pistil", "Stamen", "Sepal", "Petal"],
            correct: 1,
            year: "2024",
            chapter: "How do Organisms Reproduce"
        },
        {
            id: 17,
            question: "Which process involves the transfer of pollen grains?",
            options: ["Fertilization", "Pollination", "Germination", "Reproduction"],
            correct: 1,
            year: "2025",
            chapter: "How do Organisms Reproduce"
        },
        {
            id: 18,
            question: "What is the process of formation of new individuals called?",
            options: ["Growth", "Development", "Reproduction", "Metabolism"],
            correct: 2,
            year: "2024",
            chapter: "How do Organisms Reproduce"
        },
        {
            id: 19,
            question: "Which type of reproduction produces genetically identical offspring?",
            options: ["Sexual reproduction", "Asexual reproduction", "Both", "None"],
            correct: 1,
            year: "2025",
            chapter: "How do Organisms Reproduce"
        },
        {
            id: 20,
            question: "What is heredity?",
            options: ["Transmission of characters from parents to offspring", "Formation of gametes", "Cell division", "Growth"],
            correct: 0,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 21,
            question: "What are the units of heredity?",
            options: ["Chromosomes", "Genes", "DNA", "RNA"],
            correct: 1,
            year: "2025",
            chapter: "Heredity and Evolution"
        },
        {
            id: 22,
            question: "How many chromosomes are present in human cells?",
            options: ["23", "46", "44", "48"],
            correct: 1,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 23,
            question: "What is evolution?",
            options: ["Change in characteristics over generations", "Cell division", "Growth", "Reproduction"],
            correct: 0,
            year: "2025",
            chapter: "Heredity and Evolution"
        },
        {
            id: 24,
            question: "Which scientist proposed the theory of natural selection?",
            options: ["Mendel", "Darwin", "Pasteur", "Hooke"],
            correct: 1,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 25,
            question: "What is the process by which plants make their own food?",
            options: ["Respiration", "Photosynthesis", "Transpiration", "Digestion"],
            correct: 1,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 26,
            question: "Which gas is released during photosynthesis?",
            options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
            correct: 1,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 27,
            question: "What is the main function of the heart?",
            options: ["Digestion", "Pumping blood", "Respiration", "Excretion"],
            correct: 1,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 28,
            question: "Which blood group is known as universal donor?",
            options: ["A", "B", "AB", "O"],
            correct: 3,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 29,
            question: "What is the process of removal of waste products called?",
            options: ["Digestion", "Respiration", "Excretion", "Circulation"],
            correct: 2,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 30,
            question: "Which organ produces bile?",
            options: ["Stomach", "Liver", "Pancreas", "Small intestine"],
            correct: 1,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 31,
            question: "What is the function of the spinal cord?",
            options: ["Thinking", "Reflex action", "Memory", "Balance"],
            correct: 1,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 32,
            question: "Which gland is known as the master gland?",
            options: ["Thyroid", "Pituitary", "Adrenal", "Pancreas"],
            correct: 1,
            year: "2024",
            chapter: "Control and Coordination"
        },
        {
            id: 33,
            question: "What is tropism?",
            options: ["Growth movement in response to stimulus", "Cell division", "Reproduction", "Respiration"],
            correct: 0,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 34,
            question: "Which method of reproduction is seen in amoeba?",
            options: ["Binary fission", "Budding", "Spore formation", "Fragmentation"],
            correct: 0,
            year: "2024",
            chapter: "How do Organisms Reproduce"
        },
        {
            id: 35,
            question: "What is the female reproductive part of a flower?",
            options: ["Stamen", "Pistil", "Sepal", "Petal"],
            correct: 1,
            year: "2024",
            chapter: "How do Organisms Reproduce"
        },
        {
            id: 36,
            question: "What is DNA?",
            options: ["Deoxyribonucleic acid", "Ribonucleic acid", "Protein", "Carbohydrate"],
            correct: 0,
            year: "2025",
            chapter: "Heredity and Evolution"
        },
        {
            id: 37,
            question: "What is a gene?",
            options: ["Unit of heredity", "Cell organelle", "Tissue", "Organ"],
            correct: 0,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 38,
            question: "Which process leads to the formation of new species?",
            options: ["Reproduction", "Evolution", "Growth", "Development"],
            correct: 1,
            year: "2025",
            chapter: "Heredity and Evolution"
        },
        {
            id: 39,
            question: "What is the study of fossils called?",
            options: ["Genetics", "Paleontology", "Ecology", "Anatomy"],
            correct: 1,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 40,
            question: "Which process occurs in mitochondria?",
            options: ["Photosynthesis", "Respiration", "Digestion", "Excretion"],
            correct: 1,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 41,
            question: "What is the main function of red blood cells?",
            options: ["Fight infection", "Carry oxygen", "Clotting", "Immunity"],
            correct: 1,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 42,
            question: "Which part of the plant performs photosynthesis?",
            options: ["Root", "Stem", "Leaf", "Flower"],
            correct: 2,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 43,
            question: "What is the process of exchange of gases called?",
            options: ["Respiration", "Photosynthesis", "Transpiration", "Digestion"],
            correct: 0,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 44,
            question: "Which hormone is produced by the thyroid gland?",
            options: ["Insulin", "Thyroxine", "Adrenaline", "Growth hormone"],
            correct: 1,
            year: "2024",
            chapter: "Control and Coordination"
        },
        {
            id: 45,
            question: "What is the function of the cerebrum?",
            options: ["Balance", "Thinking and memory", "Reflex action", "Breathing"],
            correct: 1,
            year: "2024",
            chapter: "Control and Coordination"
        },
        {
            id: 46,
            question: "Which method of reproduction is seen in yeast?",
            options: ["Binary fission", "Budding", "Spore formation", "Fragmentation"],
            correct: 1,
            year: "2025",
            chapter: "How do Organisms Reproduce"
        },
        {
            id: 47,
            question: "What is the process of formation of seeds called?",
            options: ["Pollination", "Fertilization", "Germination", "Reproduction"],
            correct: 1,
            year: "2024",
            chapter: "How do Organisms Reproduce"
        },
        {
            id: 48,
            question: "What is variation?",
            options: ["Differences among individuals", "Cell division", "Growth", "Reproduction"],
            correct: 0,
            year: "2025",
            chapter: "Heredity and Evolution"
        },
        {
            id: 49,
            question: "Which scientist is known as the father of genetics?",
            options: ["Darwin", "Mendel", "Pasteur", "Hooke"],
            correct: 1,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 50,
            question: "What is the process of gradual change in organisms over time called?",
            options: ["Reproduction", "Evolution", "Growth", "Development"],
            correct: 1,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 51,
            question: "Which part of the plant is responsible for photosynthesis?",
            options: ["Root", "Stem", "Leaf", "Flower"],
            correct: 2,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 52,
            question: "The process by which plants make their own food is called:",
            options: ["Respiration", "Photosynthesis", "Transpiration", "Digestion"],
            correct: 1,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 53,
            question: "Which organ filters blood in the human body?",
            options: ["Heart", "Liver", "Kidney", "Lung"],
            correct: 2,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 54,
            question: "The largest part of the brain is:",
            options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
            correct: 0,
            year: "2024",
            chapter: "Control and Coordination"
        },
        {
            id: 55,
            question: "Which hormone is secreted by the pancreas?",
            options: ["Insulin", "Adrenaline", "Thyroxine", "Growth hormone"],
            correct: 0,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 56,
            question: "The process of fusion of male and female gametes is called:",
            options: ["Fertilization", "Pollination", "Germination", "Reproduction"],
            correct: 0,
            year: "2024",
            chapter: "How do Organisms Reproduce?"
        },
        {
            id: 57,
            question: "Which method of reproduction produces genetically identical offspring?",
            options: ["Sexual reproduction", "Asexual reproduction", "Both", "None"],
            correct: 1,
            year: "2025",
            chapter: "How do Organisms Reproduce?"
        },
        {
            id: 58,
            question: "The study of heredity and variation is called:",
            options: ["Genetics", "Evolution", "Ecology", "Taxonomy"],
            correct: 0,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 59,
            question: "Which scientist proposed the theory of evolution?",
            options: ["Mendel", "Darwin", "Pasteur", "Watson"],
            correct: 1,
            year: "2025",
            chapter: "Heredity and Evolution"
        },
        {
            id: 60,
            question: "The process of breakdown of glucose in the presence of oxygen is called:",
            options: ["Aerobic respiration", "Anaerobic respiration", "Fermentation", "Photosynthesis"],
            correct: 0,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 61,
            question: "Which blood group is known as universal donor?",
            options: ["A", "B", "AB", "O"],
            correct: 3,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 62,
            question: "The process of removal of waste products from the body is called:",
            options: ["Respiration", "Digestion", "Excretion", "Circulation"],
            correct: 2,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 63,
            question: "Which part of the eye controls the amount of light entering?",
            options: ["Iris", "Pupil", "Retina", "Cornea"],
            correct: 0,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 64,
            question: "The reflex action is controlled by:",
            options: ["Brain", "Spinal cord", "Both", "None"],
            correct: 1,
            year: "2024",
            chapter: "Control and Coordination"
        },
        {
            id: 65,
            question: "Which plant hormone promotes cell division?",
            options: ["Auxin", "Cytokinin", "Gibberellin", "Abscisic acid"],
            correct: 1,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 66,
            question: "The male reproductive part of a flower is:",
            options: ["Stamen", "Pistil", "Sepal", "Petal"],
            correct: 0,
            year: "2024",
            chapter: "How do Organisms Reproduce?"
        },
        {
            id: 67,
            question: "In humans, the number of chromosomes in a gamete is:",
            options: ["23", "46", "48", "24"],
            correct: 0,
            year: "2025",
            chapter: "Heredity and Evolution"
        },
        {
            id: 68,
            question: "The process of change in species over time is called:",
            options: ["Adaptation", "Evolution", "Variation", "Selection"],
            correct: 1,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 69,
            question: "Which organ produces bile?",
            options: ["Stomach", "Liver", "Pancreas", "Small intestine"],
            correct: 1,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 70,
            question: "The process of taking in oxygen and giving out carbon dioxide is called:",
            options: ["Respiration", "Photosynthesis", "Transpiration", "Digestion"],
            correct: 0,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 71,
            question: "Which part of the brain controls breathing and heartbeat?",
            options: ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"],
            correct: 2,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 72,
            question: "The hormone that controls growth is:",
            options: ["Insulin", "Thyroxine", "Growth hormone", "Adrenaline"],
            correct: 2,
            year: "2024",
            chapter: "Control and Coordination"
        },
        {
            id: 73,
            question: "Which method of reproduction involves two parents?",
            options: ["Binary fission", "Budding", "Sexual reproduction", "Vegetative propagation"],
            correct: 2,
            year: "2025",
            chapter: "How do Organisms Reproduce?"
        },
        {
            id: 74,
            question: "The genetic material is present in:",
            options: ["Nucleus", "Cytoplasm", "Cell membrane", "Mitochondria"],
            correct: 0,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 75,
            question: "Which scientist is known as the father of genetics?",
            options: ["Darwin", "Mendel", "Pasteur", "Watson"],
            correct: 1,
            year: "2025",
            chapter: "Heredity and Evolution"
        },
        {
            id: 76,
            question: "The process of breakdown of food in the body is called:",
            options: ["Respiration", "Digestion", "Excretion", "Circulation"],
            correct: 1,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 77,
            question: "Which blood vessel carries oxygenated blood?",
            options: ["Artery", "Vein", "Capillary", "All of these"],
            correct: 0,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 78,
            question: "The process of movement of water from roots to leaves is called:",
            options: ["Transpiration", "Photosynthesis", "Osmosis", "Diffusion"],
            correct: 0,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 79,
            question: "Which sense organ detects sound?",
            options: ["Eye", "Ear", "Nose", "Tongue"],
            correct: 1,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 80,
            question: "The hormone that prepares the body for emergency is:",
            options: ["Insulin", "Adrenaline", "Thyroxine", "Growth hormone"],
            correct: 1,
            year: "2024",
            chapter: "Control and Coordination"
        },
        {
            id: 81,
            question: "Which part of the flower contains ovules?",
            options: ["Stamen", "Pistil", "Sepal", "Petal"],
            correct: 1,
            year: "2025",
            chapter: "How do Organisms Reproduce?"
        },
        {
            id: 82,
            question: "The number of chromosomes in a human body cell is:",
            options: ["23", "46", "48", "24"],
            correct: 1,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 83,
            question: "Which process helps in the survival of species?",
            options: ["Respiration", "Reproduction", "Digestion", "Excretion"],
            correct: 1,
            year: "2025",
            chapter: "How do Organisms Reproduce?"
        },
        {
            id: 84,
            question: "The process of natural selection was proposed by:",
            options: ["Mendel", "Darwin", "Pasteur", "Watson"],
            correct: 1,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 85,
            question: "Which organ pumps blood throughout the body?",
            options: ["Lung", "Liver", "Heart", "Kidney"],
            correct: 2,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 86,
            question: "The process of exchange of gases in plants occurs through:",
            options: ["Stomata", "Roots", "Stem", "Flowers"],
            correct: 0,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 87,
            question: "Which part of the nervous system controls voluntary actions?",
            options: ["Autonomic nervous system", "Somatic nervous system", "Central nervous system", "Peripheral nervous system"],
            correct: 1,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 88,
            question: "The hormone that regulates metabolism is:",
            options: ["Insulin", "Thyroxine", "Growth hormone", "Adrenaline"],
            correct: 1,
            year: "2024",
            chapter: "Control and Coordination"
        },
        {
            id: 89,
            question: "Which method of reproduction is seen in bacteria?",
            options: ["Binary fission", "Budding", "Spore formation", "All of these"],
            correct: 0,
            year: "2025",
            chapter: "How do Organisms Reproduce?"
        },
        {
            id: 90,
            question: "The passing of traits from parents to offspring is called:",
            options: ["Variation", "Heredity", "Evolution", "Adaptation"],
            correct: 1,
            year: "2024",
            chapter: "Heredity and Evolution"
        },
        {
            id: 91,
            question: "Which process releases energy from food?",
            options: ["Photosynthesis", "Respiration", "Transpiration", "Digestion"],
            correct: 1,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 92,
            question: "The smallest unit of life is:",
            options: ["Tissue", "Organ", "Cell", "Organism"],
            correct: 2,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 93,
            question: "Which part of the eye contains light-sensitive cells?",
            options: ["Iris", "Pupil", "Retina", "Cornea"],
            correct: 2,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 94,
            question: "The process of response to a stimulus is called:",
            options: ["Reflex", "Reaction", "Response", "All of these"],
            correct: 0,
            year: "2024",
            chapter: "Control and Coordination"
        },
        {
            id: 95,
            question: "Which plant hormone inhibits growth?",
            options: ["Auxin", "Cytokinin", "Gibberellin", "Abscisic acid"],
            correct: 3,
            year: "2025",
            chapter: "Control and Coordination"
        },
        {
            id: 96,
            question: "The female reproductive part of a flower is:",
            options: ["Stamen", "Pistil", "Sepal", "Petal"],
            correct: 1,
            year: "2024",
            chapter: "How do Organisms Reproduce?"
        },
        {
            id: 97,
            question: "The process of formation of new species is called:",
            options: ["Variation", "Speciation", "Evolution", "Adaptation"],
            correct: 1,
            year: "2025",
            chapter: "Heredity and Evolution"
        },
        {
            id: 98,
            question: "Which organ stores urine?",
            options: ["Kidney", "Ureter", "Bladder", "Urethra"],
            correct: 2,
            year: "2024",
            chapter: "Life Processes"
        },
        {
            id: 99,
            question: "The process of breakdown of glucose in the absence of oxygen is called:",
            options: ["Aerobic respiration", "Anaerobic respiration", "Fermentation", "Both B and C"],
            correct: 3,
            year: "2025",
            chapter: "Life Processes"
        },
        {
            id: 100,
            question: "Which blood group is known as universal recipient?",
            options: ["A", "B", "AB", "O"],
            correct: 2,
            year: "2024",
            chapter: "Life Processes"
        }
    ],
    socialScience: [
        {
                    id: 1,
                    question: "In which year did the French Revolution begin, marking a significant event in European history?",
                    options: ["1789", "1799", "1804", "1815"],
                    correct: 0,
                    year: "2025",
                    chapter: "History - The Rise of Nationalism in Europe",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 2,
                    question: "Who was the leader of the Bolshevik Party during the Russian Revolution of 1917?",
                    options: ["Stalin", "Lenin", "Trotsky", "Kerensky"],
                    correct: 1,
                    year: "2025",
                    chapter: "History - The Rise of Nationalism in Europe",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 4,
                    question: "On which date did India gain independence from British rule?",
                    options: ["15 August 1945", "15 August 1947", "26 January 1950", "15 August 1952"],
                    correct: 1,
                    year: "2025",
                    chapter: "History - Nationalism in India",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 5,
                    question: "Who initiated the Non-Cooperation Movement in 1920?",
                    options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Bhagat Singh"],
                    correct: 1,
                    year: "2025",
                    chapter: "History - Nationalism in India",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 6,
                    question: "What was the immediate cause that triggered the First World War in 1914?",
                    options: ["Assassination of Archduke Franz Ferdinand", "Russian Revolution", "French Revolution", "Industrial Revolution"],
                    correct: 0,
                    year: "2025",
                    chapter: "History - The Making of a Global World",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 7,
                    question: "Which movement was launched by Mahatma Gandhi in 1930, starting with the Dandi March?",
                    options: ["Non-Cooperation Movement", "Civil Disobedience Movement", "Quit India Movement", "Swadeshi Movement"],
                    correct: 1,
                    year: "2025",
                    chapter: "History - Nationalism in India",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 8,
                    question: "In which year was the Quit India Movement launched by Mahatma Gandhi?",
                    options: ["1940", "1942", "1945", "1947"],
                    correct: 1,
                    year: "2025",
                    chapter: "History - Nationalism in India",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 9,
                    question: "Who was the founder of the Indian National Congress?",
                    options: ["A.O. Hume", "Dadabhai Naoroji", "W.C. Bonnerjee", "Surendranath Banerjee"],
                    correct: 0,
                    year: "2025",
                    chapter: "History - Nationalism in India",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 11,
                    question: "What is the primary source of energy in India?",
                    options: ["Coal", "Petroleum", "Natural gas", "Solar energy"],
                    correct: 0,
                    year: "2025",
                    chapter: "Geography - Resources and Development",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 12,
                    question: "Which type of soil is predominantly found in the Deccan Plateau region?",
                    options: ["Alluvial soil", "Black soil", "Red soil", "Laterite soil"],
                    correct: 1,
                    year: "2025",
                    chapter: "Geography - Resources and Development",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 13,
                    question: "What is the main occupation of the majority of people in India?",
                    options: ["Industry", "Agriculture", "Services", "Mining"],
                    correct: 1,
                    year: "2025",
                    chapter: "Geography - Agriculture",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 14,
                    question: "Which crop is commonly referred to as the 'golden fiber'?",
                    options: ["Cotton", "Jute", "Wheat", "Rice"],
                    correct: 1,
                    year: "2025",
                    chapter: "Geography - Agriculture",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 15,
                    question: "What is the primary source of irrigation in India?",
                    options: ["Canals", "Wells and tubewells", "Tanks", "Rivers"],
                    correct: 1,
                    year: "2025",
                    chapter: "Geography - Water Resources",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 16,
                    question: "Which industry is considered the backbone of modern industrial development?",
                    options: ["Textile industry", "Iron and steel industry", "Cement industry", "Sugar industry"],
                    correct: 1,
                    year: "2025",
                    chapter: "Geography - Manufacturing Industries",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 17,
                    question: "What is the primary aim of sustainable development?",
                    options: ["Economic growth only", "Environmental protection only", "Balance between development and environment", "Industrial growth only"],
                    correct: 2,
                    year: "2025",
                    chapter: "Geography - Resources and Development",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 20,
                    question: "Which state is the largest producer of rice in India?",
                    options: ["Punjab", "West Bengal", "Uttar Pradesh", "Andhra Pradesh"],
                    correct: 1,
                    year: "2025",
                    chapter: "Geography - Agriculture",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 22,
                    question: "Which type of forest is most commonly found in India?",
                    options: ["Tropical evergreen forests", "Tropical deciduous forests", "Temperate forests", "Alpine forests"],
                    correct: 1,
                    year: "2025",
                    chapter: "Geography - Forest and Wildlife Resources",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 23,
                    question: "What is the main cause of water scarcity in India?",
                    options: ["Over-exploitation of water resources", "Unequal access to water", "Water pollution", "All of these"],
                    correct: 3,
                    year: "2025",
                    chapter: "Geography - Water Resources",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 24,
                    question: "Which is the largest textile industry center in India?",
                    options: ["Mumbai", "Ahmedabad", "Surat", "Coimbatore"],
                    correct: 0,
                    year: "2025",
                    chapter: "Geography - Manufacturing Industries",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 26,
                    question: "What is the fundamental principle of democracy?",
                    options: ["Rule by one person", "Rule by a few", "Rule by the people", "Rule by military"],
                    correct: 2,
                    year: "2025",
                    chapter: "Political Science - Power Sharing",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 28,
                    question: "What is the key feature of federalism?",
                    options: ["Division of power between central and state governments", "Rule by one government", "Military rule", "Dictatorship"],
                    correct: 0,
                    year: "2025",
                    chapter: "Political Science - Federalism",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 29,
                    question: "Who is the constitutional head of the state in India?",
                    options: ["Prime Minister", "President", "Chief Justice", "Speaker of Lok Sabha"],
                    correct: 1,
                    year: "2025",
                    chapter: "Political Science - Federalism",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 32,
                    question: "What is the primary function of the Parliament in India?",
                    options: ["To make laws", "To execute laws", "To interpret laws", "To enforce laws"],
                    correct: 0,
                    year: "2025",
                    chapter: "Political Science - Democratic Politics",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 33,
                    question: "Which house of the Indian Parliament is directly elected by the people?",
                    options: ["Rajya Sabha", "Lok Sabha", "Both houses", "Neither house"],
                    correct: 1,
                    year: "2025",
                    chapter: "Political Science - Democratic Politics",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 34,
                    question: "What is the main function of the judiciary in India?",
                    options: ["To make laws", "To execute laws", "To interpret laws", "To enforce laws"],
                    correct: 2,
                    year: "2025",
                    chapter: "Political Science - Democratic Politics",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 35,
                    question: "What is a key feature of a democratic government?",
                    options: ["Rule of law", "Free and fair elections", "Respect for fundamental rights", "All of these"],
                    correct: 3,
                    year: "2025",
                    chapter: "Political Science - Democratic Politics",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 37,
                    question: "What is the main challenge to democracy in India?",
                    options: ["Poverty", "Inequality", "Corruption", "All of these"],
                    correct: 3,
                    year: "2025",
                    chapter: "Political Science - Challenges to Democracy",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 41,
                    question: "What is the primary source of income for the government?",
                    options: ["Taxes", "Loans", "Grants", "Donations"],
                    correct: 0,
                    year: "2025",
                    chapter: "Economics - Money and Credit",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 42,
                    question: "What is the main function of banks in the economy?",
                    options: ["To accept deposits and give loans", "To print money", "To control inflation", "To set interest rates"],
                    correct: 0,
                    year: "2025",
                    chapter: "Economics - Money and Credit",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 43,
                    question: "What does GDP stand for?",
                    options: ["Gross Domestic Product", "General Development Program", "Government Development Plan", "Gross Development Program"],
                    correct: 0,
                    year: "2025",
                    chapter: "Economics - Development",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 44,
                    question: "What are the main indicators of development?",
                    options: ["Income only", "Education only", "Health only", "Income, Education, and Health"],
                    correct: 3,
                    year: "2025",
                    chapter: "Economics - Development",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 45,
                    question: "What is globalization?",
                    options: ["Integration of economies across the world", "Isolation of countries", "National development only", "Local trade only"],
                    correct: 0,
                    year: "2025",
                    chapter: "Economics - Globalization and the Indian Economy",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 46,
                    question: "Which organization promotes international trade and economic cooperation?",
                    options: ["United Nations (UN)", "World Trade Organization (WTO)", "World Health Organization (WHO)", "UNESCO"],
                    correct: 1,
                    year: "2025",
                    chapter: "Economics - Globalization and the Indian Economy",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 47,
                    question: "What is the main source of credit for rural households in India?",
                    options: ["Banks", "Cooperative societies", "Money lenders", "All of these"],
                    correct: 2,
                    year: "2025",
                    chapter: "Economics - Money and Credit",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 48,
                    question: "What is the main impact of globalization on the Indian economy?",
                    options: ["Increased competition", "Better quality products", "Lower prices", "All of these"],
                    correct: 3,
                    year: "2025",
                    chapter: "Economics - Globalization and the Indian Economy",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 49,
                    question: "What was the main aim of the Green Revolution in India?",
                    options: ["To increase agricultural production", "To promote industry", "To develop infrastructure", "To reduce poverty"],
                    correct: 0,
                    year: "2025",
                    chapter: "Economics - Development",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 51,
                    question: "The Treaty of Versailles (1919) imposed severe conditions on Germany after World War I. Which of these was NOT a consequence of this treaty?",
                    options: ["Germany lost all its overseas colonies", "Germany was forced to pay heavy reparations", "Germany was allowed to maintain a large army", "Germany lost territories to France and Poland"],
                    correct: 2,
                    year: "2025",
                    chapter: "History - The Making of a Global World",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 69,
                    question: "Which type of forest covers the largest area in India?",
                    options: ["Tropical Evergreen", "Tropical Deciduous", "Montane", "Mangrove"],
                    correct: 1,
                    year: "2025",
                    chapter: "Geography - Forest and Wildlife Resources",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 101,
                    question: "Who invented the printing press in the 15th century?",
                    options: ["Johannes Gutenberg", "William Caxton", "Martin Luther", "Erasmus"],
                    correct: 0,
                    year: "2025",
                    chapter: "History - Print Culture and the Modern World",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 102,
                    question: "The first printed book in Europe was:",
                    options: ["The Bible", "The Gutenberg Bible", "The Canterbury Tales", "The Divine Comedy"],
                    correct: 1,
                    year: "2025",
                    chapter: "History - Print Culture and the Modern World",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 103,
                    question: "What was the impact of print culture on the French Revolution?",
                    options: ["It had no impact", "It spread revolutionary ideas and Enlightenment philosophy", "It only affected the elite", "It was banned during the revolution"],
                    correct: 1,
                    year: "2025",
                    chapter: "History - Print Culture and the Modern World",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 111,
                    question: "Which mineral is known as 'Black Gold'?",
                    options: ["Coal", "Petroleum", "Iron ore", "Manganese"],
                    correct: 1,
                    year: "2025",
                    chapter: "Geography - Mineral and Energy Resources",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 112,
                    question: "The largest coal producing state in India is:",
                    options: ["Jharkhand", "Odisha", "Chhattisgarh", "West Bengal"],
                    correct: 0,
                    year: "2025",
                    chapter: "Geography - Mineral and Energy Resources",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 113,
                    question: "Which type of coal has the highest carbon content?",
                    options: ["Peat", "Lignite", "Bituminous", "Anthracite"],
                    correct: 3,
                    year: "2025",
                    chapter: "Geography - Mineral and Energy Resources",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 114,
                    question: "The largest oil field in India is located in:",
                    options: ["Bombay High", "Digboi", "Naharkatiya", "Ankleshwar"],
                    correct: 0,
                    year: "2025",
                    chapter: "Geography - Mineral and Energy Resources",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 115,
                    question: "Which mineral is essential for the production of steel?",
                    options: ["Coal", "Iron ore", "Manganese", "All of these"],
                    correct: 3,
                    year: "2025",
                    chapter: "Geography - Mineral and Energy Resources",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 126,
                    question: "What is the main function of a political party?",
                    options: ["To contest elections", "To form government", "To make policies", "All of these"],
                    correct: 3,
                    year: "2025",
                    chapter: "Political Science - Political Parties",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 127,
                    question: "A political party that is recognized in four or more states is called:",
                    options: ["National party", "State party", "Regional party", "Local party"],
                    correct: 0,
                    year: "2025",
                    chapter: "Political Science - Political Parties",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 128,
                    question: "Which is a challenge faced by political parties in India?",
                    options: ["Lack of internal democracy", "Dynastic succession", "Money and muscle power", "All of these"],
                    correct: 3,
                    year: "2025",
                    chapter: "Political Science - Political Parties",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
                    id: 129,
                    question: "The 'Anti-Defection Law' was passed to:",
                    options: ["Prevent corruption", "Prevent elected members from changing parties", "Increase party membership", "Reduce election expenses"],
                    correct: 1,
                    year: "2025",
                    chapter: "Political Science - Political Parties",
                    source: "https://cbseacademic.nic.in/SQP_CLASSX_2025-26.html"
                },
        {
            id: 51,
            question: "Which event marked the beginning of the First World War in 1914?",
            options: ["Assassination of Archduke Franz Ferdinand", "Russian Revolution", "Treaty of Versailles", "Battle of Marne"],
            correct: 0,
            year: "2025",
            chapter: "History - The Making of a Global World"
        },
        {
            id: 52,
            question: "Who was known as the 'Iron Man of India'?",
            options: ["Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Subhash Chandra Bose"],
            correct: 1,
            year: "2024",
            chapter: "History - Nationalism in India"
        },
        {
            id: 53,
            question: "The Rowlatt Act was passed in which year?",
            options: ["1917", "1918", "1919", "1920"],
            correct: 2,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 54,
            question: "Which river is known as the 'Sorrow of Bengal'?",
            options: ["Ganga", "Yamuna", "Damodar", "Hooghly"],
            correct: 2,
            year: "2024",
            chapter: "Geography - Water Resources"
        },
        {
            id: 55,
            question: "The Tropic of Cancer passes through how many Indian states?",
            options: ["6", "7", "8", "9"],
            correct: 2,
            year: "2025",
            chapter: "Geography - India: Size and Location"
        },
        {
            id: 56,
            question: "Which type of soil is best suited for cotton cultivation?",
            options: ["Alluvial soil", "Black soil", "Red soil", "Laterite soil"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Resources and Development"
        },
        {
            id: 57,
            question: "What is the main source of power in India?",
            options: ["Thermal power", "Hydroelectric power", "Nuclear power", "Solar power"],
            correct: 0,
            year: "2025",
            chapter: "Geography - Minerals and Energy Resources"
        },
        {
            id: 58,
            question: "Which is the largest state of India by area?",
            options: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttar Pradesh"],
            correct: 2,
            year: "2024",
            chapter: "Geography - India: Size and Location"
        },
        {
            id: 59,
            question: "The Indian Constitution came into effect on:",
            options: ["26 January 1947", "26 January 1948", "26 January 1949", "26 January 1950"],
            correct: 3,
            year: "2025",
            chapter: "Political Science - Power Sharing"
        },
        {
            id: 60,
            question: "Who is known as the 'Father of the Indian Constitution'?",
            options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Patel"],
            correct: 2,
            year: "2024",
            chapter: "Political Science - Federalism"
        },
        {
            id: 61,
            question: "The Non-Cooperation Movement was launched in:",
            options: ["1919", "1920", "1921", "1922"],
            correct: 1,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 62,
            question: "Which is the largest river basin in India?",
            options: ["Ganga", "Godavari", "Krishna", "Narmada"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Water Resources"
        },
        {
            id: 63,
            question: "The Dandi March was associated with:",
            options: ["Quit India Movement", "Non-Cooperation Movement", "Civil Disobedience Movement", "Swadeshi Movement"],
            correct: 2,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 64,
            question: "Which type of forest is found in the Western Ghats?",
            options: ["Tropical Evergreen", "Tropical Deciduous", "Thorn", "Mangrove"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Forest and Wildlife Resources"
        },
        {
            id: 65,
            question: "The concept of 'Rule of Law' means:",
            options: ["Laws are made by the government", "Everyone is equal before the law", "Laws can be changed anytime", "Only rich people can access law"],
            correct: 1,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 66,
            question: "Which is the most important feature of a democracy?",
            options: ["Elections", "Political parties", "Rule of law", "All of these"],
            correct: 3,
            year: "2024",
            chapter: "Political Science - What is Democracy? Why Democracy?"
        },
        {
            id: 67,
            question: "The Jallianwala Bagh massacre took place in:",
            options: ["1917", "1918", "1919", "1920"],
            correct: 2,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 68,
            question: "Which is the largest producer of rice in India?",
            options: ["Punjab", "Haryana", "West Bengal", "Uttar Pradesh"],
            correct: 2,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 69,
            question: "The Right to Information Act was passed in:",
            options: ["2003", "2004", "2005", "2006"],
            correct: 2,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 70,
            question: "Which is the main source of irrigation in India?",
            options: ["Canals", "Wells and tubewells", "Tanks", "Rivers"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Water Resources"
        },
        {
            id: 71,
            question: "The Champaran Satyagraha was led by:",
            options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Subhash Chandra Bose"],
            correct: 0,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 72,
            question: "Which mineral is known as 'black gold'?",
            options: ["Coal", "Petroleum", "Iron ore", "Gold"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Minerals and Energy Resources"
        },
        {
            id: 73,
            question: "The concept of 'Separation of Powers' was given by:",
            options: ["Rousseau", "Montesquieu", "Locke", "Hobbes"],
            correct: 1,
            year: "2025",
            chapter: "Political Science - Working of Institutions"
        },
        {
            id: 74,
            question: "Which is the longest river in India?",
            options: ["Ganga", "Godavari", "Yamuna", "Narmada"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Drainage"
        },
        {
            id: 75,
            question: "The Quit India Movement was launched in:",
            options: ["1940", "1941", "1942", "1943"],
            correct: 2,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 76,
            question: "Which type of agriculture is practiced in areas with high population pressure?",
            options: ["Extensive farming", "Intensive farming", "Plantation farming", "Commercial farming"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 77,
            question: "The 'Right to Equality' is mentioned in which article of the Indian Constitution?",
            options: ["Article 14", "Article 15", "Article 16", "All of these"],
            correct: 3,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 78,
            question: "Which is the largest state of India by population?",
            options: ["Maharashtra", "Bihar", "Uttar Pradesh", "West Bengal"],
            correct: 2,
            year: "2024",
            chapter: "Geography - Population"
        },
        {
            id: 79,
            question: "The Simon Commission was appointed in:",
            options: ["1925", "1927", "1929", "1931"],
            correct: 1,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 80,
            question: "Which is the main cereal crop of India?",
            options: ["Wheat", "Rice", "Maize", "Millets"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 81,
            question: "The 'Right to Freedom' includes:",
            options: ["Freedom of speech", "Freedom of assembly", "Freedom of movement", "All of these"],
            correct: 3,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 82,
            question: "Which is the highest peak in India?",
            options: ["Mount Everest", "Kanchenjunga", "Nanda Devi", "Kamet"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Physical Features of India"
        },
        {
            id: 83,
            question: "The Round Table Conferences were held in:",
            options: ["1928-1930", "1930-1932", "1932-1934", "1934-1936"],
            correct: 1,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 84,
            question: "Which is the most important factor for the location of industries?",
            options: ["Raw material", "Labour", "Transport", "All of these"],
            correct: 3,
            year: "2024",
            chapter: "Geography - Manufacturing Industries"
        },
        {
            id: 85,
            question: "The 'Right against Exploitation' prohibits:",
            options: ["Child labour", "Trafficking", "Forced labour", "All of these"],
            correct: 3,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 86,
            question: "Which is the largest producer of cotton in India?",
            options: ["Gujarat", "Maharashtra", "Punjab", "Haryana"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 87,
            question: "The Partition of Bengal took place in:",
            options: ["1903", "1904", "1905", "1906"],
            correct: 2,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 88,
            question: "Which is the most important mode of transport in India?",
            options: ["Railways", "Roadways", "Waterways", "Airways"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Lifelines of National Economy"
        },
        {
            id: 89,
            question: "The 'Right to Constitutional Remedies' is mentioned in:",
            options: ["Article 32", "Article 33", "Article 34", "Article 35"],
            correct: 0,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 90,
            question: "Which is the largest producer of sugarcane in India?",
            options: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 91,
            question: "The Swadeshi Movement was launched in:",
            options: ["1903", "1904", "1905", "1906"],
            correct: 2,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 92,
            question: "Which is the most important port on the west coast of India?",
            options: ["Kolkata", "Mumbai", "Chennai", "Vishakhapatnam"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Lifelines of National Economy"
        },
        {
            id: 93,
            question: "The 'Right to Education' was added to the Constitution in:",
            options: ["2000", "2002", "2004", "2006"],
            correct: 1,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 94,
            question: "Which is the largest producer of tea in India?",
            options: ["Assam", "West Bengal", "Kerala", "Tamil Nadu"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 95,
            question: "The Khilafat Movement was launched in:",
            options: ["1917", "1918", "1919", "1920"],
            correct: 3,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 96,
            question: "Which is the most important factor for the development of agriculture?",
            options: ["Climate", "Soil", "Technology", "All of these"],
            correct: 3,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 97,
            question: "The 'Right to Freedom of Religion' is mentioned in:",
            options: ["Article 25", "Article 26", "Article 27", "All of these"],
            correct: 3,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 98,
            question: "Which is the largest producer of jute in India?",
            options: ["West Bengal", "Bihar", "Assam", "Orissa"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 99,
            question: "The Bardoli Satyagraha was led by:",
            options: ["Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Subhash Chandra Bose"],
            correct: 1,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 100,
            question: "Which is the most important feature of Indian agriculture?",
            options: ["Subsistence farming", "Commercial farming", "Plantation farming", "Mixed farming"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Agriculture"
        }
    ],
    sanskrit: [
        {
            id: 1,
            question: "कः सन्धिः 'रामः + अयोध्याम्' इत्यत्र भवति?",
            options: ["दीर्घ सन्धिः", "गुण सन्धिः", "वृद्धि सन्धिः", "यण् सन्धिः"],
            correct: 0,
            year: "2025",
            chapter: "सन्धिः (Sandhi)"
        },
        {
            id: 2,
            question: "'रामः + इन्द्रः' इत्यत्र कः सन्धिः?",
            options: ["रामेन्द्रः", "राम इन्द्रः", "रामयिन्द्रः", "रामेन्द्रः"],
            correct: 0,
            year: "2025",
            chapter: "सन्धिः (Sandhi)"
        },
        {
            id: 3,
            question: "'देव + आलयः' इत्यत्र सन्धिविच्छेदः कः?",
            options: ["देव + आलयः", "देवा + लयः", "देवः + आलयः", "देव + लयः"],
            correct: 0,
            year: "2024",
            chapter: "सन्धिः (Sandhi)"
        },
        {
            id: 4,
            question: "'राजा + ऋषिः' इत्यत्र कः सन्धिः?",
            options: ["राजर्षिः", "राज ऋषिः", "राजार्षिः", "राजर्षिः"],
            correct: 0,
            year: "2024",
            chapter: "सन्धिः (Sandhi)"
        },
        {
            id: 5,
            question: "'पुस्तकालयः' इत्यस्य समासविग्रहः कः?",
            options: ["पुस्तकस्य आलयः", "पुस्तकं आलयः", "पुस्तक आलयः", "पुस्तकाय आलयः"],
            correct: 0,
            year: "2025",
            chapter: "समासः (Samas)"
        },
        {
            id: 6,
            question: "'रामकृष्णः' इत्यस्य समासः कः?",
            options: ["द्वन्द्व समासः", "तत्पुरुष समासः", "बहुव्रीहि समासः", "कर्मधारय समासः"],
            correct: 0,
            year: "2025",
            chapter: "समासः (Samas)"
        },
        {
            id: 7,
            question: "'पीताम्बरः' इत्यस्य समासः कः?",
            options: ["द्वन्द्व समासः", "तत्पुरुष समासः", "बहुव्रीहि समासः", "कर्मधारय समासः"],
            correct: 2,
            year: "2024",
            chapter: "समासः (Samas)"
        },
        {
            id: 8,
            question: "'नीलोत्पलम्' इत्यस्य समासः कः?",
            options: ["द्वन्द्व समासः", "तत्पुरुष समासः", "बहुव्रीहि समासः", "कर्मधारय समासः"],
            correct: 3,
            year: "2024",
            chapter: "समासः (Samas)"
        },
        {
            id: 9,
            question: "'रामः वनं गच्छति' इत्यत्र 'वनं' इत्यस्य कारकं किम्?",
            options: ["कर्ता", "कर्म", "करण", "अपादान"],
            correct: 1,
            year: "2025",
            chapter: "कारक (Karak)"
        },
        {
            id: 10,
            question: "'रामः बाणेन मारीचं हन्ति' इत्यत्र 'बाणेन' इत्यस्य कारकं किम्?",
            options: ["कर्ता", "कर्म", "करण", "अपादान"],
            correct: 2,
            year: "2025",
            chapter: "कारक (Karak)"
        },
        {
            id: 11,
            question: "'रामः लक्ष्मणात् बलवान्' इत्यत्र 'लक्ष्मणात्' इत्यस्य कारकं किम्?",
            options: ["कर्ता", "कर्म", "करण", "अपादान"],
            correct: 3,
            year: "2024",
            chapter: "कारक (Karak)"
        },
        {
            id: 12,
            question: "'रामः सीतायै पुष्पं ददाति' इत्यत्र 'सीतायै' इत्यस्य कारकं किम्?",
            options: ["कर्ता", "कर्म", "सम्प्रदान", "अधिकरण"],
            correct: 2,
            year: "2024",
            chapter: "कारक (Karak)"
        },
        {
            id: 13,
            question: "'गम्' धातोः लट् लकारे प्रथमपुरुष एकवचने रूपं किम्?",
            options: ["गच्छति", "गच्छसि", "गच्छामि", "गच्छन्ति"],
            correct: 0,
            year: "2025",
            chapter: "धातु रूप (Dhatu Rupa)"
        },
        {
            id: 14,
            question: "'पठ्' धातोः लट् लकारे मध्यमपुरुष बहुवचने रूपं किम्?",
            options: ["पठति", "पठसि", "पठथः", "पठथ"],
            correct: 3,
            year: "2025",
            chapter: "धातु रूप (Dhatu Rupa)"
        },
        {
            id: 15,
            question: "'लिख्' धातोः लङ् लकारे प्रथमपुरुष एकवचने रूपं किम्?",
            options: ["लिखति", "लिखति स्म", "अलिखत्", "लिखेत्"],
            correct: 2,
            year: "2024",
            chapter: "धातु रूप (Dhatu Rupa)"
        },
        {
            id: 16,
            question: "'राम' शब्दस्य द्वितीया विभक्तिः एकवचने किम्?",
            options: ["रामः", "रामम्", "रामेण", "रामाय"],
            correct: 1,
            year: "2025",
            chapter: "विभक्तिः (Vibhakti)"
        },
        {
            id: 17,
            question: "'बालक' शब्दस्य तृतीया विभक्तिः बहुवचने किम्?",
            options: ["बालकैः", "बालकान्", "बालकेषु", "बालकानाम्"],
            correct: 0,
            year: "2025",
            chapter: "विभक्तिः (Vibhakti)"
        },
        {
            id: 18,
            question: "'गुरु' शब्दस्य षष्ठी विभक्तिः एकवचने किम्?",
            options: ["गुरोः", "गुरुः", "गुरुम्", "गुरुणा"],
            correct: 0,
            year: "2024",
            chapter: "विभक्तिः (Vibhakti)"
        },
        {
            id: 19,
            question: "'पुस्तक' शब्दस्य सप्तमी विभक्तिः बहुवचने किम्?",
            options: ["पुस्तकेषु", "पुस्तकानि", "पुस्तकैः", "पुस्तकानाम्"],
            correct: 0,
            year: "2024",
            chapter: "विभक्तिः (Vibhakti)"
        },
        {
            id: 20,
            question: "'सः' सर्वनामशब्दस्य प्रथमा विभक्तिः बहुवचने किम्?",
            options: ["ते", "तान्", "तैः", "तेषाम्"],
            correct: 0,
            year: "2025",
            chapter: "सर्वनाम (Sarvanama)"
        },
        {
            id: 21,
            question: "'यः' सर्वनामशब्दस्य द्वितीया विभक्तिः एकवचने किम्?",
            options: ["यः", "यम्", "येन", "यस्मै"],
            correct: 1,
            year: "2025",
            chapter: "सर्वनाम (Sarvanama)"
        },
        {
            id: 22,
            question: "'किम्' सर्वनामशब्दस्य तृतीया विभक्तिः एकवचने किम्?",
            options: ["कः", "किम्", "केन", "कस्मै"],
            correct: 2,
            year: "2024",
            chapter: "सर्वनाम (Sarvanama)"
        },
        {
            id: 23,
            question: "'अस्मद्' सर्वनामशब्दस्य प्रथमा विभक्तिः एकवचने किम्?",
            options: ["अहम्", "त्वम्", "यूयम्", "वयम्"],
            correct: 0,
            year: "2024",
            chapter: "सर्वनाम (Sarvanama)"
        },
        {
            id: 24,
            question: "'प्रसन्नः' इत्यस्य विपरीतार्थकशब्दः कः?",
            options: ["सन्तुष्टः", "दुःखितः", "हर्षितः", "आनन्दितः"],
            correct: 1,
            year: "2025",
            chapter: "शब्दकोशः (Vocabulary)"
        },
        {
            id: 25,
            question: "'दयालुः' इत्यस्य समानार्थकशब्दः कः?",
            options: ["क्रूरः", "निर्दयः", "करुणः", "कठोरः"],
            correct: 2,
            year: "2025",
            chapter: "शब्दकोशः (Vocabulary)"
        },
        {
            id: 26,
            question: "'शीघ्रम्' इत्यस्य समानार्थकशब्दः कः?",
            options: ["मन्दम्", "विलम्बेन", "त्वरितम्", "स्थिरम्"],
            correct: 2,
            year: "2024",
            chapter: "शब्दकोशः (Vocabulary)"
        },
        {
            id: 27,
            question: "'सत्यम्' इत्यस्य विपरीतार्थकशब्दः कः?",
            options: ["असत्यम्", "यथार्थम्", "वास्तविकम्", "प्रामाणिकम्"],
            correct: 0,
            year: "2024",
            chapter: "शब्दकोशः (Vocabulary)"
        },
        {
            id: 28,
            question: "'रामायणम्' इत्यस्य लेखकः कः?",
            options: ["वाल्मीकिः", "व्यासः", "कालिदासः", "भासः"],
            correct: 0,
            year: "2025",
            chapter: "साहित्य (Literature)"
        },
        {
            id: 29,
            question: "'महाभारतम्' इत्यस्य लेखकः कः?",
            options: ["वाल्मीकिः", "व्यासः", "कालिदासः", "भासः"],
            correct: 1,
            year: "2025",
            chapter: "साहित्य (Literature)"
        },
        {
            id: 30,
            question: "'अभिज्ञानशाकुन्तलम्' इत्यस्य लेखकः कः?",
            options: ["वाल्मीकिः", "व्यासः", "कालिदासः", "भासः"],
            correct: 2,
            year: "2024",
            chapter: "साहित्य (Literature)"
        },
        {
            id: 31,
            question: "'शकुन्तला' नाटके राजा कः?",
            options: ["रामः", "युधिष्ठिरः", "दुष्यन्तः", "अर्जुनः"],
            correct: 2,
            year: "2024",
            chapter: "साहित्य (Literature)"
        },
        {
            id: 32,
            question: "'रामः वनं गच्छति' इत्यस्य अंग्रेजी अनुवादः कः?",
            options: ["Rama goes to forest", "Rama comes from forest", "Rama lives in forest", "Rama returns from forest"],
            correct: 0,
            year: "2025",
            chapter: "अनुवाद (Translation)"
        },
        {
            id: 33,
            question: "'The teacher teaches students' इत्यस्य संस्कृत अनुवादः कः?",
            options: ["शिक्षकः छात्रान् पाठयति", "शिक्षकः छात्रैः पठति", "शिक्षकः छात्राय पुस्तकं ददाति", "शिक्षकः छात्रस्य गृहं गच्छति"],
            correct: 0,
            year: "2025",
            chapter: "अनुवाद (Translation)"
        },
        {
            id: 34,
            question: "'सः पुस्तकं पठति' इत्यस्य अंग्रेजी अनुवादः कः?",
            options: ["He reads a book", "He writes a book", "He gives a book", "He buys a book"],
            correct: 0,
            year: "2024",
            chapter: "अनुवाद (Translation)"
        },
        {
            id: 35,
            question: "'I go to school' इत्यस्य संस्कृत अनुवादः कः?",
            options: ["अहं विद्यालयं गच्छामि", "अहं विद्यालयात् आगच्छामि", "अहं विद्यालये पठामि", "अहं विद्यालयं पश्यामि"],
            correct: 0,
            year: "2024",
            chapter: "अनुवाद (Translation)"
        },
        {
            id: 36,
            question: "'रामः सीतां प्रेम करोति' इत्यत्र 'सीतां' इत्यस्य कारकं किम्?",
            options: ["कर्ता", "कर्म", "करण", "सम्प्रदान"],
            correct: 1,
            year: "2025",
            chapter: "कारक (Karak)"
        },
        {
            id: 37,
            question: "'बालकः पुस्तकं पठति' इत्यत्र 'पुस्तकं' इत्यस्य कारकं किम्?",
            options: ["कर्ता", "कर्म", "करण", "अपादान"],
            correct: 1,
            year: "2025",
            chapter: "कारक (Karak)"
        },
        {
            id: 38,
            question: "'गङ्गा हिमालयात् निर्गच्छति' इत्यत्र 'हिमालयात्' इत्यस्य कारकं किम्?",
            options: ["कर्ता", "कर्म", "करण", "अपादान"],
            correct: 3,
            year: "2025",
            chapter: "कारक (Karak)"
        },
        {
            id: 39,
            question: "'रामः अयोध्यायां वसति' इत्यत्र 'अयोध्यायां' इत्यस्य कारकं किम्?",
            options: ["कर्ता", "कर्म", "सम्प्रदान", "अधिकरण"],
            correct: 3,
            year: "2025",
            chapter: "कारक (Karak)"
        },
        {
            id: 40,
            question: "'रामः लक्ष्मणेन सह वनं गच्छति' इत्यत्र 'लक्ष्मणेन' इत्यस्य कारकं किम्?",
            options: ["कर्ता", "कर्म", "सहाय", "अधिकरण"],
            correct: 2,
            year: "2025",
            chapter: "कारक (Karak)"
        },
        {
            id: 41,
            question: "'भवत्' शब्दस्य प्रथमा विभक्तिः बहुवचने किम्?",
            options: ["भवन्तः", "भवतः", "भवन्ति", "भवद्भ्यः"],
            correct: 0,
            year: "2025",
            chapter: "विभक्तिः (Vibhakti)"
        },
        {
            id: 42,
            question: "'तत्' शब्दस्य द्वितीया विभक्तिः बहुवचने किम्?",
            options: ["तानि", "तेषाम्", "तैः", "तेषु"],
            correct: 0,
            year: "2025",
            chapter: "विभक्तिः (Vibhakti)"
        },
        {
            id: 43,
            question: "'एतत्' शब्दस्य तृतीया विभक्तिः एकवचने किम्?",
            options: ["एतेन", "एतस्य", "एतस्मै", "एतस्मिन्"],
            correct: 0,
            year: "2024",
            chapter: "विभक्तिः (Vibhakti)"
        },
        {
            id: 44,
            question: "'किम्' सर्वनामशब्दस्य षष्ठी विभक्तिः एकवचने किम्?",
            options: ["कस्य", "कस्मै", "केन", "कस्मिन्"],
            correct: 0,
            year: "2024",
            chapter: "सर्वनाम (Sarvanama)"
        },
        {
            id: 45,
            question: "'अस्मद्' सर्वनामशब्दस्य द्वितीया विभक्तिः बहुवचने किम्?",
            options: ["अस्मान्", "अस्माकम्", "अस्माभिः", "अस्मासु"],
            correct: 0,
            year: "2024",
            chapter: "सर्वनाम (Sarvanama)"
        },
        {
            id: 46,
            question: "'दा' धातोः लट् लकारे उत्तमपुरुष एकवचने रूपं किम्?",
            options: ["ददाति", "ददासि", "ददामि", "ददथः"],
            correct: 2,
            year: "2025",
            chapter: "धातु रूप (Dhatu Rupa)"
        },
        {
            id: 47,
            question: "'भू' धातोः लृट् लकारे प्रथमपुरुष एकवचने रूपं किम्?",
            options: ["भवति", "भविष्यति", "भवेत्", "भवतु"],
            correct: 1,
            year: "2025",
            chapter: "धातु रूप (Dhatu Rupa)"
        },
        {
            id: 48,
            question: "'कृ' धातोः लोट् लकारे मध्यमपुरुष एकवचने रूपं किम्?",
            options: ["करोति", "कुरु", "करोतु", "कुरुत"],
            correct: 1,
            year: "2024",
            chapter: "धातु रूप (Dhatu Rupa)"
        },
        {
            id: 49,
            question: "'राजपुत्रः' इत्यस्य समासविग्रहः कः?",
            options: ["राज्ञः पुत्रः", "राजा पुत्रः", "राजाय पुत्रः", "राजेन पुत्रः"],
            correct: 0,
            year: "2024",
            chapter: "समासः (Samas)"
        },
        {
            id: 50,
            question: "'चतुर्भुजः' इत्यस्य समासः कः?",
            options: ["द्वन्द्व समासः", "तत्पुरुष समासः", "बहुव्रीहि समासः", "कर्मधारय समासः"],
            correct: 2,
            year: "2024",
            chapter: "समासः (Samas)"
        },
        {
            id: 51,
            question: "Which event marked the beginning of the First World War in 1914?",
            options: ["Assassination of Archduke Franz Ferdinand", "Russian Revolution", "Treaty of Versailles", "Battle of Marne"],
            correct: 0,
            year: "2025",
            chapter: "History - The Making of a Global World"
        },
        {
            id: 52,
            question: "Who was known as the 'Iron Man of India'?",
            options: ["Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Subhash Chandra Bose"],
            correct: 1,
            year: "2024",
            chapter: "History - Nationalism in India"
        },
        {
            id: 53,
            question: "The Rowlatt Act was passed in which year?",
            options: ["1917", "1918", "1919", "1920"],
            correct: 2,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 54,
            question: "Which river is known as the 'Sorrow of Bengal'?",
            options: ["Ganga", "Yamuna", "Damodar", "Hooghly"],
            correct: 2,
            year: "2024",
            chapter: "Geography - Water Resources"
        },
        {
            id: 55,
            question: "The Tropic of Cancer passes through how many Indian states?",
            options: ["6", "7", "8", "9"],
            correct: 2,
            year: "2025",
            chapter: "Geography - India: Size and Location"
        },
        {
            id: 56,
            question: "Which type of soil is best suited for cotton cultivation?",
            options: ["Alluvial soil", "Black soil", "Red soil", "Laterite soil"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Resources and Development"
        },
        {
            id: 57,
            question: "What is the main source of power in India?",
            options: ["Thermal power", "Hydroelectric power", "Nuclear power", "Solar power"],
            correct: 0,
            year: "2025",
            chapter: "Geography - Minerals and Energy Resources"
        },
        {
            id: 58,
            question: "Which is the largest state of India by area?",
            options: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttar Pradesh"],
            correct: 2,
            year: "2024",
            chapter: "Geography - India: Size and Location"
        },
        {
            id: 59,
            question: "The Indian Constitution came into effect on:",
            options: ["26 January 1947", "26 January 1948", "26 January 1949", "26 January 1950"],
            correct: 3,
            year: "2025",
            chapter: "Political Science - Power Sharing"
        },
        {
            id: 60,
            question: "Who is known as the 'Father of the Indian Constitution'?",
            options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Dr. B.R. Ambedkar", "Sardar Patel"],
            correct: 2,
            year: "2024",
            chapter: "Political Science - Federalism"
        },
        {
            id: 61,
            question: "The Non-Cooperation Movement was launched in:",
            options: ["1919", "1920", "1921", "1922"],
            correct: 1,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 62,
            question: "Which is the largest river basin in India?",
            options: ["Ganga", "Godavari", "Krishna", "Narmada"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Water Resources"
        },
        {
            id: 63,
            question: "The Dandi March was associated with:",
            options: ["Quit India Movement", "Non-Cooperation Movement", "Civil Disobedience Movement", "Swadeshi Movement"],
            correct: 2,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 64,
            question: "Which type of forest is found in the Western Ghats?",
            options: ["Tropical Evergreen", "Tropical Deciduous", "Thorn", "Mangrove"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Forest and Wildlife Resources"
        },
        {
            id: 65,
            question: "The concept of 'Rule of Law' means:",
            options: ["Laws are made by the government", "Everyone is equal before the law", "Laws can be changed anytime", "Only rich people can access law"],
            correct: 1,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 66,
            question: "Which is the most important feature of a democracy?",
            options: ["Elections", "Political parties", "Rule of law", "All of these"],
            correct: 3,
            year: "2024",
            chapter: "Political Science - What is Democracy? Why Democracy?"
        },
        {
            id: 67,
            question: "The Jallianwala Bagh massacre took place in:",
            options: ["1917", "1918", "1919", "1920"],
            correct: 2,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 68,
            question: "Which is the largest producer of rice in India?",
            options: ["Punjab", "Haryana", "West Bengal", "Uttar Pradesh"],
            correct: 2,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 69,
            question: "The Right to Information Act was passed in:",
            options: ["2003", "2004", "2005", "2006"],
            correct: 2,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 70,
            question: "Which is the main source of irrigation in India?",
            options: ["Canals", "Wells and tubewells", "Tanks", "Rivers"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Water Resources"
        },
        {
            id: 71,
            question: "The Champaran Satyagraha was led by:",
            options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Subhash Chandra Bose"],
            correct: 0,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 72,
            question: "Which mineral is known as 'black gold'?",
            options: ["Coal", "Petroleum", "Iron ore", "Gold"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Minerals and Energy Resources"
        },
        {
            id: 73,
            question: "The concept of 'Separation of Powers' was given by:",
            options: ["Rousseau", "Montesquieu", "Locke", "Hobbes"],
            correct: 1,
            year: "2025",
            chapter: "Political Science - Working of Institutions"
        },
        {
            id: 74,
            question: "Which is the longest river in India?",
            options: ["Ganga", "Godavari", "Yamuna", "Narmada"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Drainage"
        },
        {
            id: 75,
            question: "The Quit India Movement was launched in:",
            options: ["1940", "1941", "1942", "1943"],
            correct: 2,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 76,
            question: "Which type of agriculture is practiced in areas with high population pressure?",
            options: ["Extensive farming", "Intensive farming", "Plantation farming", "Commercial farming"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 77,
            question: "The 'Right to Equality' is mentioned in which article of the Indian Constitution?",
            options: ["Article 14", "Article 15", "Article 16", "All of these"],
            correct: 3,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 78,
            question: "Which is the largest state of India by population?",
            options: ["Maharashtra", "Bihar", "Uttar Pradesh", "West Bengal"],
            correct: 2,
            year: "2024",
            chapter: "Geography - Population"
        },
        {
            id: 79,
            question: "The Simon Commission was appointed in:",
            options: ["1925", "1927", "1929", "1931"],
            correct: 1,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 80,
            question: "Which is the main cereal crop of India?",
            options: ["Wheat", "Rice", "Maize", "Millets"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 81,
            question: "The 'Right to Freedom' includes:",
            options: ["Freedom of speech", "Freedom of assembly", "Freedom of movement", "All of these"],
            correct: 3,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 82,
            question: "Which is the highest peak in India?",
            options: ["Mount Everest", "Kanchenjunga", "Nanda Devi", "Kamet"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Physical Features of India"
        },
        {
            id: 83,
            question: "The Round Table Conferences were held in:",
            options: ["1928-1930", "1930-1932", "1932-1934", "1934-1936"],
            correct: 1,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 84,
            question: "Which is the most important factor for the location of industries?",
            options: ["Raw material", "Labour", "Transport", "All of these"],
            correct: 3,
            year: "2024",
            chapter: "Geography - Manufacturing Industries"
        },
        {
            id: 85,
            question: "The 'Right against Exploitation' prohibits:",
            options: ["Child labour", "Trafficking", "Forced labour", "All of these"],
            correct: 3,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 86,
            question: "Which is the largest producer of cotton in India?",
            options: ["Gujarat", "Maharashtra", "Punjab", "Haryana"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 87,
            question: "The Partition of Bengal took place in:",
            options: ["1903", "1904", "1905", "1906"],
            correct: 2,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 88,
            question: "Which is the most important mode of transport in India?",
            options: ["Railways", "Roadways", "Waterways", "Airways"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Lifelines of National Economy"
        },
        {
            id: 89,
            question: "The 'Right to Constitutional Remedies' is mentioned in:",
            options: ["Article 32", "Article 33", "Article 34", "Article 35"],
            correct: 0,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 90,
            question: "Which is the largest producer of sugarcane in India?",
            options: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 91,
            question: "The Swadeshi Movement was launched in:",
            options: ["1903", "1904", "1905", "1906"],
            correct: 2,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 92,
            question: "Which is the most important port on the west coast of India?",
            options: ["Kolkata", "Mumbai", "Chennai", "Vishakhapatnam"],
            correct: 1,
            year: "2024",
            chapter: "Geography - Lifelines of National Economy"
        },
        {
            id: 93,
            question: "The 'Right to Education' was added to the Constitution in:",
            options: ["2000", "2002", "2004", "2006"],
            correct: 1,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 94,
            question: "Which is the largest producer of tea in India?",
            options: ["Assam", "West Bengal", "Kerala", "Tamil Nadu"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 95,
            question: "The Khilafat Movement was launched in:",
            options: ["1917", "1918", "1919", "1920"],
            correct: 3,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 96,
            question: "Which is the most important factor for the development of agriculture?",
            options: ["Climate", "Soil", "Technology", "All of these"],
            correct: 3,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 97,
            question: "The 'Right to Freedom of Religion' is mentioned in:",
            options: ["Article 25", "Article 26", "Article 27", "All of these"],
            correct: 3,
            year: "2025",
            chapter: "Political Science - Democratic Rights"
        },
        {
            id: 98,
            question: "Which is the largest producer of jute in India?",
            options: ["West Bengal", "Bihar", "Assam", "Orissa"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Agriculture"
        },
        {
            id: 99,
            question: "The Bardoli Satyagraha was led by:",
            options: ["Mahatma Gandhi", "Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Subhash Chandra Bose"],
            correct: 1,
            year: "2025",
            chapter: "History - Nationalism in India"
        },
        {
            id: 100,
            question: "Which is the most important feature of Indian agriculture?",
            options: ["Subsistence farming", "Commercial farming", "Plantation farming", "Mixed farming"],
            correct: 0,
            year: "2024",
            chapter: "Geography - Agriculture"
        }
    ]
};

// Combine all questions from all subjects (2024-2025)
const allQuestions = [
    ...questions.mathematics.filter(q => parseInt(q.year) >= 2024 && parseInt(q.year) <= 2025).map(q => ({...q, subject: 'Mathematics'})),
    ...questions.physics.filter(q => parseInt(q.year) >= 2024 && parseInt(q.year) <= 2025).map(q => ({...q, subject: 'Physics'})),
    ...questions.chemistry.filter(q => parseInt(q.year) >= 2024 && parseInt(q.year) <= 2025).map(q => ({...q, subject: 'Chemistry'})),
    ...questions.biology.filter(q => parseInt(q.year) >= 2024 && parseInt(q.year) <= 2025).map(q => ({...q, subject: 'Biology'})),
    ...questions.socialScience.filter(q => parseInt(q.year) >= 2024 && parseInt(q.year) <= 2025).map(q => ({...q, subject: 'Social Science'})),
    ...questions.sanskrit.filter(q => parseInt(q.year) >= 2024 && parseInt(q.year) <= 2025).map(q => ({...q, subject: 'Sanskrit'}))
];
