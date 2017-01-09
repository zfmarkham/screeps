/**
 * Created by zmark_000 on 29/12/2016.
 */

let harvest = {

    harvest: function(creep) {

        if (!creep.memory.harvestPointId)
        {
            let occupiedHarvestPoints = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').map((el) => el.memory.harvestPointId);
            let closestSource = creep.pos.findClosestByRange(FIND_SOURCES, {filter: (source) => occupiedHarvestPoints.indexOf(source.id) == -1});
            creep.memory.harvestPointId = closestSource.id;
        }

        let source = Game.getObjectById(creep.memory.harvestPointId);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            if (creep.moveTo(source, {noPathFinding: true}) == ERR_NOT_FOUND)
            {
                creep.moveTo(source);
            }
        }
    }
};

module.exports = harvest;