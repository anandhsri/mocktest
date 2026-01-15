// Mathematics Test - 40 Marks (MCQ Based)
// Distribution: 5×1 mark, 5×2 marks, 5×3 marks, 2×5 marks = 40 marks (17 questions)

const mathematics40Marks = {
    testInfo: {
        title: "CBSE Class 10 Mathematics - 40 Marks MCQ Test",
        totalMarks: 40,
        duration: "90 minutes (1.5 hours)",
        instructions: [
            "Answer all questions.",
            "Questions carry different marks: 1, 2, 3, and 5 marks.",
            "Each question has 4 options. Select the correct answer.",
            "Marking: +marks for correct, -1/3 marks for incorrect.",
            "Show all calculations clearly where applicable."
        ],
        year: "2020-2025 Pattern",
        markingScheme: {
            "1 mark": 5,
            "2 marks": 5,
            "3 marks": 5,
            "5 marks": 2
        }
    },
    questions: [
        // 1 Mark Questions (5 questions = 5 marks)
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
        
        // 2 Marks Questions (5 questions = 10 marks)
        {
            id: 6,
            marks: 2,
            question: "Prove that 3 + 2√5 is irrational. If √5 = p/q where p and q are coprime integers, which statement leads to a contradiction?",
            options: ["p and q are both divisible by 5", "p is divisible by 5 but q is not", "q is divisible by 5 but p is not", "Neither p nor q is divisible by 5"],
            correct: 0,
            year: "2021",
            chapter: "Real Numbers"
        },
        {
            id: 7,
            marks: 2,
            question: "Solve the following pair of equations: 2/x + 3/y = 13 and 5/x - 4/y = -2, where x ≠ 0 and y ≠ 0.",
            options: ["x = 1/2, y = 1/3", "x = 1/3, y = 1/2", "x = 2, y = 3", "x = 3, y = 2"],
            correct: 0,
            year: "2021",
            chapter: "Pair of Linear Equations in Two Variables"
        },
        {
            id: 8,
            marks: 2,
            question: "The sum of the digits of a two-digit number is 9. Also, nine times this number is twice the number obtained by reversing the order of the digits. Find the number.",
            options: ["18", "27", "36", "45"],
            correct: 0,
            year: "2022",
            chapter: "Pair of Linear Equations in Two Variables"
        },
        {
            id: 9,
            marks: 2,
            question: "A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, it would have taken 1 hour less for the same journey. Find the speed of the train.",
            options: ["40 km/h", "45 km/h", "50 km/h", "55 km/h"],
            correct: 1,
            year: "2023",
            chapter: "Quadratic Equations"
        },
        {
            id: 10,
            marks: 2,
            question: "The sum of the first n terms of an AP is 5n² + 3n. Find the nth term of the AP.",
            options: ["10n - 2", "10n + 2", "10n - 5", "10n + 5"],
            correct: 0,
            year: "2021",
            chapter: "Arithmetic Progressions"
        },
        
        // 3 Marks Questions (5 questions = 15 marks)
        {
            id: 11,
            marks: 3,
            question: "If the polynomial x⁴ - 6x³ + 16x² - 25x + 10 is divided by another polynomial x² - 2x + k, the remainder comes out to be x + a, find k and a.",
            options: ["k = 5, a = -5", "k = 5, a = 5", "k = -5, a = 5", "k = -5, a = -5"],
            correct: 0,
            year: "2023",
            chapter: "Polynomials"
        },
        {
            id: 12,
            marks: 3,
            question: "If α and β are the zeroes of the quadratic polynomial f(x) = x² - px + q, prove that α²/β² + β²/α² = (p⁴/q²) - (4p²/q) + 2. If p = 5 and q = 6, find this value.",
            options: ["97/36", "101/36", "105/36", "109/36"],
            correct: 0,
            year: "2024",
            chapter: "Polynomials"
        },
        {
            id: 13,
            marks: 3,
            question: "If the roots of the equation (a² + b²)x² - 2(ac + bd)x + (c² + d²) = 0 are equal, prove that a/b = c/d. If a = 3, b = 4, and c = 6, find d.",
            options: ["6", "7", "8", "9"],
            correct: 2,
            year: "2024",
            chapter: "Quadratic Equations"
        },
        {
            id: 14,
            marks: 3,
            question: "A straight highway leads to the foot of a tower. A man standing at the top of the tower observes a car at an angle of depression of 30°, which is approaching the foot of the tower with a uniform speed. Six seconds later, the angle of depression of the car is found to be 60°. Find the time taken by the car to reach the foot of the tower from this point.",
            options: ["3 seconds", "4 seconds", "5 seconds", "6 seconds"],
            correct: 0,
            year: "2022",
            chapter: "Some Applications of Trigonometry"
        },
        {
            id: 15,
            marks: 3,
            question: "From the top of a 7 m high building, the angle of elevation of the top of a cable tower is 60° and the angle of depression of its foot is 45°. Determine the height of the tower.",
            options: ["7(1 + √3) m", "7(2 + √3) m", "7(3 + √3) m", "7(1 + 2√3) m"],
            correct: 0,
            year: "2024",
            chapter: "Some Applications of Trigonometry"
        },
        
        // 5 Marks Questions (2 questions = 10 marks)
        {
            id: 16,
            marks: 5,
            question: "A solid iron pole consists of a cylinder of height 220 cm and base diameter 24 cm, which is surmounted by another cylinder of height 60 cm and radius 8 cm. Find the mass of the pole, given that 1 cm³ of iron has approximately 8 g mass.",
            options: ["892.8 kg", "895.2 kg", "897.6 kg", "900.0 kg"],
            correct: 0,
            year: "2022",
            chapter: "Surface Areas and Volumes"
        },
        {
            id: 17,
            marks: 5,
            question: "The following distribution gives the distribution of the life time of 400 neon lamps. Find the median life time of a lamp. Lifetime (hours): 1500-2000: 14, 2000-2500: 56, 2500-3000: 60, 3000-3500: 86, 3500-4000: 74, 4000-4500: 62, 4500-5000: 48",
            options: ["3136.8 hours", "3236.8 hours", "3336.8 hours", "3436.8 hours"],
            correct: 0,
            year: "2024",
            chapter: "Statistics"
        }
    ]
};

