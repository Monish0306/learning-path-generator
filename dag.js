/**
 * Directed Acyclic Graph (DAG) Implementation
 * Used to represent topics and their prerequisite relationships
 */

class DAG {
    constructor() {
        this.adjacencyList = new Map();
        this.inDegree = new Map();
        this.topicData = new Map();
    }

    /**
     * Add a vertex (topic) to the graph
     */
    addVertex(vertex, data = {}) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
            this.inDegree.set(vertex, 0);
            this.topicData.set(vertex, {
                id: vertex,
                name: data.name || vertex,
                difficulty: data.difficulty || 1,
                mastery: data.mastery || 0,
                completed: data.completed || false,
                ...data
            });
        }
    }

    /**
     * Add a directed edge (prerequisite relationship)
     * from -> to means 'from' is a prerequisite for 'to'
     */
    addEdge(from, to) {
        if (!this.adjacencyList.has(from)) {
            this.addVertex(from);
        }
        if (!this.adjacencyList.has(to)) {
            this.addVertex(to);
        }

        this.adjacencyList.get(from).push(to);
        this.inDegree.set(to, this.inDegree.get(to) + 1);
    }

    /**
     * Get all vertices
     */
    getVertices() {
        return Array.from(this.adjacencyList.keys());
    }

    /**
     * Get neighbors (topics that depend on this topic)
     */
    getNeighbors(vertex) {
        return this.adjacencyList.get(vertex) || [];
    }

    /**
     * Get prerequisites (topics that this topic depends on)
     */
    getPrerequisites(vertex) {
        const prerequisites = [];
        for (const [node, neighbors] of this.adjacencyList) {
            if (neighbors.includes(vertex)) {
                prerequisites.push(node);
            }
        }
        return prerequisites;
    }

    /**
     * Get in-degree of a vertex
     */
    getInDegree(vertex) {
        return this.inDegree.get(vertex) || 0;
    }

    /**
     * Get topic data
     */
    getTopicData(vertex) {
        return this.topicData.get(vertex);
    }

    /**
     * Update topic mastery level
     */
    updateMastery(vertex, mastery) {
        const data = this.topicData.get(vertex);
        if (data) {
            data.mastery = mastery;
            data.completed = mastery >= 0.7; // 70% threshold
            this.topicData.set(vertex, data);
        }
    }

    /**
     * Check if topic is ready to be learned (all prerequisites completed)
     */
    isReady(vertex) {
        const prerequisites = this.getPrerequisites(vertex);
        return prerequisites.every(prereq => {
            const data = this.getTopicData(prereq);
            return data && data.completed;
        });
    }

    /**
     * Get all topics that are ready to be learned
     */
    getReadyTopics() {
        const ready = [];
        for (const vertex of this.getVertices()) {
            const data = this.getTopicData(vertex);
            if (!data.completed && this.isReady(vertex)) {
                ready.push(vertex);
            }
        }
        return ready;
    }

    /**
     * Detect cycles in the graph (should not exist in a valid DAG)
     */
    hasCycle() {
        const visited = new Set();
        const recursionStack = new Set();

        const dfs = (vertex) => {
            visited.add(vertex);
            recursionStack.add(vertex);

            const neighbors = this.getNeighbors(vertex);
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    if (dfs(neighbor)) return true;
                } else if (recursionStack.has(neighbor)) {
                    return true;
                }
            }

            recursionStack.delete(vertex);
            return false;
        };

        for (const vertex of this.getVertices()) {
            if (!visited.has(vertex)) {
                if (dfs(vertex)) return true;
            }
        }

        return false;
    }

    /**
     * Clone the graph
     */
    clone() {
        const newGraph = new DAG();
        
        // Copy vertices
        for (const [vertex, data] of this.topicData) {
            newGraph.addVertex(vertex, {...data});
        }

        // Copy edges
        for (const [from, neighbors] of this.adjacencyList) {
            for (const to of neighbors) {
                newGraph.addEdge(from, to);
            }
        }

        return newGraph;
    }

    /**
     * Get graph statistics
     */
    getStats() {
        const vertices = this.getVertices();
        let totalMastery = 0;
        let completedCount = 0;

        for (const vertex of vertices) {
            const data = this.getTopicData(vertex);
            totalMastery += data.mastery;
            if (data.completed) completedCount++;
        }

        return {
            totalTopics: vertices.length,
            completedTopics: completedCount,
            averageMastery: vertices.length > 0 ? totalMastery / vertices.length : 0,
            readyTopics: this.getReadyTopics().length
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DAG;
}