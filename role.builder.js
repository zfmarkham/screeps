let task = {
    build: require('task.build').build
};

let roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep)
    {

        if (creep.carry.energy == 0)
        {
            creep.getEnergy();
        }
        else
        {
            task.build(creep);
        }
    }
};

module.exports = roleBuilder;