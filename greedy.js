/**
 * Greedy Algorithm for Topic Selection
 * Prioritizes weak or important topics during learning progression
 */

class GreedySelector {
    /**
     * Select next best topic to learn using greedy approach
     * @param {DAG} graph - The learning graph
     * @returns {string|null} - Topic ID with highest priority
     */
    static selectNextTopic(graph) {
        const readyTopics = graph.getReadyTopics();
        
        if (readyTopics.length === 0) {
            return null;
        }

        let bestTopic = null;
        let highestPriority = -Infinity;

        for (const topicId of readyTopics) {
            const priority = this.calculatePriority(graph, topicId);
            
            if (priority > highestPriority) {
                highestPriority = priority;
                bestTopic = topicId;
            }
        }

        return bestTopic;
    }

    /**
     * Calculate priority score for a topic
     * Higher score = higher priority
     */
    static calculatePriority(graph, topicId) {
        const data = graph.getTopicData(topicId);
        
        // Priority factors:
        // 1. Low mastery = high priority (need to learn)
        // 2. High importance = high priority
        // 3. Difficulty affects priority
        
        const masteryGap = 1 - data.mastery; // 0 to 1
        const importanceScore = this.calculateImportance(graph, topicId);
        const difficultyFactor = this.getDifficultyFactor(data.difficulty);

        // Weighted priority score
        const priority = (
            masteryGap * 0.5 +          // 50% weight on mastery gap
            importanceScore * 0.3 +     // 30% weight on importance
            difficultyFactor * 0.2      // 20% weight on difficulty
        );

        return priority;
    }

    /**
     * Calculate importance based on how many topics depend on this one
     */
    static calculateImportance(graph, topicId) {
        const dependents = this.countDependents(graph, topicId);
        
        // Normalize to 0-1 scale
        const maxDependents = 10; // Assume max 10 dependent topics
        return Math.min(dependents / maxDependents, 1);
    }

    /**
     * Count how many topics depend on this topic
     */
    static countDependents(graph, topicId) {
        let count = 0;
        const neighbors = graph.getNeighbors(topicId);
        
        for (const neighbor of neighbors) {
            count++;
            // Recursively count deeper dependencies
            count += this.countDependents(graph, neighbor) * 0.5; // Reduce weight for indirect deps
        }

        return count;
    }

    /**
     * Get difficulty factor (prefer easier topics early)
     */
    static getDifficultyFactor(difficulty) {
        // Invert difficulty: easier = higher priority
        const maxDifficulty = 5;
        return (maxDifficulty - difficulty) / maxDifficulty;
    }

    /**
     * Get ordered list of topics to learn (greedy approach)
     */
    static getGreedyLearningSequence(graph) {
        const sequence = [];
        const graphClone = graph.clone();

        while (true) {
            const nextTopic = this.selectNextTopic(graphClone);
            
            if (!nextTopic) {
                break; // No more topics available
            }

            sequence.push(nextTopic);
            
            // Mark as completed in clone
            graphClone.updateMastery(nextTopic, 1.0);
        }

        return sequence;
    }

    /**
     * Select topics to focus on for review
     * @param {DAG} graph
     * @param {number} count - Number of topics to select
     */
    static selectTopicsForReview(graph, count = 3) {
        const completedTopics = [];

        for (const topicId of graph.getVertices()) {
            const data = graph.getTopicData(topicId);
            
            // Only consider completed topics with room for improvement
            if (data.completed && data.mastery < 0.9) {
                completedTopics.push({
                    id: topicId,
                    mastery: data.mastery,
                    priority: (1 - data.mastery) + this.calculateImportance(graph, topicId)
                });
            }
        }

        // Sort by priority (lowest mastery + highest importance)
        completedTopics.sort((a, b) => b.priority - a.priority);

        return completedTopics.slice(0, count).map(t => t.id);
    }

    /**
     * Optimize learning path by reordering topics
     * within constraint boundaries (doesn't violate prerequisites)
     */
    static optimizePath(graph, currentPath) {
        const optimized = [];
        const remaining = new Set(currentPath);

        while (remaining.size > 0) {
            let bestTopic = null;
            let bestScore = -Infinity;

            // Find best topic among remaining that's ready
            for (const topicId of remaining) {
                if (this.canLearnNext(graph, topicId, optimized)) {
                    const score = this.calculatePriority(graph, topicId);
                    
                    if (score > bestScore) {
                        bestScore = score;
                        bestTopic = topicId;
                    }
                }
            }

            if (!bestTopic) {
                // Shouldn't happen if path is valid, but handle edge case
                // Add any remaining topic that has prerequisites met
                for (const topicId of remaining) {
                    if (this.canLearnNext(graph, topicId, optimized)) {
                        bestTopic = topicId;
                        break;
                    }
                }
            }

            if (bestTopic) {
                optimized.push(bestTopic);
                remaining.delete(bestTopic);
            } else {
                break; // Safety exit
            }
        }

        return optimized;
    }

    /**
     * Check if a topic can be learned next (prerequisites met)
     */
    static canLearnNext(graph, topicId, alreadyLearned) {
        const prerequisites = graph.getPrerequisites(topicId);
        
        return prerequisites.every(prereq => {
            const data = graph.getTopicData(prereq);
            return data.completed || alreadyLearned.includes(prereq);
        });
    }

    /**
     * Select optimal next N topics (for parallel learning)
     */
    static selectNextTopics(graph, count = 3) {
        const readyTopics = graph.getReadyTopics();
        
        const scoredTopics = readyTopics.map(topicId => ({
            id: topicId,
            priority: this.calculatePriority(graph, topicId)
        }));

        // Sort by priority (descending)
        scoredTopics.sort((a, b) => b.priority - a.priority);

        return scoredTopics.slice(0, count).map(t => t.id);
    }

    /**
     * Get recommended study time allocation
     */
    static getStudyTimeAllocation(graph, availableMinutes) {
        const readyTopics = graph.getReadyTopics();
        const allocation = [];
        let totalPriority = 0;

        // Calculate total priority
        const priorities = readyTopics.map(topicId => {
            const priority = this.calculatePriority(graph, topicId);
            totalPriority += priority;
            return { topicId, priority };
        });

        // Allocate time proportionally to priority
        for (const { topicId, priority } of priorities) {
            const data = graph.getTopicData(topicId);
            const timeAllocation = Math.round(
                (priority / totalPriority) * availableMinutes
            );

            allocation.push({
                topicId,
                topicName: data.name,
                minutes: timeAllocation,
                priority: priority.toFixed(2)
            });
        }

        // Sort by priority
        allocation.sort((a, b) => b.priority - a.priority);

        return allocation;
    }

    /**
     * Suggest learning strategy based on current state
     */
    static suggestStrategy(graph) {
        const stats = graph.getStats();
        const readyTopics = graph.getReadyTopics();

        if (stats.averageMastery < 0.5) {
            return {
                strategy: 'foundational',
                message: 'Focus on mastering basics before advancing',
                recommendation: 'Spend more time on fundamental topics'
            };
        } else if (readyTopics.length > 5) {
            return {
                strategy: 'parallel',
                message: 'Multiple topics available - learn in parallel',
                recommendation: 'Study 2-3 topics simultaneously'
            };
        } else if (stats.completedTopics / stats.totalTopics > 0.7) {
            return {
                strategy: 'advanced',
                message: 'Focus on advanced topics and review',
                recommendation: 'Challenge yourself with difficult topics'
            };
        } else {
            return {
                strategy: 'balanced',
                message: 'Maintain steady progress',
                recommendation: 'Continue current learning pace'
            };
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GreedySelector;
}