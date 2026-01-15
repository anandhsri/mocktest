// CBSE Class 10 Physics - Descriptive Type Test (25 Marks)
// Based on CBSE Board Exam Question Papers (2020-2025)
// Total: 5 Questions × 5 Marks each = 25 Marks

const physicsDescriptiveTest = {
    testInfo: {
        title: "CBSE Class 10 Physics - Descriptive Type Test",
        totalMarks: 25,
        duration: "90 minutes",
        instructions: [
            "Answer all questions.",
            "Each question carries 5 marks.",
            "Draw neat and labeled diagrams wherever necessary.",
            "Show all calculations clearly.",
            "Use appropriate units in your answers."
        ],
        year: "2020-2025 Pattern"
    },
    
    questions: [
        {
            id: 1,
            marks: 5,
            year: "2023",
            chapter: "Electricity",
            question: "State Ohm's law. Draw a circuit diagram to verify Ohm's law. A student performs an experiment and obtains the following data:\n\nVoltage (V) | Current (A)\n2.0        | 0.4\n4.0        | 0.8\n6.0        | 1.2\n8.0        | 1.6\n\n(a) Plot a graph of V vs I.\n(b) Calculate the resistance of the conductor.\n(c) What would be the current when voltage is 10V?",
            expectedPoints: [
                "Statement of Ohm's law: V ∝ I or V = IR (1 mark)",
                "Circuit diagram with ammeter, voltmeter, resistor, battery, and key (1 mark)",
                "Graph plotting V vs I (straight line through origin) (1 mark)",
                "Calculation: R = V/I = 2.0/0.4 = 5Ω (1 mark)",
                "Current at 10V: I = V/R = 10/5 = 2A (1 mark)"
            ],
            answer: "Ohm's law states that at constant temperature, the current flowing through a conductor is directly proportional to the potential difference across its ends.\n\nMathematically: V ∝ I or V = IR, where R is the resistance.\n\nCircuit diagram should show:\n- A battery (voltage source)\n- A resistor (conductor)\n- An ammeter connected in series\n- A voltmeter connected in parallel across the resistor\n- A key (switch)\n\nFrom the graph (V vs I), the slope gives resistance R = 5Ω.\n\nWhen V = 10V, I = V/R = 10/5 = 2A"
        },
        
        {
            id: 2,
            marks: 5,
            year: "2024",
            chapter: "Light - Reflection and Refraction",
            question: "An object is placed at a distance of 30 cm from a concave mirror of focal length 15 cm.\n\n(a) Draw a ray diagram to show the formation of image.\n(b) State the position, nature, and size of the image formed.\n(c) If the object is moved 10 cm towards the mirror, what will be the new position of the image?",
            expectedPoints: [
                "Ray diagram with at least two rays (incident parallel to principal axis, passing through focus) (2 marks)",
                "Image position calculation using mirror formula: 1/f = 1/v + 1/u (1 mark)",
                "Image characteristics: Real, inverted, same size, at 30 cm (1 mark)",
                "New position calculation when object moves to 20 cm (1 mark)"
            ],
            answer: "(a) Ray diagram:\n- Draw a concave mirror with principal axis, pole (P), focus (F), and center of curvature (C)\n- Place object at 30 cm (2F)\n- Draw ray 1: Parallel to principal axis, reflects through F\n- Draw ray 2: Through F, reflects parallel to principal axis\n- Image formed at 30 cm (2F), real, inverted, same size\n\n(b) Using mirror formula: 1/f = 1/v + 1/u\nGiven: f = -15 cm (concave mirror), u = -30 cm\n1/(-15) = 1/v + 1/(-30)\n-1/15 = 1/v - 1/30\n1/v = -1/15 + 1/30 = -2/30 + 1/30 = -1/30\nv = -30 cm\n\nPosition: 30 cm in front of mirror\nNature: Real and inverted\nSize: Same as object (magnification m = -v/u = -(-30)/(-30) = -1)\n\n(c) When object moves 10 cm towards mirror: u = -20 cm\n1/(-15) = 1/v + 1/(-20)\n1/v = -1/15 + 1/20 = -4/60 + 3/60 = -1/60\nv = -60 cm\n\nNew image position: 60 cm in front of mirror (beyond C)"
        },
        
        {
            id: 3,
            marks: 5,
            year: "2022",
            chapter: "Magnetic Effects of Electric Current",
            question: "Explain the working of an electric motor with the help of a labeled diagram. State Fleming's left-hand rule. A current-carrying conductor experiences a force when placed in a magnetic field. Explain why this happens and what factors affect the magnitude of this force.",
            expectedPoints: [
                "Labeled diagram of electric motor (armature, commutator, brushes, field magnets) (1.5 marks)",
                "Explanation of working principle (rotation due to force on current-carrying conductor) (1 mark)",
                "Statement of Fleming's left-hand rule (1 mark)",
                "Explanation of force and factors affecting it (F = BIL) (1.5 marks)"
            ],
            answer: "Electric Motor:\n\nLabeled diagram should show:\n- Armature (coil ABCD)\n- Commutator (split rings)\n- Brushes (X and Y)\n- Field magnets (N and S poles)\n- Battery\n- Shaft\n\nWorking:\n1. When current flows through the coil, it experiences a force due to magnetic field\n2. According to Fleming's left-hand rule, the coil rotates\n3. Commutator reverses the current direction every half rotation\n4. This ensures continuous rotation in the same direction\n\nFleming's Left-Hand Rule:\nStretch the thumb, forefinger, and middle finger of left hand mutually perpendicular to each other. If forefinger points in the direction of magnetic field, middle finger in the direction of current, then thumb points in the direction of force.\n\nForce on current-carrying conductor:\nWhen a current-carrying conductor is placed in a magnetic field, it experiences a force because:\n- The moving charges (current) create their own magnetic field\n- This interacts with the external magnetic field\n- The interaction results in a force perpendicular to both current and magnetic field\n\nFactors affecting force magnitude:\nF = BIL sin θ\nWhere:\n- B = magnetic field strength\n- I = current\n- L = length of conductor\n- θ = angle between conductor and magnetic field\n\nForce is maximum when θ = 90° (conductor perpendicular to field)"
        },
        
        {
            id: 4,
            marks: 5,
            year: "2021",
            chapter: "The Human Eye and the Colourful World",
            question: "Explain the following phenomena with reasons:\n\n(a) Why does the sky appear blue during the day?\n(b) Why does the sun appear reddish at sunrise and sunset?\n(c) What causes the formation of a rainbow?\n\nAlso, explain the defect of vision called myopia. How can it be corrected? Draw a ray diagram showing the correction.",
            expectedPoints: [
                "Explanation of blue sky (scattering of blue light) (1 mark)",
                "Explanation of red sun (scattering, longer path) (1 mark)",
                "Explanation of rainbow (dispersion and total internal reflection) (1 mark)",
                "Myopia explanation and correction with ray diagram (2 marks)"
            ],
            answer: "(a) Blue Sky:\nThe sky appears blue due to scattering of light. When sunlight enters Earth's atmosphere, it collides with tiny particles. Blue light has shorter wavelength and is scattered more by these particles (Rayleigh scattering). This scattered blue light reaches our eyes, making the sky appear blue.\n\n(b) Reddish Sun at Sunrise/Sunset:\nAt sunrise and sunset, sunlight travels a longer path through the atmosphere. Most of the blue and violet light is scattered away, leaving mainly red and orange light to reach our eyes. This makes the sun appear reddish.\n\n(c) Rainbow Formation:\nA rainbow is formed due to:\n1. Dispersion: White light splits into its component colors when it enters a water droplet\n2. Refraction: Light bends as it enters and exits the droplet\n3. Total Internal Reflection: Light reflects inside the droplet\n4. The different colors emerge at different angles, creating the rainbow arc\n\nMyopia (Near-sightedness):\n- Defect: Person can see nearby objects clearly but distant objects appear blurred\n- Cause: Eye lens is too thick or eyeball is too long, causing image to form in front of retina\n- Correction: Use concave lens (diverging lens) which diverges light rays before they enter the eye\n- Ray diagram: Show parallel rays from distant object, concave lens diverging them, and image forming on retina"
        },
        
        {
            id: 5,
            marks: 5,
            year: "2025",
            chapter: "Electricity",
            question: "Three resistors of resistances 2Ω, 3Ω, and 6Ω are connected:\n\n(a) In series across a 12V battery. Calculate:\n   (i) Total resistance\n   (ii) Current flowing through each resistor\n   (iii) Potential difference across each resistor\n\n(b) In parallel across the same battery. Calculate:\n   (i) Total resistance\n   (ii) Current through each resistor\n   (iii) Total current drawn from battery\n\n(c) Which combination draws more current? Justify your answer.",
            expectedPoints: [
                "Series combination calculations (R_total, I, V across each) (2 marks)",
                "Parallel combination calculations (1/R_total, I through each, I_total) (2 marks)",
                "Comparison and justification (1 mark)"
            ],
            answer: "Given: R₁ = 2Ω, R₂ = 3Ω, R₃ = 6Ω, V = 12V\n\n(a) Series Combination:\n\n(i) Total resistance:\nR_s = R₁ + R₂ + R₃ = 2 + 3 + 6 = 11Ω\n\n(ii) Current through each resistor:\nIn series, same current flows through all resistors\nI = V/R_s = 12/11 = 1.09 A (approximately)\n\n(iii) Potential difference across each:\nV₁ = IR₁ = (12/11) × 2 = 24/11 = 2.18 V\nV₂ = IR₂ = (12/11) × 3 = 36/11 = 3.27 V\nV₃ = IR₃ = (12/11) × 6 = 72/11 = 6.55 V\n\n(b) Parallel Combination:\n\n(i) Total resistance:\n1/R_p = 1/R₁ + 1/R₂ + 1/R₃\n1/R_p = 1/2 + 1/3 + 1/6 = 3/6 + 2/6 + 1/6 = 6/6 = 1\nR_p = 1Ω\n\n(ii) Current through each resistor:\nI₁ = V/R₁ = 12/2 = 6A\nI₂ = V/R₂ = 12/3 = 4A\nI₃ = V/R₃ = 12/6 = 2A\n\n(iii) Total current:\nI_total = I₁ + I₂ + I₃ = 6 + 4 + 2 = 12A\n\n(c) Parallel combination draws more current (12A) compared to series combination (1.09A).\n\nJustification:\nIn parallel, the total resistance (1Ω) is less than the smallest individual resistance (2Ω). According to Ohm's law (I = V/R), lower resistance means higher current for the same voltage. In series, total resistance (11Ω) is higher, resulting in lower current."
        }
    ],
    
    markingScheme: {
        totalMarks: 25,
        distribution: "5 questions × 5 marks each",
        criteria: [
            "Correct formula/principle: 1 mark",
            "Correct substitution and calculation: 1 mark",
            "Correct answer with units: 1 mark",
            "Neat labeled diagram: 1 mark",
            "Proper explanation/reasoning: 1 mark"
        ]
    },
    
    topicsCovered: [
        "Ohm's Law and Electrical Circuits",
        "Light - Reflection (Mirrors)",
        "Magnetic Effects of Electric Current",
        "The Human Eye and Optical Phenomena",
        "Series and Parallel Resistor Combinations"
    ],
    
    examPattern: {
        questionType: "Long Answer Type (Descriptive)",
        marksPerQuestion: 5,
        totalQuestions: 5,
        timeAllotted: "90 minutes",
        difficulty: "Moderate to High",
        basedOn: "CBSE Board Exam Papers 2020-2025"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = physicsDescriptiveTest;
}

