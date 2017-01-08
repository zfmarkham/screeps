let task = {
    upgrade: require('task.upgrade').upgrade
};

let roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep)
    {
        if (creep.carry.energy == 0)
        {
            creep.getEnergy();
        }
        else
        {
            task.upgrade(creep);
        }
    }
};

module.exports = roleUpgrader;