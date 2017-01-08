/**
 * Created by zmark_000 on 07/01/2017.
 */

let attack = {


    attack: function(object) {

        let hostileCreep = object.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        
        if (hostileCreep)
        {
            console.log(object.attack(hostileCreep));
            if (object.attack(hostileCreep) == ERR_NOT_IN_RANGE) {
                if (object.moveTo(hostileCreep, {noPathFinding: true}) == ERR_NOT_FOUND)
                {
                    object.moveTo(hostileCreep);
                }
            }
        }
    }
};

module.exports = attack;