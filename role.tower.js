/**
 * Created by zmark_000 on 31/12/2016.
 */

let task = {
    repair: require('task.repair').repair
};

let roleTower = {

    run: function(tower) {

        let hostileCreep = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        let injuredCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {filter: (c) => c.hits < c.hitsMax});

        if (hostileCreep)
        {
            tower.attack(hostileCreep);
        }
        else if (injuredCreep)
        {
            tower.heal(injuredCreep);
        }
        else
        {
            task.repair(tower);
        }
    }
};

module.exports = roleTower;