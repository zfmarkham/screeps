/**
 * Created by zmark_000 on 31/12/2016.
 */

let task = {
    repair: require('task.repair').repair,
    attack: require('task.attack').attack
};

let roleTower = {

    /** @param {STRUCTURE_TOWER} tower **/
    run: function(tower) {

        task.attack(tower);
        task.repair(tower);
    }
};

module.exports = roleTower;