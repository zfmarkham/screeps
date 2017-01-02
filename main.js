
let roleTower = require('role.tower');
let roomManager = require('roomManager');

require('prototype.creep')();

module.exports.loop = function () {

    /**
     *  Make sure all rooms are having screep populations managed
     */
    for (let name in Game.rooms)
    {
        roomManager.run(Game.rooms[name]);
    }

    /**
     * Remove lingering creeps from memory store, ready to repopulate
     */
    for (let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    Memory.creepTypes = {};
    Memory.creepTypes.harvesters = [];
    Memory.creepTypes.upgraders = [];
    Memory.creepTypes.repairers = [];
    Memory.creepTypes.builders = [];
    Memory.creepTypes.carriers = [];
    Memory.creepTypes.defenders = [];
    Memory.creepTypes.siegers = [];

    /**
     * Run roles on each creep and push creep types into appropriate memory locations for easy access through Memory tab
     */
    for (let creep in Game.creeps) {
        Game.creeps[creep].runRole();
    }

    /**
     * Run Tower role on all towers
     */
    let towers = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER);

    for (let tower of towers)
    {
        roleTower.run(tower);
    }
};