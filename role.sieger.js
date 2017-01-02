/**
 * Created by zmark_000 on 02/01/2017.
 */


module.exports = {

    run: function(creep) {

        let spawns = creep.room.find(FIND_HOSTILE_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_SPAWN});

        for (let i = 0; i < spawns.length; i++)
        {
            let path = creep.pos.findPathTo(spawns[i]);
            console.log(JSON.stringify(path));
        }
    }
};