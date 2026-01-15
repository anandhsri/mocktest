// Mathematics Test - 80 Marks
// Questions with diagrams removed
// Distribution: 10×1 mark, 15×2 marks, 10×3 marks, 2×5 marks = 80 marks

const mathematics80Marks = {
    testInfo: {
        title: "CBSE Class 10 Mathematics - 80 Marks Test",
        totalMarks: 80,
        duration: "180 minutes (3 hours)",
        instructions: [
            "Answer all questions.",
            "Questions carry different marks: 1, 2, 3, and 5 marks.",
            "Show all calculations clearly.",
            "Use appropriate units in your answers."
        ],
        year: "2020-2025 Pattern",
        markingScheme: {
            "1 mark": 10,
            "2 marks": 15,
            "3 marks": 10,
            "5 marks": 2
        }
    },
    questions: [
        // 1 Mark Questions (10 questions = 10 marks)
        {
            id: 1,
            marks: 1,
            question: "Find the LCM and HCF of 336 and 54 by prime factorization. If LCM = 3024, what is the HCF?",
            options: ["12", "18", "24", "36"],
            correct: 1,
            year: "2022",
            chapter: "Real Numbers"
        },
        {
            id: 2,
            marks: 1,
            question: "If sin θ + cos θ = √2 cos(90° - θ), find cot θ.",
            options: ["√2 - 1", "√2 + 1", "1/(√2 - 1)", "1/(√2 + 1)"],
            correct: 0,
            year: "2023",
            chapter: "Introduction to Trigonometry"
        },
        {
            id: 3,
            marks: 1,
            question: "Find the ratio in which the point P(3, 4) divides the line segment joining the points A(1, 2) and B(6, 7).",
            options: ["2:3", "3:2", "1:2", "2:1"],
            correct: 0,
            year: "2023",
            chapter: "Coordinate Geometry"
        },
        {
            id: 4,
            marks: 1,
            question: "A card is drawn at random from a well-shuffled deck of 52 cards. Find the probability of getting neither a red card nor a queen.",
            options: ["6/13", "7/13", "8/13", "9/13"],
            correct: 0,
            year: "2023",
            chapter: "Probability"
        },
        {
            id: 5,
            marks: 1,
            question: "Two dice are thrown together. Find the probability that the product of the numbers on the top of the dice is 6.",
            options: ["1/9", "2/9", "1/6", "1/12"],
            correct: 0,
            year: "2024",
            chapter: "Probability"
        },
        {
            id: 6,
            marks: 1,
            question: "Find a quadratic polynomial, the sum and product of whose zeroes are √2 and 1/3 respectively.",
            options: ["3x² - 3√2x + 1", "3x² + 3√2x + 1", "3x² - 3√2x - 1", "3x² + 3√2x - 1"],
            correct: 0,
            year: "2025",
            chapter: "Polynomials"
        },
        {
            id: 7,
            marks: 1,
            question: "A die is thrown twice. What is the probability that 5 will come up at least once?",
            options: ["11/36", "25/36", "1/36", "5/36"],
            correct: 0,
            year: "2025",
            chapter: "Probability"
        },
        {
            id: 8,
            marks: 1,
            question: "Find the area of the triangle whose vertices are (1, 2), (3, 4) and (5, 6).",
            options: ["0 sq units", "1 sq unit", "2 sq units", "3 sq units"],
            correct: 0,
            year: "2025",
            chapter: "Coordinate Geometry"
        },
        {
            id: 9,
            marks: 1,
            question: "If tan(A + B) = √3 and tan(A - B) = 1/√3, where 0° < A + B ≤ 90° and A > B, find A and B.",
            options: ["A = 45°, B = 15°", "A = 60°, B = 30°", "A = 30°, B = 15°", "A = 45°, B = 30°"],
            correct: 0,
            year: "2023",
            chapter: "Introduction to Trigonometry"
        },
        {
            id: 10,
            marks: 1,
            question: "If sin(A + B) = 1 and cos(A - B) = √3/2, where 0° < A + B ≤ 90° and A > B, find A and B.",
            options: ["A = 60°, B = 30°", "A = 45°, B = 45°", "A = 30°, B = 60°", "A = 75°, B = 15°"],
            correct: 0,
            year: "2025",
            chapter: "Introduction to Trigonometry"
        },
        
        // 2 Marks Questions (15 questions = 30 marks)
        {
            id: 11,
            marks: 2,
            question: "Prove that 3 + 2√5 is irrational. If √5 = p/q where p and q are coprime integers, which statement leads to a contradiction?",
            options: ["p and q are both divisible by 5", "p is divisible by 5 but q is not", "q is divisible by 5 but p is not", "Neither p nor q is divisible by 5"],
            correct: 0,
            year: "2021",
            chapter: "Real Numbers"
        },
        {
            id: 12,
            marks: 2,
            question: "Solve the following pair of equations: 2/x + 3/y = 13 and 5/x - 4/y = -2, where x ≠ 0 and y ≠ 0.",
            options: ["x = 1/2, y = 1/3", "x = 1/3, y = 1/2", "x = 2, y = 3", "x = 3, y = 2"],
            correct: 0,
            year: "2021",
            chapter: "Pair of Linear Equations in Two Variables"
        },
        {
            id: 13,
            marks: 2,
            question: "The sum of the digits of a two-digit number is 9. Also, nine times this number is twice the number obtained by reversing the order of the digits. Find the number.",
            options: ["18", "27", "36", "45"],
            correct: 0,
            year: "2022",
            chapter: "Pair of Linear Equations in Two Variables"
        },
        {
            id: 14,
            marks: 2,
            question: "A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. Find the speed of the train.",
            options: ["40 km/h", "45 km/h", "50 km/h", "55 km/h"],
            correct: 1,
            year: "2023",
            chapter: "Quadratic Equations"
        },
        {
            id: 15,
            marks: 2,
            question: "The sum of the first n terms of an AP is 5n² + 3n. Find the nth term of the AP.",
            options: ["10n - 2", "10n + 2", "10n - 5", "10n + 5"],
            correct: 0,
            year: "2021",
            chapter: "Arithmetic Progressions"
        },
        {
            id: 16,
            marks: 2,
            question: "If the sum of first 7 terms of an AP is 49 and that of 17 terms is 289, find the sum of first n terms.",
            options: ["n²", "2n²", "3n²", "4n²"],
            correct: 0,
            year: "2022",
            chapter: "Arithmetic Progressions"
        },
        {
            id: 17,
            marks: 2,
            question: "Prove that (sin A - 2sin³A)/(2cos³A - cos A) = tan A. If A = 30°, find the value of this expression.",
            options: ["1/√3", "√3", "1", "0"],
            correct: 0,
            year: "2024",
            chapter: "Introduction to Trigonometry"
        },
        {
            id: 18,
            marks: 2,
            question: "The angle of elevation of the top of a building from the foot of the tower is 30° and the angle of elevation of the top of the tower from the foot of the building is 60°. If the tower is 50 m high, find the height of the building.",
            options: ["50/3 m", "50/√3 m", "50√3 m", "100/3 m"],
            correct: 0,
            year: "2021",
            chapter: "Some Applications of Trigonometry"
        },
        {
            id: 19,
            marks: 2,
            question: "Find the area of the triangle formed by joining the mid-points of the sides of the triangle whose vertices are (0, -1), (2, 1) and (0, 3).",
            options: ["1 sq unit", "2 sq units", "3 sq units", "4 sq units"],
            correct: 0,
            year: "2024",
            chapter: "Coordinate Geometry"
        },
        {
            id: 20,
            marks: 2,
            question: "In an equilateral triangle, prove that three times the square of one side is equal to four times the square of one of its altitudes. If the side is 6 cm, find the altitude.",
            options: ["3√3 cm", "4√3 cm", "5√3 cm", "6√3 cm"],
            correct: 0,
            year: "2021",
            chapter: "Triangles"
        },
        {
            id: 21,
            marks: 2,
            question: "In a right triangle ABC, right-angled at B, if AB = 5 cm and BC = 12 cm, find the length of the altitude from B to AC.",
            options: ["60/13 cm", "65/13 cm", "70/13 cm", "75/13 cm"],
            correct: 0,
            year: "2022",
            chapter: "Triangles"
        },
        {
            id: 22,
            marks: 2,
            question: "Prove that the lengths of tangents drawn from an external point to a circle are equal. If two tangents PA and PB are drawn from point P to a circle with centre O such that ∠APB = 60°, find ∠OAB.",
            options: ["30°", "45°", "60°", "90°"],
            correct: 0,
            year: "2023",
            chapter: "Circles"
        },
        {
            id: 23,
            marks: 2,
            question: "A solid is in the shape of a cone standing on a hemisphere with both their radii being equal to 1 cm and the height of the cone is equal to its radius. Find the volume of the solid in terms of π.",
            options: ["π cm³", "2π cm³", "3π cm³", "4π cm³"],
            correct: 0,
            year: "2021",
            chapter: "Surface Areas and Volumes"
        },
        {
            id: 24,
            marks: 2,
            question: "A chord of a circle of radius 10 cm subtends a right angle at the centre. Find the area of the corresponding minor segment. (Use π = 3.14)",
            options: ["28.5 cm²", "28.6 cm²", "28.7 cm²", "28.8 cm²"],
            correct: 0,
            year: "2024",
            chapter: "Areas Related to Circles"
        },
        {
            id: 25,
            marks: 2,
            question: "The following table shows the ages of the patients admitted in a hospital during a year. Find the mode and the mean of the data. Age (years): 5-15: 6, 15-25: 11, 25-35: 21, 35-45: 23, 45-55: 14, 55-65: 5. What is the mean age?",
            options: ["35.37 years", "36.37 years", "37.37 years", "38.37 years"],
            correct: 1,
            year: "2022",
            chapter: "Statistics"
        },
        
        // 3 Marks Questions (10 questions = 30 marks)
        {
            id: 26,
            marks: 3,
            question: "If the polynomial x⁴ - 6x³ + 16x² - 25x + 10 is divided by another polynomial x² - 2x + k, the remainder comes out to be x + a, find k and a.",
            options: ["k = 5, a = -5", "k = 5, a = 5", "k = -5, a = 5", "k = -5, a = -5"],
            correct: 0,
            year: "2023",
            chapter: "Polynomials"
        },
        {
            id: 27,
            marks: 3,
            question: "If α and β are the zeroes of the quadratic polynomial f(x) = x² - px + q, prove that α²/β² + β²/α² = (p⁴/q²) - (4p²/q) + 2. If p = 5 and q = 6, find this value.",
            options: ["97/36", "101/36", "105/36", "109/36"],
            correct: 0,
            year: "2024",
            chapter: "Polynomials"
        },
        {
            id: 28,
            marks: 3,
            question: "If the roots of the equation (a² + b²)x² - 2(ac + bd)x + (c² + d²) = 0 are equal, prove that a/b = c/d. If a = 3, b = 4, and c = 6, find d.",
            options: ["6", "7", "8", "9"],
            correct: 2,
            year: "2024",
            chapter: "Quadratic Equations"
        },
        {
            id: 29,
            marks: 3,
            question: "A straight highway leads to the foot of a tower. A man standing at the top of the tower observes a car at an angle of depression of 30°, which is approaching the foot of the tower with a uniform speed. Six seconds later, the angle of depression of the car is found to be 60°. Find the time taken by the car to reach the foot of the tower from this point.",
            options: ["3 seconds", "4 seconds", "5 seconds", "6 seconds"],
            correct: 0,
            year: "2022",
            chapter: "Some Applications of Trigonometry"
        },
        {
            id: 30,
            marks: 3,
            question: "From the top of a 7 m high building, the angle of elevation of the top of a cable tower is 60° and the angle of depression of its foot is 45°. Determine the height of the tower.",
            options: ["7(1 + √3) m", "7(2 + √3) m", "7(3 + √3) m", "7(1 + 2√3) m"],
            correct: 0,
            year: "2024",
            chapter: "Some Applications of Trigonometry"
        },
        {
            id: 31,
            marks: 3,
            question: "As observed from the top of a 75 m high lighthouse from the sea-level, the angles of depression of two ships are 30° and 45°. If one ship is exactly behind the other on the same side of the lighthouse, find the distance between the two ships.",
            options: ["75(√3 - 1) m", "75(√3 + 1) m", "75(2 - √3) m", "75(2 + √3) m"],
            correct: 0,
            year: "2020",
            chapter: "Some Applications of Trigonometry"
        },
        {
            id: 32,
            marks: 3,
            question: "Find the area of the quadrilateral whose vertices, taken in order, are (-4, -2), (-3, -5), (3, -2) and (2, 3).",
            options: ["28 sq units", "30 sq units", "32 sq units", "34 sq units"],
            correct: 0,
            year: "2021",
            chapter: "Coordinate Geometry"
        },
        {
            id: 33,
            marks: 3,
            question: "In triangle ABC, if D and E are points on sides AB and AC respectively such that AD = 4 cm, DB = 6 cm, AE = 5 cm, and DE || BC, find the length of EC.",
            options: ["7.5 cm", "8 cm", "8.5 cm", "9 cm"],
            correct: 0,
            year: "2020",
            chapter: "Triangles"
        },
        {
            id: 34,
            marks: 3,
            question: "Prove that the angle between the two tangents drawn from an external point to a circle is supplementary to the angle subtended by the line-segment joining the points of contact at the centre. If the angle between tangents is 120°, find the angle at the centre.",
            options: ["60°", "90°", "120°", "180°"],
            correct: 0,
            year: "2021",
            chapter: "Circles"
        },
        {
            id: 35,
            marks: 3,
            question: "A pen stand made of wood is in the shape of a cuboid with four conical depressions to hold pens. The dimensions of the cuboid are 15 cm × 10 cm × 3.5 cm. The radius of each of the depressions is 0.5 cm and the depth is 1.4 cm. Find the volume of wood in the entire stand.",
            options: ["523.6 cm³", "524.6 cm³", "525.6 cm³", "526.6 cm³"],
            correct: 0,
            year: "2022",
            chapter: "Surface Areas and Volumes"
        },
        
        // 5 Marks Questions (2 questions = 10 marks)
        {
            id: 36,
            marks: 5,
            question: "A solid iron pole consists of a cylinder of height 220 cm and base diameter 24 cm, which is surmounted by another cylinder of height 60 cm and radius 8 cm. Find the mass of the pole, given that 1 cm³ of iron has approximately 8 g mass.",
            options: ["892.8 kg", "895.2 kg", "897.6 kg", "900.0 kg"],
            correct: 0,
            year: "2022",
            chapter: "Surface Areas and Volumes"
        },
        {
            id: 37,
            marks: 5,
            question: "The following distribution gives the distribution of the life time of 400 neon lamps. Find the median life time of a lamp. Lifetime (hours): 1500-2000: 14, 2000-2500: 56, 2500-3000: 60, 3000-3500: 86, 3500-4000: 74, 4000-4500: 62, 4500-5000: 48",
            options: ["3136.8 hours", "3236.8 hours", "3336.8 hours", "3436.8 hours"],
            correct: 0,
            year: "2024",
            chapter: "Statistics"
        }
    ]
};

