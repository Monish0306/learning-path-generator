// EXPANDED QUESTION BANKS
// Add this to your subjects.js file - Replace existing quizBank sections

const subjectsDatabase = {
    daa: {
        id: 'daa',
        name: 'Design & Analysis of Algorithms',
        topics: {
            // ... existing topics ...
        },
        
        // EXPANDED QUIZ BANK - 15-20 questions per topic
        quizBank: {
            'intro': [
                {
                    question: "What is the primary purpose of algorithm analysis?",
                    options: ["To write code", "To measure efficiency", "To debug programs", "To design UI"],
                    correct: 1
                },
                {
                    question: "Which is NOT a characteristic of a good algorithm?",
                    options: ["Definiteness", "Effectiveness", "Ambiguity", "Finiteness"],
                    correct: 2
                },
                {
                    question: "What does time complexity measure?",
                    options: ["Memory usage", "Code length", "Execution time", "Number of variables"],
                    correct: 2
                },
                {
                    question: "Space complexity refers to?",
                    options: ["Code size", "Memory required", "Disk space", "Screen space"],
                    correct: 1
                },
                {
                    question: "An algorithm must be?",
                    options: ["Complex", "Finite", "Infinite", "Recursive"],
                    correct: 1
                },
                {
                    question: "What is an algorithm?",
                    options: ["A programming language", "Step-by-step procedure", "A data structure", "A compiler"],
                    correct: 1
                },
                {
                    question: "Which property ensures an algorithm terminates?",
                    options: ["Definiteness", "Finiteness", "Effectiveness", "Input"],
                    correct: 1
                },
                {
                    question: "Best case complexity represents?",
                    options: ["Worst scenario", "Average scenario", "Best scenario", "Random scenario"],
                    correct: 2
                },
                {
                    question: "What is pseudocode?",
                    options: ["Actual code", "High-level description", "Machine code", "Binary code"],
                    correct: 1
                },
                {
                    question: "Algorithm efficiency is measured in terms of?",
                    options: ["Lines of code", "Time and Space", "Variables used", "Functions called"],
                    correct: 1
                },
                {
                    question: "What does 'input' property of algorithm mean?",
                    options: ["No input needed", "Zero or more inputs", "Exactly one input", "Infinite inputs"],
                    correct: 1
                },
                {
                    question: "Output property states algorithm should produce?",
                    options: ["No output", "At least one output", "Multiple outputs", "Optional output"],
                    correct: 1
                },
                {
                    question: "Empirical analysis of algorithm means?",
                    options: ["Mathematical proof", "Running and measuring", "Guessing", "Theoretical study"],
                    correct: 1
                },
                {
                    question: "Which is an example of algorithm?",
                    options: ["Recipe", "Random numbers", "Chaos", "Undefined process"],
                    correct: 0
                },
                {
                    question: "Correctness of algorithm means?",
                    options: ["Fast execution", "Produces correct output", "Uses less memory", "Short code"],
                    correct: 1
                }
            ],
            
            'asymptotic': [
                {
                    question: "Big O notation represents?",
                    options: ["Best case", "Average case", "Worst case upper bound", "Exact complexity"],
                    correct: 2
                },
                {
                    question: "O(n²) means the algorithm is?",
                    options: ["Linear", "Quadratic", "Logarithmic", "Constant"],
                    correct: 1
                },
                {
                    question: "Which is faster for large n?",
                    options: ["O(n²)", "O(n log n)", "O(2^n)", "O(n!)"],
                    correct: 1
                },
                {
                    question: "Θ (Theta) notation represents?",
                    options: ["Upper bound only", "Lower bound only", "Tight bound", "No bound"],
                    correct: 2
                },
                {
                    question: "Ω (Omega) notation represents?",
                    options: ["Upper bound", "Lower bound", "Average case", "Space complexity"],
                    correct: 1
                },
                {
                    question: "O(1) represents?",
                    options: ["Linear time", "Constant time", "Quadratic time", "Exponential time"],
                    correct: 1
                },
                {
                    question: "O(log n) is typical of?",
                    options: ["Linear search", "Binary search", "Bubble sort", "Selection sort"],
                    correct: 1
                },
                {
                    question: "O(n log n) is complexity of?",
                    options: ["Bubble sort", "Merge sort", "Linear search", "Binary search"],
                    correct: 1
                },
                {
                    question: "Little o notation means?",
                    options: ["Upper bound (not tight)", "Lower bound", "Exact bound", "No bound"],
                    correct: 0
                },
                {
                    question: "Which grows fastest?",
                    options: ["n²", "2^n", "n log n", "n³"],
                    correct: 1
                },
                {
                    question: "O(n) + O(n²) = ?",
                    options: ["O(n)", "O(n²)", "O(n³)", "O(2n²)"],
                    correct: 1
                },
                {
                    question: "Best case is represented by?",
                    options: ["Big O", "Big Omega", "Big Theta", "Little o"],
                    correct: 1
                },
                {
                    question: "If T(n) = 3n² + 2n + 1, O(T(n)) = ?",
                    options: ["O(n)", "O(n²)", "O(n³)", "O(1)"],
                    correct: 1
                },
                {
                    question: "Amortized analysis is used for?",
                    options: ["Single operation", "Sequence of operations", "Space analysis", "Best case"],
                    correct: 1
                },
                {
                    question: "Which is slowest?",
                    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
                    correct: 3
                }
            ],
            
            'arrays': [
                {
                    question: "Time complexity of linear search?",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                    correct: 2
                },
                {
                    question: "Binary search requires array to be?",
                    options: ["Unsorted", "Sorted", "Empty", "Full"],
                    correct: 1
                },
                {
                    question: "Best case of binary search?",
                    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
                    correct: 2
                },
                {
                    question: "Accessing array element by index is?",
                    options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
                    correct: 2
                },
                {
                    question: "Inserting at end of array is?",
                    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
                    correct: 0
                },
                {
                    question: "Deleting from middle of array is?",
                    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
                    correct: 1
                },
                {
                    question: "Finding minimum in unsorted array?",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                    correct: 2
                },
                {
                    question: "Binary search worst case?",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                    correct: 1
                },
                {
                    question: "Which search works on unsorted array?",
                    options: ["Binary", "Linear", "Interpolation", "Jump"],
                    correct: 1
                },
                {
                    question: "Jump search complexity?",
                    options: ["O(√n)", "O(n)", "O(log n)", "O(1)"],
                    correct: 0
                },
                {
                    question: "Interpolation search is best for?",
                    options: ["Unsorted data", "Uniformly distributed data", "Small arrays", "Linked lists"],
                    correct: 1
                },
                {
                    question: "Ternary search divides array into?",
                    options: ["2 parts", "3 parts", "4 parts", "n parts"],
                    correct: 1
                },
                {
                    question: "Which is in-place algorithm?",
                    options: ["Merge sort", "Binary search", "Quick sort", "All searches"],
                    correct: 1
                },
                {
                    question: "Exponential search is useful for?",
                    options: ["Sorted arrays", "Unbounded arrays", "Small arrays", "Linked lists"],
                    correct: 1
                },
                {
                    question: "Array rotation by k positions takes?",
                    options: ["O(1)", "O(k)", "O(n)", "O(n²)"],
                    correct: 2
                }
            ],
            
            'sorting': [
                {
                    question: "Worst case of Quick Sort?",
                    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
                    correct: 1
                },
                {
                    question: "Which is a stable sorting algorithm?",
                    options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
                    correct: 2
                },
                {
                    question: "Best sorting algorithm for nearly sorted data?",
                    options: ["Quick Sort", "Insertion Sort", "Heap Sort", "Merge Sort"],
                    correct: 1
                },
                {
                    question: "Average case of Merge Sort?",
                    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
                    correct: 1
                },
                {
                    question: "Which uses divide and conquer?",
                    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Selection Sort"],
                    correct: 2
                },
                {
                    question: "Bubble sort best case?",
                    options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
                    correct: 0
                },
                {
                    question: "Heap sort space complexity?",
                    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
                    correct: 0
                },
                {
                    question: "Which is NOT comparison-based?",
                    options: ["Quick Sort", "Merge Sort", "Counting Sort", "Heap Sort"],
                    correct: 2
                },
                {
                    question: "Selection sort makes how many swaps for n elements?",
                    options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
                    correct: 1
                },
                {
                    question: "In-place sorting means?",
                    options: ["Uses O(1) extra space", "Uses O(n) space", "Very fast", "Stable"],
                    correct: 0
                },
                {
                    question: "Radix sort works on?",
                    options: ["Comparisons", "Digits/characters", "Swaps", "Recursion"],
                    correct: 1
                },
                {
                    question: "Counting sort is efficient when?",
                    options: ["k = O(n)", "k >> n", "n is small", "Data is sorted"],
                    correct: 0
                },
                {
                    question: "Shell sort is improved version of?",
                    options: ["Bubble sort", "Insertion sort", "Selection sort", "Merge sort"],
                    correct: 1
                },
                {
                    question: "Tim sort is used in?",
                    options: ["C++", "Python", "Java", "JavaScript"],
                    correct: 1
                },
                {
                    question: "Pancake sort uses?",
                    options: ["Flip operation", "Swap operation", "Comparison", "Hashing"],
                    correct: 0
                },
                {
                    question: "External sorting is used when?",
                    options: ["Data fits in RAM", "Data doesn't fit in RAM", "Data is sorted", "n is small"],
                    correct: 1
                },
                {
                    question: "Bucket sort complexity depends on?",
                    options: ["Number of buckets", "Input size", "Both", "Neither"],
                    correct: 2
                },
                {
                    question: "Which guarantees O(n log n) worst case?",
                    options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"],
                    correct: 1
                }
            ],
            
            'divide-conquer': [
                {
                    question: "Divide and conquer strategy involves?",
                    options: ["Divide, Conquer, Combine", "Divide, Solve, Merge", "Split, Process, Join", "All of above"],
                    correct: 3
                },
                {
                    question: "Master theorem is used for?",
                    options: ["Sorting", "Recurrence relations", "Searching", "Hashing"],
                    correct: 1
                },
                {
                    question: "Which is NOT divide and conquer?",
                    options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Binary Search"],
                    correct: 2
                },
                {
                    question: "Strassen's algorithm is for?",
                    options: ["Sorting", "Searching", "Matrix multiplication", "Graph traversal"],
                    correct: 2
                },
                {
                    question: "Karatsuba algorithm is for?",
                    options: ["Sorting", "Integer multiplication", "String matching", "Hashing"],
                    correct: 1
                },
                {
                    question: "Binary search is divide and conquer because?",
                    options: ["Divides array in half", "Uses recursion", "Compares elements", "All of above"],
                    correct: 0
                }
            ],
            
            'greedy': [
                {
                    question: "Greedy algorithm makes?",
                    options: ["Global optimal choice", "Local optimal choice", "Random choice", "Worst choice"],
                    correct: 1
                },
                {
                    question: "Activity selection uses?",
                    options: ["DP", "Greedy", "Backtracking", "Divide & Conquer"],
                    correct: 1
                },
                {
                    question: "Huffman coding is used for?",
                    options: ["Encryption", "Compression", "Sorting", "Searching"],
                    correct: 1
                },
                {
                    question: "Fractional knapsack allows?",
                    options: ["Partial items", "Only complete items", "No items", "Unlimited items"],
                    correct: 0
                },
                {
                    question: "Prim's algorithm finds?",
                    options: ["Shortest path", "MST", "Longest path", "Cycle"],
                    correct: 1
                }
            ],
            
            'dynamic-programming': [
                {
                    question: "Dynamic programming is used for?",
                    options: ["Greedy problems", "Optimal substructure problems", "NP problems", "Sorting"],
                    correct: 1
                },
                {
                    question: "Memoization is?",
                    options: ["Top-down DP", "Bottom-up DP", "Greedy", "Backtracking"],
                    correct: 0
                },
                {
                    question: "Tabulation is?",
                    options: ["Top-down DP", "Bottom-up DP", "Greedy", "Divide & Conquer"],
                    correct: 1
                },
                {
                    question: "0/1 Knapsack means?",
                    options: ["Partial items allowed", "Only complete items", "No items", "Unlimited items"],
                    correct: 1
                },
                {
                    question: "LCS stands for?",
                    options: ["Longest Common Subsequence", "Least Common Sequence", "Linear Code Search", "None"],
                    correct: 0
                }
            ],
            
            'graphs-basics': [
                {
                    question: "Adjacency matrix uses?",
                    options: ["O(V) space", "O(E) space", "O(V²) space", "O(1) space"],
                    correct: 2
                },
                {
                    question: "DFS uses which data structure?",
                    options: ["Queue", "Stack", "Heap", "Array"],
                    correct: 1
                },
                {
                    question: "BFS uses which data structure?",
                    options: ["Queue", "Stack", "Heap", "Tree"],
                    correct: 0
                },
                {
                    question: "Graph with no cycles is?",
                    options: ["Tree", "DAG", "Complete graph", "Bipartite"],
                    correct: 1
                },
                {
                    question: "Time complexity of BFS?",
                    options: ["O(V)", "O(E)", "O(V+E)", "O(V*E)"],
                    correct: 2
                }
            ],
            
            'graphs-advanced': [
                {
                    question: "Dijkstra finds?",
                    options: ["MST", "Shortest path", "Longest path", "Cycle"],
                    correct: 1
                },
                {
                    question: "Floyd-Warshall finds?",
                    options: ["Single source shortest path", "All pairs shortest path", "MST", "Cycle"],
                    correct: 1
                },
                {
                    question: "Kruskal's algorithm uses?",
                    options: ["Greedy", "DP", "Backtracking", "Divide & Conquer"],
                    correct: 0
                },
                {
                    question: "Topological sort works on?",
                    options: ["Any graph", "DAG only", "Tree only", "Complete graph"],
                    correct: 1
                },
                {
                    question: "Bellman-Ford handles?",
                    options: ["Only positive weights", "Negative weights too", "Only trees", "Undirected graphs"],
                    correct: 1
                }
            ]
        }
    },
    
    // For Python - add similarly expanded questions
    python: {
        id: 'python',
        name: 'Python Programming',
        topics: {
            // existing topics
        },
        quizBank: {
            'basics': [
                // Add 15-20 questions each
                {
                    question: "Which is a valid Python variable name?",
                    options: ["2var", "_var", "var-name", "var name"],
                    correct: 1
                },
                {
                    question: "What is the output of: print(type(5.0))?",
                    options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "Error"],
                    correct: 1
                },
                // ... add 13-18 more
            ]
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = subjectsDatabase;
}