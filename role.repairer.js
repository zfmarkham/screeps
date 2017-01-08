let task = {
    repair: require('task.repair').repair
};

let roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.carry.energy == 0)
        {
            delete creep.memory.repairTarget;
            creep.getEnergy();
        }
        else
        {
            task.repair(creep);
        }
    }
};

module.exports = roleRepairer;