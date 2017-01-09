/**
 * Created by zmark_000 on 29/12/2016.
 */

let defs = [

    /**
     * COSTS
     *
     * MOVE   - 50
     * WORK   - 100
     * CARRY  - 50
     * ATTACK - 80
     * HEAL   - 250
     * CLAIM  - 600
     * TOUGH  - 10
     * RANGED_ATTACK - 150
     */

    /**
     * ROOM CONTROL LEVEL 1
     * THESE ARE LISTED IN PRIORITY ORDER
     */
    {
        HARVESTER: {
            BODY: [MOVE, WORK, WORK],
            MIN: 1,
            MAX: undefined, // Room energy source count
            COST: 250
        },

        CARRIER: {
            BODY: [MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
            MIN: undefined, // Harvester count > 0
            MAX: undefined, // Harvester count
            COST: 300
        },

        UPGRADER: {
            BODY: [WORK, CARRY, CARRY, CARRY, MOVE],
            MIN: 2,
            MAX: undefined, // RCL * 2
            COST: 300
        },

        BUILDER: {
            BODY: [WORK, CARRY, CARRY, MOVE, MOVE],
            MIN: undefined, // Construction sites > 0
            MAX: 2,
            COST: 300
        },

        REPAIRER: {
            BODY: [WORK, CARRY, CARRY, CARRY, MOVE],
            MIN: undefined, // Structure count > 0
            MAX: 1,
            COST: 200
        }
    },

    /**
     * ROOM CONTROL LEVEL 2
     * THESE ARE LISTED IN PRIORITY ORDER
     */
    {
        HARVESTER: {
            BODY: [MOVE, WORK, WORK, WORK, WORK, WORK],
            MIN: 1,
            MAX: undefined, // Room energy source count
            COST: 550
        },

        CARRIER: {
            BODY: [MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
            MIN: undefined, // Harvester count > 0
            MAX: undefined, // Harvester count
            COST: 300
        },

        UPGRADER: {
            BODY: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
            MIN: 2,
            MAX: undefined, // RCL * 2
            COST: 450
        },

        BUILDER: {
            BODY: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
            MIN: 0, // Construction sites > 0
            MAX: 2,
            COST: 450
        },

        REPAIRER: {
            BODY: [WORK, CARRY, CARRY, CARRY, MOVE],
            MIN: 0, // Structure count > 0
            MAX: 1,
            COST: 200
        },

        DEFENDER: {
            BODY: [MOVE, MOVE, RANGED_ATTACK, RANGED_ATTACK],
            MIN: 1,
            MAX: undefined, // Garrison point count
            COST: 400
        }

    }
];

module.exports = defs;