// lib/types.js — Shared type definitions for orgframework engine modules
// This file provides no runtime exports; it exists only for TypeScript/JSDoc type checking.

/**
 * @typedef {Object} OrgStructure
 * @property {string} name - Organization name
 * @property {Department[]} departments - Department list
 * @property {Object} [metadata] - Optional metadata
 */

/**
 * @typedef {Object} Department
 * @property {string} name - Department name
 * @property {Role[]} roles - Roles in this department
 * @property {string} [head] - Head role ID
 */

/**
 * @typedef {Object} Role
 * @property {string} title - Role title
 * @property {string} [level] - Role level (e.g. "IC", "manager", "director", "vp", "executive")
 * @property {number} [count] - Headcount for this role
 * @property {string} [id] - Role identifier
 * @property {string} [summary] - Role summary
 * @property {string[]} [collaborates_with] - Related role IDs
 * @property {string} [reports_to] - Manager role ID
 */

/**
 * @typedef {Object} RoleImpact
 * @property {'critical'|'high'|'medium'|'low'} urgency - Urgency level
 * @property {string} coverage - How to cover the gap
 * @property {string} timeframe - Replacement timeframe
 * @property {string} risk - Key risks
 */

/**
 * @typedef {Object} CouncilMember
 * @property {string} id - Member identifier
 * @property {string} name - Display name
 * @property {string} signature - Signature question
 * @property {string} focus - Area of focus
 * @property {string} bias - Known bias description
 * @property {string} prompt - System prompt
 */

/**
 * @typedef {'proposal' | 'critique' | 'synthesis' | 'complete'} CouncilRound
 */

/**
 * @typedef {Object} CouncilContext
 * @property {string} request - The original user request
 * @property {string} region - Detected region
 * @property {string} industry - Detected industry
 * @property {string} stage - Org stage
 * @property {string|null} preset - Optionally matched preset
 * @property {'fast'|'default'|'deep'} depth - Deliberation depth
 */

/**
 * @typedef {Object} CouncilMemberState
 * @property {string} id - Member ID
 * @property {string} name - Member name
 * @property {string|null} proposal - Member's proposal text
 * @property {string[]} critiques - Critique entries
 * @property {string|null} final_position - Final position text
 */

/**
 * @typedef {Object} CouncilSession
 * @property {CouncilContext} context - Session context
 * @property {CouncilMemberState[]} members - Council member states
 * @property {CouncilRound} currentRound - Current deliberation round
 * @property {Array<{memberId: string, position: string, type: string}>} divergence - Divergence entries
 * @property {string} startedAt - ISO timestamp
 * @property {string|null} completedAt - ISO timestamp or null
 */

/**
 * @typedef {Object} SimilarityResult
 * @property {string} id - Role ID
 * @property {string} path - File path
 * @property {number} score - Similarity score (0-1)
 */

/**
 * @typedef {Object} RelationshipGraph
 * @property {{roleId: string, collaborates_with: string[], reverse_connections: string[]}[]} nodes - Graph nodes
 * @property {{from: string, to: string, type: string}[]} edges - Graph edges
 * @property {{direct: {name: string, path: string}[], reverse: {name: string, path: string}[]}} [reporting] - Reporting structure
 */

export {};
