/**
 * Created by zmark_000 on 29/12/2016.
 */

let defend = {


    defend: function(creep) {

        if (creep.memory.archerSpot)
        {
            let flag = Game.flags[creep.memory.archerSpot];
            if (creep.moveTo(flag.pos.x, flag.pos.y, {noPathFinding: true}) == ERR_NOT_FOUND)
            {
                creep.moveTo(flag.pos.x, flag.pos.y);
            }

            let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (target) {
                creep.rangedAttack(target);
            }

        }
        else
        {
            let occupiedArcherSpots = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender').map((el) => el.memory.archerSpot);
            let closestFlag = creep.pos.findClosestByRange(FIND_FLAGS, {filter: (flag) => flag.name.includes("ArcherSpot") && occupiedArcherSpots.indexOf(flag.name) == -1});
            if (closestFlag) creep.memory.archerSpot = closestFlag.name;
        }

    }
};

module.exports = defend;