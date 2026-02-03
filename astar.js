/**
 * A* Algorithm for finding shortest learning path
 * Finds most efficient path from current knowledge to goal
 */

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

class AStar {
    /**
     * Find shortest path from start to goal
     * @param {DAG} graph - The learning graph
     * @param {string} start - Starting topic
     * @param {string} goal - Goal topic
     * @returns {Object} - Path and cost information
     */
    static findPath(graph, start, goal) {
        const openSet = new PriorityQueue();
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();

        // Initialize scores
        for (const vertex of graph.getVertices()) {
            gScore.set(vertex, Infinity);
            fScore.set(vertex, Infinity);
        }

        gScore.set(start, 0);
        fScore.set(start, this.heuristic(graph, start, goal));
        openSet.enqueue(start, fScore.get(start));

        while (!openSet.isEmpty()) {
            const current = openSet.dequeue().element;

            if (current === goal) {
                return this.reconstructPath(cameFrom, current, gScore);
            }

            const neighbors = graph.getNeighbors(current);
            for (const neighbor of neighbors) {
                const tentativeGScore = gScore.get(current) + this.cost(graph, current, neighbor);

                if (tentativeGScore < gScore.get(neighbor)) {
                    cameFrom.set(neighbor, current);
                    gScore.set(neighbor, tentativeGScore);
                    fScore.set(neighbor, tentativeGScore + this.heuristic(graph, neighbor, goal));
                    openSet.enqueue(neighbor, fScore.get(neighbor));
                }
            }
        }

        return null; // No path found
    }

    /**
     * Heuristic function (estimated cost to goal)
     * Uses difficulty and mastery as estimates
     */
    static heuristic(graph, current, goal) {
        const currentData = graph.getTopicData(current);
        const goalData = graph.getTopicData(goal);

        // Estimate based on difficulty difference
        const difficultyDiff = Math.abs(goalData.difficulty - currentData.difficulty);
        
        // Estimate based on mastery gap
        const masteryGap = 1 - currentData.mastery;

        return difficultyDiff + masteryGap * 2;
    }

    /**
     * Cost function for moving from one topic to another
     */
    static cost(graph, from, to) {
        const toData = graph.getTopicData(to);
        
        // Cost based on:
        // 1. Difficulty of the topic
        // 2. Current mastery (less mastery = more cost to learn)
        const difficultyCost = toData.difficulty || 1;
        const masteryCost = (1 - toData.mastery) * 2;

        return difficultyCost + masteryCost;
    }

    /**
     * Reconstruct the path from start to goal
     */
    static reconstructPath(cameFrom, current, gScore) {
        const path = [current];
        let totalCost = gScore.get(current);

        while (cameFrom.has(current)) {
            current = cameFrom.get(current);
            path.unshift(current);
        }

        return {
            path,
            cost: totalCost,
            length: path.length
        };
    }

    /**
     * Find optimal learning path considering current knowledge state
     */
    static findOptimalPath(graph, currentTopic, goalTopic) {
        // Get all incomplete topics between current and goal
        const incompletePath = this.findPath(graph, currentTopic, goalTopic);
        
        if (!incompletePath) {
            return null;
        }

        // Filter to only include topics that need learning
        const filteredPath = incompletePath.path.filter(topic => {
            const data = graph.getTopicData(topic);
            return !data.completed;
        });

        return {
            path: filteredPath,
            estimatedTime: this.estimateTime(graph, filteredPath),
            difficulty: this.calculatePathDifficulty(graph, filteredPath)
        };
    }

    /**
     * Estimate time required to complete the path
     */
    static estimateTime(graph, path) {
        let totalTime = 0;
        
        for (const topic of path) {
            const data = graph.getTopicData(topic);
            // Base time * difficulty * (1 - mastery)
            const topicTime = 30 * data.difficulty * (1 - data.mastery);
            totalTime += topicTime;
        }

        return Math.round(totalTime); // in minutes
    }

    /**
     * Calculate average difficulty of the path
     */
    static calculatePathDifficulty(graph, path) {
        if (path.length === 0) return 0;
        
        let totalDifficulty = 0;
        for (const topic of path) {
            const data = graph.getTopicData(topic);
            totalDifficulty += data.difficulty;
        }

        return totalDifficulty / path.length;
    }

    /**
     * Find alternative paths (useful for showing options)
     */
    static findAlternativePaths(graph, start, goal, maxPaths = 3) {
        const paths = [];
        const visited = new Set();

        const findPath = (current, path, cost) => {
            if (current === goal) {
                paths.push({
                    path: [...path],
                    cost
                });
                return;
            }

            if (paths.length >= maxPaths) return;

            visited.add(current);
            const neighbors = graph.getNeighbors(current);

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    const edgeCost = this.cost(graph, current, neighbor);
                    findPath(neighbor, [...path, neighbor], cost + edgeCost);
                }
            }

            visited.delete(current);
        };

        findPath(start, [start], 0);
        
        // Sort by cost
        paths.sort((a, b) => a.cost - b.cost);
        
        return paths.slice(0, maxPaths);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AStar;
}