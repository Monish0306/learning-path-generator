/**
 * Topological Sorting using Kahn's Algorithm
 * Ensures topics are learned only after completing prerequisites
 */

class TopologicalSort {
    /**
     * Perform topological sort on a DAG
     * @param {DAG} graph - The directed acyclic graph
     * @returns {Array} - Sorted array of vertices
     */
    static sort(graph) {
        const result = [];
        const queue = [];
        const inDegreeMap = new Map();

        // Initialize in-degree map
        for (const vertex of graph.getVertices()) {
            const degree = graph.getInDegree(vertex);
            inDegreeMap.set(vertex, degree);
            
            // Add vertices with no prerequisites to queue
            if (degree === 0) {
                queue.push(vertex);
            }
        }

        // Process queue
        while (queue.length > 0) {
            const current = queue.shift();
            result.push(current);

            // Reduce in-degree for neighbors
            const neighbors = graph.getNeighbors(current);
            for (const neighbor of neighbors) {
                const newDegree = inDegreeMap.get(neighbor) - 1;
                inDegreeMap.set(neighbor, newDegree);

                if (newDegree === 0) {
                    queue.push(neighbor);
                }
            }
        }

        // Check if all vertices were processed (no cycle)
        if (result.length !== graph.getVertices().length) {
            throw new Error('Graph contains a cycle - not a valid DAG');
        }

        return result;
    }

    /**
     * Get topological sort with priority based on difficulty
     * Easier topics come first when there are multiple options
     */
    static sortWithPriority(graph) {
        const result = [];
        const inDegreeMap = new Map();
        
        // Priority queue: lower difficulty = higher priority
        const priorityQueue = [];

        // Initialize
        for (const vertex of graph.getVertices()) {
            const degree = graph.getInDegree(vertex);
            inDegreeMap.set(vertex, degree);
            
            if (degree === 0) {
                const data = graph.getTopicData(vertex);
                priorityQueue.push({
                    vertex,
                    difficulty: data.difficulty || 1
                });
            }
        }

        // Sort by difficulty
        priorityQueue.sort((a, b) => a.difficulty - b.difficulty);

        while (priorityQueue.length > 0) {
            const { vertex: current } = priorityQueue.shift();
            result.push(current);

            const neighbors = graph.getNeighbors(current);
            for (const neighbor of neighbors) {
                const newDegree = inDegreeMap.get(neighbor) - 1;
                inDegreeMap.set(neighbor, newDegree);

                if (newDegree === 0) {
                    const data = graph.getTopicData(neighbor);
                    priorityQueue.push({
                        vertex: neighbor,
                        difficulty: data.difficulty || 1
                    });
                    
                    // Re-sort after adding
                    priorityQueue.sort((a, b) => a.difficulty - b.difficulty);
                }
            }
        }

        if (result.length !== graph.getVertices().length) {
            throw new Error('Graph contains a cycle');
        }

        return result;
    }

    /**
     * Get personalized topological sort based on current mastery
     * Topics with lower mastery get higher priority
     */
    static personalizedSort(graph) {
        const result = [];
        const inDegreeMap = new Map();
        const priorityQueue = [];

        for (const vertex of graph.getVertices()) {
            const degree = graph.getInDegree(vertex);
            inDegreeMap.set(vertex, degree);
            
            if (degree === 0) {
                const data = graph.getTopicData(vertex);
                if (!data.completed) {
                    priorityQueue.push({
                        vertex,
                        priority: this.calculatePriority(data)
                    });
                }
            }
        }

        // Sort by priority (lower = more important)
        priorityQueue.sort((a, b) => a.priority - b.priority);

        while (priorityQueue.length > 0) {
            const { vertex: current } = priorityQueue.shift();
            result.push(current);

            const neighbors = graph.getNeighbors(current);
            for (const neighbor of neighbors) {
                const newDegree = inDegreeMap.get(neighbor) - 1;
                inDegreeMap.set(neighbor, newDegree);

                if (newDegree === 0) {
                    const data = graph.getTopicData(neighbor);
                    if (!data.completed) {
                        priorityQueue.push({
                            vertex: neighbor,
                            priority: this.calculatePriority(data)
                        });
                        
                        priorityQueue.sort((a, b) => a.priority - b.priority);
                    }
                }
            }
        }

        return result;
    }

    /**
     * Calculate priority for a topic
     * Lower value = higher priority
     */
    static calculatePriority(topicData) {
        // Priority = (1 - mastery) * difficulty
        // Low mastery + high difficulty = high priority
        const masteryFactor = 1 - topicData.mastery;
        const difficultyFactor = topicData.difficulty || 1;
        
        return masteryFactor * difficultyFactor;
    }

    /**
     * Get all valid topological orderings
     * (useful for showing alternative learning paths)
     */
    static getAllOrderings(graph) {
        const orderings = [];
        const inDegreeMap = new Map();

        for (const vertex of graph.getVertices()) {
            inDegreeMap.set(vertex, graph.getInDegree(vertex));
        }

        const backtrack = (current, remaining) => {
            if (remaining.size === 0) {
                orderings.push([...current]);
                return;
            }

            // Find vertices with in-degree 0
            const available = [];
            for (const vertex of remaining) {
                if (inDegreeMap.get(vertex) === 0) {
                    available.push(vertex);
                }
            }

            // Try each available vertex
            for (const vertex of available) {
                current.push(vertex);
                remaining.delete(vertex);

                // Reduce in-degree for neighbors
                const neighbors = graph.getNeighbors(vertex);
                for (const neighbor of neighbors) {
                    inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) - 1);
                }

                backtrack(current, remaining);

                // Restore state
                for (const neighbor of neighbors) {
                    inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) + 1);
                }
                
                remaining.add(vertex);
                current.pop();
            }
        };

        const remaining = new Set(graph.getVertices());
        backtrack([], remaining);

        return orderings;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TopologicalSort;
}